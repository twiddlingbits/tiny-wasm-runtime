#include <stddef.h>
#include <stdint.h>
#include <assert.h>
#include "twr-crt.h"

/* This implementation aligns on 8 byte boundaries.  GNU is 8 (for 32bit arch) or 16 (for 64 bit arch).  */

/* heap has format: <VALID_MALLOC_MARKER><size in words><allocated memory>, repeat */
#define VALID_MALLOC_MARKER (0x1234ABCD)

/* heap map bit is set to 1 for allocated entries of size ALLOC_SIZE and 0 for free entries */
#define MAP_ENTRY_BITS 8
static twr_size_t heap_map_size_in_bytes;
static unsigned char *heap_map;
//#define heap_map_size_in_bytes 1250
//static unsigned char heap_map[heap_map_size_in_bytes];

// number of bytes in each allocation chunk, as well as the alignment of the allocation
// to modify allocation/align size, it is not sufficient to just change ALLOC_SIZE since type uint64_t is used throughout
#define ALLOC_SIZE 8   
#define ALLOC_SIZE_MASK (ALLOC_SIZE-1)

static twr_size_t heap_size_in_alloc_units;
static uint64_t *heap;

twr_size_t heap_size_in_bytes;
twr_size_t mem_size_in_bytes;

//#define heap_size_in_alloc_units 10000
//static uint64_t heap[heap_size_in_alloc_units];

/************************************************/
/************************************************/

//Data by default starts at address 1024
//The stack starts one page (64k) above the end of data and grows down
//The stack grows downwards and the heap grows upwards. 
//The stack starts at __data_end, the heap starts at __heap_base. 
//Because the stack is placed first, it is limited to a maximum size set at compile time, which is __heap_base - __data_end.

// add init call to unit tests
void twr_init_malloc(void* memp, twr_size_t mem_sizeb) {
	//twr_conlog("twr_init_malloc %x %d %d",mem, mem_sizeb, sizeof(mem));
	
	const uintptr_t mem = (uintptr_t)memp;
	assert((mem & ALLOC_SIZE_MASK) ==0) ;
	
	assert(heap_map_size_in_bytes==0); // check that init only called once

	mem_size_in_bytes=mem_sizeb;

	heap_size_in_bytes=mem_size_in_bytes/(ALLOC_SIZE*8+1); // eg. we need 1 bit per ALLOC_SIZE for map, or 1 byte per ALLOC_SIZE*8
	heap_size_in_bytes=heap_size_in_bytes*ALLOC_SIZE*8;
	heap_size_in_bytes=heap_size_in_bytes & (~ALLOC_SIZE_MASK);  // round down to ALLOC_SIZE units
	assert(heap_size_in_bytes>0);

	heap=(uint64_t*)mem;
	heap_size_in_alloc_units=heap_size_in_bytes/ALLOC_SIZE;

	heap_map=(unsigned char*)mem+heap_size_in_bytes;
	heap_map_size_in_bytes=heap_size_in_bytes/(ALLOC_SIZE*8);

	assert(heap_size_in_alloc_units>0);
	assert(heap_map_size_in_bytes>0);

	assert(heap_size_in_alloc_units*ALLOC_SIZE+heap_map_size_in_bytes <= mem_size_in_bytes);
	assert(heap_map+heap_map_size_in_bytes<=(unsigned char*)mem+mem_size_in_bytes);
}

void twr_malloc_debug_stats() {
	twr_conlog("init_malloc stats:");
	twr_conlog("   heap start addr: %x", heap);
	twr_conlog("   heap size bytes: %d", heap_size_in_bytes);
	twr_conlog("   heap allocation map offset mem+offset: %x %d", heap_map-(unsigned char*)heap, heap_map-(unsigned char*)heap);
	twr_conlog("   heap allocation map size bytes: %d", heap_map_size_in_bytes);
	twr_conlog("   heap_size_in_alloc_units: %d", heap_size_in_alloc_units);
	twr_conlog("   unused padding: %d", mem_size_in_bytes-heap_size_in_bytes-heap_map_size_in_bytes);
	twr_conlog("   avail() returns: %d", twr_avail());
}

/************************************************//************************************************/

static bool is_alloc_unit_free(unsigned long i) {
	unsigned long idx=i/MAP_ENTRY_BITS;
	unsigned char bit=(i-idx*MAP_ENTRY_BITS);
	return (heap_map[idx]&(1<<bit))==0;
}

