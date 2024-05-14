
# tested with mingw32-make using windows

OBJ := tests-libcxx.o

# -nostdinc Disable standard #include directories, (std includes provided by tiny-wasm-runtime)
# -nostdlib Disable standard c library, (use twr.a or twrd.a provided by tiny-wasm-runtime)
# -nostdlibinc tells the compiler to not search the standard system directories or compiler builtin directories for include files, For C++
# -fno-exceptions Don't generate stack exception code since libc++ and libcxxabi built without exceptions, for C++
# -fno-rtti since libc++ built without runtime type info, for C++
TWRCFLAGS := --target=wasm32 -fno-exceptions -fno-rtti -nostdlibinc -nostdinc -nostdlib -I  ../../include/c++/v1 -I ../../include -I ../../include/include-next/ -D_LIBCPP_PROVIDES_DEFAULT_RUNE_TABLE

# -O0 Optimization off (default if no -O specified)
# -O3 Optimization level 3
# -Wall Warn all
# -c compile w/o linking
# -g for debug symbols
# -v verbose
CFLAGS := -c -Wall -g $(TWRCFLAGS)

OBJOUTDIR := out
$(info $(shell mkdir -p $(OBJOUTDIR)))
OBJ := $(patsubst %, $(OBJOUTDIR)/%, $(OBJ))
$(info $(OBJ))

.PHONY: default clean

default: tests-libcxx.wasm

$(OBJOUTDIR)/%.o: %.cpp
	clang $(CFLAGS)  $< -o $@

tests-libcxx.wasm: $(OBJ)
	wasm-ld  $(OBJ) ../../lib-c/twrd.a ../../lib-c/libc++.a -o tests-libcxx.wasm \
		--no-entry --initial-memory=3145728 --max-memory=3145728  \
		--export=testslibcxx

clean:
	rm -f *.wasm
	rm -r -f $(OBJOUTDIR)

		