static void set_free_state(unsigned long i, bool do_alloc) {
	unsigned long idx=i/MAP_ENTRY_BITS;
	unsigned char bit=i-idx*MAP_ENTRY_BITS;
	assert (bit<8);
	if (do_alloc)
		heap_map[idx]|=((unsigned char)1 << bit);
	else
		heap_map[idx]&=(~(1<<bit));
}

static int find_next_free_chunk(unsigned long *start, unsigned long *len) {
	unsigned long i=*start;
	while(i < heap_size_in_alloc_units) {
		if (is_alloc_unit_free(i)) { //free word?
			*start=i++;
			while (i < heap_size_in_alloc_units && is_alloc_unit_free(i))
				i++;
			*len = i-(*start);
			return 1;
		}
		else {
			i++;
		}
	}
	return 0;  // failed to find free memory
}

static void take_some_memory(unsigned long start, twr_size_t size_in_alloc_units) {
	heap[start]=VALID_MALLOC_MARKER;
	heap[start+1]=size_in_alloc_units;
	for (unsigned long i=0; i < (size_in_alloc_units+2); i++)
		set_free_state(start+i, 1);
}

/************************************************/

#ifdef __wasm__
__attribute__((export_name("twr_malloc")))
#endif
void *twr_malloc(twr_size_t size) {
	twr_size_t size_in_alloc_units = (size+ALLOC_SIZE-1)/ALLOC_SIZE;
	twr_size_t start=0;
	twr_size_t len;
	
	//twr_conlog("twr_malloc entry size %d",size);
	//twr_conlog("twr_malloc avail is %d",twr_avail());

	if (size==0) {
		twr_conlog("malloc returned NULL because size passed was 0");
		return NULL;
	}

	while (find_next_free_chunk(&start, &len)) {
		if (len >= (size_in_alloc_units+2)) {
			take_some_memory(start, size_in_alloc_units);
			//twr_conlog("malloc returns %x",(void *)&(heap[start+2]));
			const uintptr_t mem = (uintptr_t)(&(heap[start+2]));
			assert( ( (mem) & 7)==0);  // assert 8 byte aligned
			return (void *)mem;  /* first memory alloc unit is VALID_MALLOC_MARKER, 2nd is used for size of allocation */
		}
		start=start+len;
	}

	twr_conlog("malloc failed to alloc mem of size %d, note avail mem is %d",size,twr_avail());

	return 0;
}

/************************************************/

static int validate_header(char* msg, void* mem) {
		int addr = (uint64_t *)mem-heap;

		if (NULL==mem) {
			twr_conlog("%s - validate_header fail: mem==NULL", msg);
			return 0;
		}
		else if (addr<2) {
			twr_conlog("%s - validate_header fail: mem-heap==%d < 2", msg, addr);
			return 0;
		}
		else if (heap[addr-1]<1 || heap[addr-1] > (heap_size_in_alloc_units-2) ) {
			twr_conlog("%s - validate_header fail: invalid malloc size of %x", msg, heap[addr-1]);
			return 0;
		}
		else if (heap[addr-2]!=VALID_MALLOC_MARKER) {
			twr_conlog("%s - validate_header fail:  missing VALID_MALLOC_MARKER ", msg);
			return 0;
		}	
		else
			return 1;
}

/************************************************/

#ifdef __wasm__
__attribute__((export_name("twr_free")))
#endif
void twr_free(void *mem) {

	if (mem==NULL) {
		twr_conlog("error in twr_free - passed NULL pointer");
		assert(mem!=NULL);
		return;
	}

	//twr_conlog("free(%x)",mem);


	uint64_t addr=(uint64_t*)mem-heap;
	twr_size_t size_in_alloc_units=heap[addr-1];

	if (!validate_header("in free", mem)) {
		twr_conlog("error in twr_free(%x)", mem);
		return;
	}

	for (int i=-2; i < (int)size_in_alloc_units; i++) {
		if (is_alloc_unit_free(addr+i)) {
			twr_conlog("error in twr_free(%d) - internal error - memory incorrectly marked as free", addr);
			return;
		}
		set_free_state(addr+i, 0);
		heap[addr+i]=0xDEADBEEF;
	}
}

/************************************************/

twr_size_t twr_avail() {
	//twr_conlog("in AVAIL heap_size_in_alloc_units set to %d",heap_size_in_alloc_units);

	twr_size_t avail=0;
	for (twr_size_t i=0; i < heap_size_in_alloc_units; i++) {
		//twr_conlog("%d, ",i);
		if (is_alloc_unit_free(i))
			avail++;
	}

	return avail*ALLOC_SIZE;
}

/************************************************/

static int validate_malloc(char* msg, void* mem, twr_size_t size) {
		const twr_size_t addr = (uint64_t*)mem-heap;
		const twr_size_t size_in_alloc_units = (size+ALLOC_SIZE-1)/ALLOC_SIZE;

		if (!validate_header(msg, mem))
			return 0;
		else if (heap[addr-1]!=size_in_alloc_units) {
			twr_conlog("%s fail - invalid size saved", msg);
			return 0;
		}

		return 1;
}

/********************************************************/
/********************************************************/
/********************************************************/

struct bin {
    twr_size_t size;
    struct bin *next;
    void* first_free_entry;
};

struct bin_entry {
    struct bin_entry *next;  
    unsigned long size;       
    // cache_malloc mem goes here
};

struct bin * bin_find(twr_size_t size);
void* bin_get_mem(struct bin *);

static struct bin * first_bin;

struct bin * bin_find(twr_size_t size) {

    struct bin *last=NULL, *b;

	b=first_bin;
    while (b) {
        if (b->size==size) return b;
        last=b;
		b=b->next;
    }

    b=twr_malloc(sizeof(struct bin));
    b->size=size;
    b->first_free_entry=NULL;
    b->next=NULL;

    if (last) {
        last->next=b;
    }
    else {
        first_bin=b;
    }
    return b;
}

void* bin_get_mem(struct bin *b) {
    struct bin_entry *be;

    if (b->first_free_entry==NULL) {
		assert((sizeof(struct bin_entry)&7)==0); // make sure 8 byte aligned
        be = twr_malloc(sizeof(struct bin_entry)+b->size);
        be->size=b->size;
		be->next=NULL;
    }
    else {
        be = b->first_free_entry;
        b->first_free_entry=be->next;
    }

    return &(be[1]);
}

void bin_return_mem(struct bin *b, struct bin_entry *be) {
    be->next=b->first_free_entry;
    b->first_free_entry=be;
}

/********************************************************/
/********************************************************/


void *twr_cache_malloc(twr_size_t size) {
    void* mem;
    struct bin * b=bin_find(size);
    mem=bin_get_mem(b);
	assert( ( ((uintptr_t)mem) & 7)==0);  // assert 8 byte aligned
    return mem;
}

void twr_cache_free(void* mem) {
    const char* cmem = (char*)mem;
    struct bin_entry *be=(struct bin_entry*)(cmem-sizeof(struct bin_entry));

    struct bin * b=bin_find(be->size);
    bin_return_mem(b, be);
}

/********************************************************/
/********************************************************/
/************************************************/

#ifndef __wasm__
static uint64_t myheap[1000]; 
#endif

static void set_mem(void* mem, twr_size_t size, unsigned char val) {
	for (twr_size_t i=0; i < size; i++)
		((char*)mem)[i]=val;
}

int twr_malloc_unit_test() {

	if (heap_size_in_alloc_units==0) {  // check if init needs calling
		#ifdef __wasm__
		assert(0);
		#else
		twr_init_malloc(myheap, sizeof(myheap));
		#endif
	}

	const size_t max_allocs=heap_size_in_alloc_units/3;  /* marker,size,data -- smallest allocations take three units */
	if (max_allocs*4 > 64*1024) twr_conlog("warning: in twr_malloc_unit_test() stack alloc exceeds default wasm stack size");
	void* allocation[max_allocs];

	assert(max_allocs>=1);  // tests will fail if not the case

	if (twr_avail()!=heap_size_in_alloc_units*ALLOC_SIZE) {
		twr_conlog("twr_malloc unit test failed on twr_avail=%d",twr_avail());
		return 0;
	}

	if (twr_malloc(0)!=NULL) {
		twr_conlog("twr_malloc unit test failed on zero size twr_malloc");
		return 0;
	}

	void* mem;
	const twr_size_t max_alloc=(heap_size_in_alloc_units-2)*ALLOC_SIZE;
	if ((mem=twr_malloc(max_alloc))==0) {
		twr_conlog("twr_malloc unit test failed on max size twr_malloc");
		return 0;
	}	

	set_mem(mem, max_alloc, 0xAA);

	if (0==validate_malloc("max twr_malloc", mem, max_alloc))
		return 0;

	if (twr_avail()!=0) {
		twr_conlog("twr_malloc unit test failed on twr_avail max alloc");
		return 0;
	}

	twr_conlog("the following malloc test should correctly fail:");
	if (twr_malloc(1)!=NULL) {
		twr_conlog("twr_malloc unit test failed by twr_mallocing after max size twr_malloc");
		return 0;
	}	

	twr_free(mem);

	if (twr_avail()!=heap_size_in_alloc_units*ALLOC_SIZE) {
		twr_conlog("twr_malloc unit test failed on twr_avail post max alloc");
		return 0;
	}

	for (twr_size_t i=0; i<max_allocs; i++) {
		mem=twr_malloc((i&7)+1);   /* allocate 1,2,3,4,5,6,7,8 bytes.  all should fit in one allocation unit*/
		if (mem==0) {
			twr_conlog("twr_malloc unit test failed on pass one twr_malloc");
			return 0;			
		}

		set_mem(mem, (i&7)+1, 0x55);

		if (validate_malloc("pass one", mem, (i&7)+1)==0)
			return 0;
		allocation[i]=mem;
	}

	for (twr_size_t i=0; i<max_allocs; i++) {
		twr_free(allocation[i]);
	}

	for (twr_size_t i=0; i<max_allocs; i++) {
		mem=twr_malloc((i&7)+1);   /* allocate 1,2,3,4,5,6,7,8 bytes */
		if (mem==0) {
			twr_conlog("twr_malloc unit test failed on pass two twr_malloc");
			return 0;			
		}

		set_mem(mem, (i&7)+1, 0);

		if (validate_malloc("pass two", mem, (i&7)+1)==0)
			return 0;
		allocation[i]=mem;
	}

	for (twr_size_t i=0; i<(max_allocs-1); i=i+3) {
		twr_free(allocation[i]);
		twr_free(allocation[i+1]);
		allocation[i]=0;
		allocation[i+1]=0;
	}

	for (twr_size_t i=0; i<(max_allocs-1); i=i+3) {
		mem=twr_malloc(2*ALLOC_SIZE);   /* 2 alloc units bytes */
		assert(allocation[i]==0);
		allocation[i]=mem;
		set_mem(mem, 2*ALLOC_SIZE, 0);
		if (validate_malloc("pass three", mem, 2*ALLOC_SIZE)==0)
			return 0;
	}
	
	for (twr_size_t i=0; i<max_allocs; i++) {
		if (allocation[i])
			twr_free(allocation[i]);
	}

	if (twr_avail()!=heap_size_in_alloc_units*ALLOC_SIZE) {
		twr_conlog("twr_malloc unit test failed on twr_avail post max alloc");
		return 0;
	}	

	const char* s1="this is a string of some length";
	const char* s2="this is another string of some length that is longer";
	const char* s3="ab";

	char *d1=twr_strdup(s1);
	char *d2=twr_strdup(s2);
	char *d3=twr_strdup(s3);

	if (twr_strcmp(s1, d1)!=0 || twr_strcmp(s2, d2)!=0 || twr_strcmp(s3, d3)!=0) {
		twr_conlog("twr_malloc unit test failed on strings");
		return 0;	
	}

	twr_free(d2);
	twr_free(d1);
	twr_free(d3);

	const twr_size_t av=twr_avail();
	if (av!=heap_size_in_alloc_units*ALLOC_SIZE) {
		twr_conlog("twr_malloc unit test failed on string post free");
		return 0;
	}	

{
    void* mem1=twr_cache_malloc(20);
    if (!mem1) return 0;
    set_mem(mem1, 20, 0xAA);

    void* mem2=twr_cache_malloc(20);
    if (!mem2) return 0;
    set_mem(mem2, 20, 0xAA);

    twr_cache_free(mem1);

    void* mem1b=twr_cache_malloc(20);
    if (mem1b!=mem1) return 0;

    twr_cache_free(mem2);

}

{

    void* mem1=twr_cache_malloc(40);
    if (!mem1) return 0;
    set_mem(mem1, 20, 0xAA);

    twr_cache_free(mem1);

    void* mem1b=twr_cache_malloc(40);
    if (mem1b!=mem1) return 0;
}

	//twr_conlog("twr_malloc unit test completed successfully");

	return 1;

}




