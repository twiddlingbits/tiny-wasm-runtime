function t(t,e,r,i){Object.defineProperty(t,e,{get:r,set:i,enumerable:!0,configurable:!0})}var e=globalThis,r={},i={},s=e.parcelRequire9f5e;null==s&&((s=function(t){if(t in r)return r[t].exports;if(t in i){var e=i[t];delete i[t];var s={id:t,exports:{}};return r[t]=s,e.call(s.exports,s,s.exports),s.exports}var o=Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){i[t]=e},e.parcelRequire9f5e=s);var o=s.register;o("eZoLj",function(e,r){t(e.exports,"register",()=>i,t=>i=t);var i,s=new Map;i=function(t,e){for(var r=0;r<e.length-1;r+=2)s.set(e[r],{baseUrl:t,path:e[r+1]})}}),o("4mNsm",function(e,r){t(e.exports,"twrWasmModule",()=>s("3bkoq").twrWasmModule),t(e.exports,"twrWasmModuleAsync",()=>s("baOio").twrWasmModuleAsync),s("3bkoq"),s("baOio")}),o("3bkoq",function(e,r){t(e.exports,"twrWasmModule",()=>a);var i=s("9FI45"),o=s("aGUWE"),n=s("lsUl2");class a extends o.twrWasmModuleInJSMain{malloc;constructor(t={}){let e;super(t,!0),this.malloc=t=>{throw Error("error - un-init malloc called")},e=this.d2dcanvas.isValid()?this.d2dcanvas:this.iocanvas,this.modParams.imports={twrDebugLog:i.twrDebugLogImpl,twrTime:n.twrTimeImpl,twrDivCharOut:this.iodiv.charOut.bind(this.iodiv),twrCanvasGetProp:e.getProp.bind(e),twrCanvasDrawSeq:e.drawSeq.bind(e),twrCanvasCharIn:this.null,twrCanvasInkey:this.null,twrDivCharIn:this.null,twrSleep:this.null,twrSin:Math.sin,twrCos:Math.cos,twrTan:Math.tan,twrFAbs:Math.abs,twrACos:Math.acos,twrASin:Math.asin,twrATan:Math.atan,twrExp:Math.exp,twrFloor:Math.floor,twrCeil:Math.ceil,twrFMod:function(t,e){return t%e},twrLog:Math.log,twrPow:Math.pow,twrSqrt:Math.sqrt,twrTrunc:Math.trunc,twrDtoa:this.floatUtil.dtoa.bind(this.floatUtil),twrToFixed:this.floatUtil.toFixed.bind(this.floatUtil),twrToExponential:this.floatUtil.toExponential.bind(this.floatUtil),twrAtod:this.floatUtil.atod.bind(this.floatUtil),twrFcvtS:this.floatUtil.fcvtS.bind(this.floatUtil)}}null(t){throw Error("call to unimplemented twrXXX import in twrWasmModule.  Use twrWasmModuleAsync ?")}}}),o("9FI45",function(e,r){t(e.exports,"twrDebugLogImpl",()=>s);let i="";function s(t){10==t||3==t?(console.log(i),i=""):(i+=String.fromCharCode(t)).length>=300&&(console.log(i),i="")}}),o("aGUWE",function(e,r){t(e.exports,"twrWasmModuleInJSMain",()=>a);var i=s("fDEU7"),o=s("5hO33"),n=s("5LsZ0");class a extends o.twrWasmModuleBase{iocanvas;d2dcanvas;iodiv;modParams;constructor(t={},e=!1){if(super(e),"undefined"==typeof document)throw Error("twrWasmModuleJSMain should only be created in JavaScript Main.");let r=document.getElementById("twr_iodiv"),s=document.getElementById("twr_iocanvas"),o=document.getElementById("twr_d2dcanvas");if(s&&o)throw Error("Both twr_iocanvas and twr_d2dcanvas defined. Currently only one canvas allowed.");if("div"==t.stdio&&!r)throw Error("twrWasmModuleBase opts=='div' but twr_iodiv not defined");if("canvas"==t.stdio&&!s)throw Error("twrWasmModuleBase, opts=='canvas' but twr_iocanvas not defined");if(t.isd2dcanvas&&!o)throw Error("twrWasmModuleBase, opts.isdrawcanvas==true but twr_d2dcanvas not defined");t=r?{stdio:"div",...t}:s?{stdio:"canvas",...t}:{stdio:"debug",...t},r||s?console.log("tiny-wasm-runtime: stdio set to: ",t.stdio):console.log("Since neither twr_iocanvas nor twr_iodiv is defined, stdout directed to debug console."),(t=s?{windim:[64,16],...t}:{windim:[0,0],...t}).imports||(t.imports={});let a=!1;t.backcolor||(a=!0,t.backcolor="black"),t.forecolor||(a=!0,t.forecolor="white"),t.fontsize||(a=!0,t.fontsize=16),void 0===t.isd2dcanvas&&(o?t.isd2dcanvas=!0:t.isd2dcanvas=!1),this.modParams={stdio:t.stdio,windim:t.windim,imports:t.imports,forecolor:t.forecolor,backcolor:t.backcolor,styleIsDefault:a,fontsize:t.fontsize,isd2dcanvas:t.isd2dcanvas},this.iodiv=new i.twrDiv(r,this.modParams,this),this.iocanvas=new n.twrCanvas(s,this.modParams,this),this.d2dcanvas=new n.twrCanvas(o,this.modParams,this)}divLog(...t){for(var e=0;e<t.length;e++)this.iodiv.stringOut(t[e].toString()),this.iodiv.charOut(32);this.iodiv.charOut(10)}}}),o("fDEU7",function(e,r){t(e.exports,"twrDiv",()=>o);var i=s("ghrAp");class o{div;divKeys;CURSOR=String.fromCharCode(9611);cursorOn=!1;lastChar=0;extraBR=!1;owner;constructor(t,e,r){this.div=t,this.owner=r,this.owner.isWasmModule||(this.divKeys=new i.twrSharedCircularBuffer),this.div&&!e.styleIsDefault&&(this.div.style.backgroundColor=e.backcolor,this.div.style.color=e.forecolor,this.div.style.font=e.fontsize.toString()+"px arial")}isValid(){return!!this.div}getProxyParams(){if(!this.divKeys)throw Error("internal error in getProxyParams.");return[this.divKeys.sharedArray]}charOut(t){if(this.div){switch(this.extraBR&&(this.extraBR=!1,this.cursorOn&&(this.div.innerHTML=this.div.innerHTML.slice(0,-1)),this.div.innerHTML=this.div.innerHTML.slice(0,-4),this.cursorOn&&(this.div.innerHTML+=this.CURSOR)),t){case 10:case 13:if(10==t&&13==this.lastChar)break;this.cursorOn&&(this.div.innerHTML=this.div.innerHTML.slice(0,-1)),this.div.innerHTML+="<br><br>",this.extraBR=!0,this.cursorOn&&(this.div.innerHTML+=this.CURSOR);let e=this.div.getBoundingClientRect();window.scrollTo(0,e.height+100);break;case 8:this.cursorOn&&(this.div.innerHTML=this.div.innerHTML.slice(0,-1)),this.div.innerHTML=this.div.innerHTML.slice(0,-1),this.cursorOn&&(this.div.innerHTML+=this.CURSOR);break;case 14:this.cursorOn||(this.cursorOn=!0,this.div.innerHTML+=this.CURSOR,this.div.focus());break;case 15:this.cursorOn&&(this.cursorOn=!1,this.div.innerHTML=this.div.innerHTML.slice(0,-1));break;default:this.cursorOn&&(this.div.innerHTML=this.div.innerHTML.slice(0,-1)),this.div.innerHTML+=String.fromCharCode(t),this.cursorOn&&(this.div.innerHTML+=this.CURSOR)}this.lastChar=t}}stringOut(t){for(let e=0;e<t.length;e++)this.charOut(t.charCodeAt(e))}}}),o("ghrAp",function(e,r){t(e.exports,"twrSharedCircularBuffer",()=>i);class i{sharedArray;buf;constructor(t){if("undefined"!=typeof window&&!crossOriginIsolated&&"file:"!==window.location.protocol)throw Error("twrSharedCircularBuffer constructor, crossOriginIsolated="+crossOriginIsolated+". See SharedArrayBuffer docs.");t?this.sharedArray=t:this.sharedArray=new SharedArrayBuffer(1032),this.buf=new Int32Array(this.sharedArray),this.buf[256]=0,this.buf[257]=0}write(t){let e=this.buf[257];this.buf[e]=t,256==++e&&(e=0),this.buf[257]=e,Atomics.notify(this.buf,257)}read(){if(this.isEmpty())return -1;{let t=this.buf[256],e=this.buf[t];return t++,this.buf[256]=t,e}}readWait(){if(this.isEmpty()){let t=this.buf[256];Atomics.wait(this.buf,257,t)}return this.read()}isEmpty(){return this.buf[256]==this.buf[257]}}}),o("5hO33",function(e,r){t(e.exports,"twrWasmModuleBase",()=>o);var i=s("2Xdsi");class o{memory;mem8;mem32;memD;exports;isWorker=!1;isWasmModule;floatUtil;constructor(t=!1){this.isWasmModule=t,this.mem8=new Uint8Array,this.mem32=new Uint32Array,this.memD=new Float64Array,this.floatUtil=new i.twrFloatUtil(this)}async loadWasm(t){let e;try{e=await fetch(t)}catch(e){throw console.log("loadWasm() failed to fetch: "+t),e}if(!e.ok)throw Error("fetch response error on file '"+t+"'\n"+e.statusText);try{let t=await e.arrayBuffer(),r={...this.modParams.imports},i=await WebAssembly.instantiate(t,{env:r});if(this.exports=i.instance.exports,!this.exports)throw Error("Unexpected error - undefined instance.exports");if(this.memory)throw Error("unexpected error -- this.memory already set");if(this.memory=this.exports.memory,!this.memory)throw Error("Unexpected error - undefined exports.memory");this.mem8=new Uint8Array(this.memory.buffer),this.mem32=new Uint32Array(this.memory.buffer),this.memD=new Float64Array(this.memory.buffer),this.isWorker&&(this.memory.buffer instanceof ArrayBuffer&&console.log("twrWasmModuleAsync requires shared Memory. Add wasm-ld --shared-memory --no-check-features (see docs)"),postMessage(["setmemory",this.memory])),!this.isWasmModule||this.memory.buffer instanceof ArrayBuffer||console.log("twrWasmModule does not require shared Memory. Okay to remove wasm-ld --shared-memory --no-check-features"),this.malloc=t=>new Promise(e=>{let r=this.exports.twr_malloc;e(r(t))}),this.init()}catch(t){throw console.log("WASM instantiate error: "+t+(t.stack?"\n"+t.stack:"")),t}}init(){let t;switch(this.modParams.stdio){case"debug":default:t=0;break;case"div":t=1;break;case"canvas":t=2;break;case"null":t=3}(0,this.exports.twr_wasm_init)(t,this.mem8.length)}async callC(t){let e=await this.preCallC(t),r=this.callCImpl(t[0],e);return this.postCallC(e,t),r}async callCImpl(t,e=[]){if(!this.exports)throw Error("this.exports undefined");if(!this.exports[t])throw Error("callC: function '"+t+"' not in export table.  Use --export wasm-ld flag.");return(0,this.exports[t])(...e)}async preCallC(t){if(t.constructor!==Array)throw Error("callC: params must be array, first arg is function name");if(0==t.length)throw Error("callC: missing function name");let e=[],r=0;for(let i=1;i<t.length;i++){let s=t[i];switch(typeof s){case"number":e[r++]=s;break;case"string":e[r++]=await this.putString(s);break;case"object":if(s instanceof URL){let t=await this.fetchAndPutURL(s);e[r++]=t[0],e[r++]=t[1];break}if(s instanceof ArrayBuffer){let t=await this.putArrayBuffer(s);e[r++]=t;break}default:throw Error("callC: invalid object type passed in")}}return e}async postCallC(t,e){let r=0;for(let i=1;i<e.length;i++){let s=e[i];switch(typeof s){case"number":r++;break;case"string":this.callCImpl("twr_free",[t[r]]),r++;break;case"object":if(s instanceof URL){this.callCImpl("twr_free",[t[r]]),r+=2;break}if(s instanceof ArrayBuffer){let e=new Uint8Array(s);for(let i=0;i<e.length;i++)e[i]=this.mem8[t[r]+i];this.callCImpl("twr_free",[t[r]]),r++;break}throw Error("postCallC: internal error A");default:throw Error("postCallC: internal error B")}}return t}copyString(t,e,r){let i;for(i=0;i<r.length&&i<e-1;i++)this.mem8[t+i]=r.charCodeAt(i);this.mem8[t+i]=0}async putString(t){let e=await this.malloc(t.length);return this.copyString(e,t.length,t),e}async putU8(t){let e=await this.malloc(t.length);for(let r=0;r<t.length;r++)this.mem8[e+r]=t[r];return e}async putArrayBuffer(t){let e=new Uint8Array(t);return this.putU8(e)}async fetchAndPutURL(t){if(!("object"==typeof t&&t instanceof URL))throw Error("fetchAndPutURL param must be URL");try{let e=await fetch(t),r=await e.arrayBuffer(),i=new Uint8Array(r);return[await this.putU8(i),i.length]}catch(e){throw console.log("fetchAndPutURL Error. URL: "+t+"\n"+e+(e.stack?"\n"+e.stack:"")),e}}getLong(t){let e=Math.floor(t/4);if(4*e!=t)throw Error("getLong passed non long aligned address");if(e<0||e>=this.mem32.length)throw Error("invalid index passed to getLong: "+t+", this.mem32.length: "+this.mem32.length);return this.mem32[e]}setLong(t,e){let r=Math.floor(t/4);if(4*r!=t)throw Error("setLong passed non long aligned address");if(r<0||r>=this.mem32.length)throw Error("invalid index passed to setLong: "+t+", this.mem32.length: "+this.mem32.length);this.mem32[r]=e}getDouble(t){let e=Math.floor(t/8);if(8*e!=t)throw Error("getLong passed non Float64 aligned address");return this.memD[e]}setDouble(t,e){let r=Math.floor(t/8);if(8*r!=t)throw Error("setDouble passed non Float64 aligned address");this.memD[r]=e}getShort(t){if(t<0||t>=this.mem8.length)throw Error("invalid index passed to getShort: "+t);return this.mem8[t]+256*this.mem8[t+1]}getString(t,e){let r="",i=0;for(;this.mem8[t+i]&&(void 0===e||i<e)&&t+i<this.mem8.length;)r+=String.fromCharCode(this.mem8[t+i]),i++;return r}getU8Arr(t){if(t<0||t>=this.mem8.length)throw Error("invalid index passed to getU8: "+t);let e=new Uint32Array(this.mem8.slice(t,t+8).buffer),r=e[0],i=e[1];if(i<0||i>=this.mem8.length)throw Error("invalid idx.dataptr passed to getU8");if(r<0||r>this.mem8.length-i)throw Error("invalid idx.size passed to  getU8");return this.mem8.slice(i,i+r)}getU32Arr(t){if(t<0||t>=this.mem8.length)throw Error("invalid index passed to getU32: "+t);let e=new Uint32Array(this.mem8.slice(t,t+8).buffer),r=e[0],i=e[1];if(i<0||i>=this.mem8.length)throw Error("invalid idx.dataptr passed to getU32");if(r<0||r>this.mem8.length-i)throw Error("invalid idx.size passed to  getU32");if(r%4!=0)throw Error("idx.size is not an integer number of 32 bit words");return new Uint32Array(this.mem8.slice(i,i+r).buffer)}}}),o("2Xdsi",function(e,r){t(e.exports,"twrFloatUtil",()=>i);class i{mod;constructor(t){this.mod=t}atod(t){let e=this.mod.getString(t),r=e.trimStart().toUpperCase();return"INF"==r||"+INF"==r?Number.POSITIVE_INFINITY:"-INF"==r?Number.NEGATIVE_INFINITY:Number.parseFloat(e.replaceAll("D","e").replaceAll("d","e"))}dtoa(t,e,r,i){if(-1==i){let i=r.toString();this.mod.copyString(t,e,i)}else{let s=r.toString();s.length>i&&(s=r.toPrecision(i)),this.mod.copyString(t,e,s)}}toFixed(t,e,r,i){let s=r.toFixed(i);this.mod.copyString(t,e,s)}toExponential(t,e,r,i){let s=r.toExponential(i);this.mod.copyString(t,e,s)}fcvtS(t,e,r,i,s,o){let n,a;if(0==t||0==o||0==s||e<1)return 1;let l=0;if(Number.isNaN(r))n="1#QNAN00000000000000000000000000000".slice(0,i+1),a=1;else if(Number.isFinite(r)){if(0==r)n="000000000000000000000000000000000000".slice(0,i),a=0;else{if(r<0&&(l=1,r=Math.abs(r)),i>100||r>1e21||r<1e-99)return this.mod.copyString(t,e,""),this.mod.mem32[s]=0,1;let[o="",h=""]=r.toFixed(i).split(".");"0"==o&&(o=""),o.length>0?(a=o.length,n=o+h):a=(n=h.replace(/^0+/,"")).length-h.length}}else n="1#INF00000000000000000000000000000".slice(0,i+1),a=1;return e-1<n.length?1:(this.mod.copyString(t,e,n),this.mod.setLong(s,a),this.mod.setLong(o,l),0)}}}),o("5LsZ0",function(e,r){t(e.exports,"twrCanvas",()=>l);var i,o,n=s("ghrAp"),a=s("47Wdp");(i=o||(o={}))[i.D2D_FILLRECT=1]="D2D_FILLRECT",i[i.d2d_fillcodepoint=5]="d2d_fillcodepoint",i[i.D2D_SETLINEWIDTH=10]="D2D_SETLINEWIDTH",i[i.D2D_SETFILLSTYLERGBA=11]="D2D_SETFILLSTYLERGBA",i[i.D2D_SETFONT=12]="D2D_SETFONT",i[i.D2D_BEGINPATH=13]="D2D_BEGINPATH",i[i.D2D_MOVETO=14]="D2D_MOVETO",i[i.D2D_LINETO=15]="D2D_LINETO",i[i.D2D_FILL=16]="D2D_FILL",i[i.D2D_STROKE=17]="D2D_STROKE",i[i.D2D_SETSTROKESTYLERGBA=18]="D2D_SETSTROKESTYLERGBA",i[i.D2D_ARC=19]="D2D_ARC",i[i.D2D_STROKERECT=20]="D2D_STROKERECT",i[i.D2D_FILLTEXT=21]="D2D_FILLTEXT",i[i.D2D_IMAGEDATA=22]="D2D_IMAGEDATA",i[i.D2D_PUTIMAGEDATA=23]="D2D_PUTIMAGEDATA",i[i.D2D_BEZIERTO=24]="D2D_BEZIERTO",i[i.D2D_MEASURETEXT=25]="D2D_MEASURETEXT",i[i.D2D_SAVE=26]="D2D_SAVE",i[i.D2D_RESTORE=27]="D2D_RESTORE",i[i.D2D_CREATERADIALGRADIENT=28]="D2D_CREATERADIALGRADIENT",i[i.D2D_SETCOLORSTOP=29]="D2D_SETCOLORSTOP",i[i.D2D_SETFILLSTYLEGRADIENT=30]="D2D_SETFILLSTYLEGRADIENT",i[i.D2D_RELEASEID=31]="D2D_RELEASEID",i[i.D2D_CREATELINEARGRADIENT=32]="D2D_CREATELINEARGRADIENT",i[i.D2D_SETFILLSTYLE=33]="D2D_SETFILLSTYLE",i[i.D2D_SETSTROKESTYLE=34]="D2D_SETSTROKESTYLE";class l{ctx;props={charWidth:0,charHeight:0,foreColor:0,backColor:0,widthInChars:0,heightInChars:0,canvasHeight:0,canvasWidth:0};owner;cmdCompleteSignal;canvasKeys;precomputedObjects;constructor(t,e,r){let{forecolor:i,backcolor:s,fontsize:o,isd2dcanvas:l}=e;if(this.owner=r,this.props.widthInChars=e.windim[0],this.props.heightInChars=e.windim[1],this.owner.isWasmModule||(this.cmdCompleteSignal=new a.twrSignal,this.canvasKeys=new n.twrSharedCircularBuffer),this.precomputedObjects={},t){if(!t.getContext)throw Error("attempted to create new twrCanvas with an element that is not a valid HTMLCanvasElement");let e=t.getContext("2d");if(!e)throw Error("canvas 2D context not found in twrCanvasConstructor");e.font=o.toString()+"px Courier New",e.textBaseline="top";let r="          ",n=e.measureText(r);this.props.charWidth=Math.ceil(n.width/r.length);let a=e.measureText("X");this.props.charHeight=Math.ceil(a.fontBoundingBoxAscent+a.fontBoundingBoxDescent),l||(t.width=this.props.charWidth*this.props.widthInChars,t.height=this.props.charHeight*this.props.heightInChars),this.props.canvasHeight=t.height,this.props.canvasWidth=t.width;let h=t.getContext("2d");if(!h)throw Error("canvas 2D context not found in twrCanvas.constructor (2nd time)");this.ctx=h,this.ctx.font=o.toString()+"px Courier New",this.ctx.textBaseline="top",h.fillStyle=s,this.props.backColor=Number("0x"+h.fillStyle.slice(1)),h.fillStyle=i,this.props.foreColor=Number("0x"+h.fillStyle.slice(1))}}isValid(){return!!this.ctx}getProxyParams(){if(!this.cmdCompleteSignal||!this.canvasKeys)throw Error("internal error in getProxyParams.");return[this.props,this.cmdCompleteSignal.sharedArray,this.canvasKeys.sharedArray]}getProp(t){this.isValid()||console.log("internal error - getProp called on invalid twrCanvas");let e=this.owner.getString(t);return this.props[e]}drawSeq(t){let e;if(this.isValid()||console.log("internal error - drawSeq called on invalid twrCanvas"),!this.ctx)return;let r=this.owner.getLong(t),i=this.owner.getLong(t+4);for(;;){let t=this.owner.getLong(r+4);switch(t){case o.D2D_FILLRECT:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16),i=this.owner.getDouble(r+24),s=this.owner.getDouble(r+32);this.ctx.fillRect(t,e,i,s)}break;case o.D2D_STROKERECT:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16),i=this.owner.getDouble(r+24),s=this.owner.getDouble(r+32);this.ctx.strokeRect(t,e,i,s)}break;case o.d2d_fillcodepoint:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16),i=String.fromCharCode(this.owner.getShort(r+24));this.ctx.fillText(i,t,e)}break;case o.D2D_FILLTEXT:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16),i=this.owner.getString(this.owner.getLong(r+24));this.ctx.fillText(i,t,e)}break;case o.D2D_MEASURETEXT:{let t=this.owner.getString(this.owner.getLong(r+8)),e=this.owner.getLong(r+12),i=this.ctx.measureText(t);this.owner.setDouble(e+0,i.actualBoundingBoxAscent),this.owner.setDouble(e+8,i.actualBoundingBoxDescent),this.owner.setDouble(e+16,i.actualBoundingBoxLeft),this.owner.setDouble(e+24,i.actualBoundingBoxRight),this.owner.setDouble(e+32,i.fontBoundingBoxAscent),this.owner.setDouble(e+40,i.fontBoundingBoxDescent),this.owner.setDouble(e+48,i.width)}break;case o.D2D_SETFONT:{let t=this.owner.getString(this.owner.getLong(r+8));this.ctx.font=t}break;case o.D2D_SETFILLSTYLERGBA:{let t="#"+("00000000"+this.owner.getLong(r+8).toString(16)).slice(-8);this.ctx.fillStyle=t}break;case o.D2D_SETSTROKESTYLERGBA:{let t="#"+("00000000"+this.owner.getLong(r+8).toString(16)).slice(-8);this.ctx.strokeStyle=t}break;case o.D2D_SETFILLSTYLE:{let t=this.owner.getString(this.owner.getLong(r+8));this.ctx.fillStyle=t}break;case o.D2D_SETSTROKESTYLE:{let t=this.owner.getString(this.owner.getLong(r+8));this.ctx.strokeStyle=t}break;case o.D2D_SETLINEWIDTH:{let t=this.owner.getShort(r+8);this.ctx.lineWidth=t}break;case o.D2D_MOVETO:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16);this.ctx.moveTo(t,e)}break;case o.D2D_LINETO:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16);this.ctx.lineTo(t,e)}break;case o.D2D_BEZIERTO:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16),i=this.owner.getDouble(r+24),s=this.owner.getDouble(r+32),o=this.owner.getDouble(r+40),n=this.owner.getDouble(r+48);this.ctx.bezierCurveTo(t,e,i,s,o,n)}break;case o.D2D_BEGINPATH:this.ctx.beginPath();break;case o.D2D_FILL:this.ctx.fill();break;case o.D2D_SAVE:this.ctx.save();break;case o.D2D_RESTORE:this.ctx.restore();break;case o.D2D_STROKE:this.ctx.stroke();break;case o.D2D_ARC:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16),i=this.owner.getDouble(r+24),s=this.owner.getDouble(r+32),o=this.owner.getDouble(r+40),n=0!=this.owner.getLong(r+48);this.ctx.arc(t,e,i,s,o,n)}break;case o.D2D_IMAGEDATA:{let t=this.owner.getLong(r+8),e=this.owner.getLong(r+12),i=this.owner.getLong(r+16),s=this.owner.getLong(r+20),o=this.owner.getLong(r+24);if(o in this.precomputedObjects&&console.log("warning: D2D_IMAGEDATA ID already exists."),this.owner.isWasmModule){let r=new Uint8ClampedArray(this.owner.memory.buffer,t,e);this.precomputedObjects[o]=new ImageData(r,i,s)}else this.precomputedObjects[o]={mem8:new Uint8Array(this.owner.memory.buffer,t,e),width:i,height:s}}break;case o.D2D_CREATERADIALGRADIENT:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16),i=this.owner.getDouble(r+24),s=this.owner.getDouble(r+32),o=this.owner.getDouble(r+40),n=this.owner.getDouble(r+48),a=this.owner.getLong(r+56),l=this.ctx.createRadialGradient(t,e,i,s,o,n);a in this.precomputedObjects&&console.log("warning: D2D_CREATERADIALGRADIENT ID already exists."),this.precomputedObjects[a]=l}break;case o.D2D_CREATELINEARGRADIENT:{let t=this.owner.getDouble(r+8),e=this.owner.getDouble(r+16),i=this.owner.getDouble(r+24),s=this.owner.getDouble(r+32),o=this.owner.getLong(r+40),n=this.ctx.createLinearGradient(t,e,i,s);o in this.precomputedObjects&&console.log("warning: D2D_CREATELINEARGRADIENT ID already exists."),this.precomputedObjects[o]=n}break;case o.D2D_SETCOLORSTOP:{let t=this.owner.getLong(r+8),e=this.owner.getLong(r+12),i=this.owner.getString(this.owner.getLong(r+16));if(!(t in this.precomputedObjects))throw Error("D2D_SETCOLORSTOP with invalid ID: "+t);this.precomputedObjects[t].addColorStop(e,i)}break;case o.D2D_SETFILLSTYLEGRADIENT:{let t=this.owner.getLong(r+8);if(!(t in this.precomputedObjects))throw Error("D2D_SETFILLSTYLEGRADIENT with invalid ID: "+t);let e=this.precomputedObjects[t];this.ctx.fillStyle=e}break;case o.D2D_RELEASEID:{let t=this.owner.getLong(r+8);this.precomputedObjects[t]?delete this.precomputedObjects[t]:console.log("warning: D2D_RELEASEID with undefined ID ",t)}break;case o.D2D_PUTIMAGEDATA:{let t;let e=this.owner.getLong(r+8),i=this.owner.getLong(r+12),s=this.owner.getLong(r+16),o=this.owner.getLong(r+20),n=this.owner.getLong(r+24),a=this.owner.getLong(r+28),l=this.owner.getLong(r+32);if(!(e in this.precomputedObjects))throw Error("D2D_PUTIMAGEDATA with invalid ID: "+e);if(this.owner.isWasmModule)t=this.precomputedObjects[e];else{let r=this.precomputedObjects[e];t=new ImageData(Uint8ClampedArray.from(r.mem8),r.width,r.height)}0==a&&0==l?this.ctx.putImageData(t,i,s):this.ctx.putImageData(t,i,s,o,n,a,l)}break;default:throw Error("unimplemented or unknown Sequence Type in drawSeq: "+t)}if(0==(e=this.owner.getLong(r))){if(r!=i)throw Error("assert type error in twrcanvas, ins!=lastins");break}r=e}this.cmdCompleteSignal&&this.cmdCompleteSignal.signal()}}}),o("47Wdp",function(e,r){var i,s;t(e.exports,"twrSignal",()=>o),(s=i||(i={}))[s.WAITING=0]="WAITING",s[s.SIGNALED=1]="SIGNALED";class o{sharedArray;buf;constructor(t){if("undefined"!=typeof window&&!crossOriginIsolated&&"file:"!==window.location.protocol)throw Error("twrSignal constructor, crossOriginIsolated="+crossOriginIsolated+". See SharedArrayBuffer docs.");t?this.sharedArray=t:this.sharedArray=new SharedArrayBuffer(4),this.buf=new Int32Array(this.sharedArray),this.buf[0]=i.WAITING}signal(){this.buf[0]=i.SIGNALED,Atomics.notify(this.buf,0)}wait(){this.buf[0]==i.WAITING&&Atomics.wait(this.buf,0,i.WAITING)}isSignaled(){return this.buf[0]==i.SIGNALED}reset(){this.buf[0]=i.WAITING}}}),o("lsUl2",function(e,r){t(e.exports,"twrTimeImpl",()=>i);function i(){return Date.now()}}),o("baOio",function(e,r){t(e.exports,"twrWasmModuleAsync",()=>l);var i=s("9FI45"),o=s("aGUWE"),n=s("2vKdq"),a=s("bqeaG");class l extends o.twrWasmModuleInJSMain{myWorker;malloc;loadWasmResolve;loadWasmReject;callCResolve;callCReject;initLW=!1;waitingcalls;constructor(t){if(super(t),this.malloc=t=>{throw Error("Error - un-init malloc called.")},!window.Worker)throw Error("This browser doesn't support web workers.");this.myWorker=new Worker(s("2xFSI")),this.myWorker.onmessage=this.processMsg.bind(this)}async loadWasm(t){if(this.initLW)throw Error("twrWasmAsyncModule::loadWasm can only be called once per twrWasmAsyncModule instance");return this.initLW=!0,new Promise((e,r)=>{let i;this.loadWasmResolve=e,this.loadWasmReject=r,this.malloc=t=>this.callCImpl("twr_malloc",[t]),this.waitingcalls=new n.twrWaitingCalls,i=this.d2dcanvas.isValid()?this.d2dcanvas:this.iocanvas;let s={divProxyParams:this.iodiv.getProxyParams(),canvasProxyParams:i.getProxyParams(),waitingCallsProxyParams:this.waitingcalls.getProxyParams()},o={urlToLoad:new URL(t,document.URL).href,modWorkerParams:s,modParams:this.modParams};this.myWorker.postMessage(["startup",o])})}async callC(t){let e=await this.preCallC(t);return this.callCImpl(t[0],e)}async callCImpl(t,e=[]){return new Promise((r,i)=>{this.callCResolve=r,this.callCReject=i,this.myWorker.postMessage(["callC",t,e])})}keyDownDiv(t){if(!this.iodiv||!this.iodiv.divKeys)throw Error("unexpected undefined twrWasmAsyncModule.divKeys");this.iodiv.divKeys.write((0,a.default)(t).char.charCodeAt(0))}keyDownCanvas(t){if(!this.iocanvas||!this.iocanvas.canvasKeys)throw Error("unexpected undefined twrWasmAsyncModule.canvasKeys");this.iocanvas.canvasKeys.write((0,a.default)(t).char.charCodeAt(0))}processMsg(t){let e=t.data[0],r=t.data[1];switch(e){case"divout":this.iodiv.isValid()?this.iodiv.charOut(r):console.log("error - msg divout received but iodiv is undefined.");break;case"debug":(0,i.twrDebugLogImpl)(r);break;case"drawseq":{let[t]=r;if(this.iocanvas.isValid())this.iocanvas.drawSeq(t);else if(this.d2dcanvas.isValid())this.d2dcanvas.drawSeq(t);else throw Error("msg drawseq received but canvas is undefined.");break}case"setmemory":if(this.memory=r,!this.memory)throw Error("unexpected error - undefined memory in startupOkay msg");this.mem8=new Uint8Array(this.memory.buffer),this.mem32=new Uint32Array(this.memory.buffer),this.memD=new Float64Array(this.memory.buffer);break;case"startupFail":if(this.loadWasmReject)this.loadWasmReject(r);else throw Error("twrWasmAsyncModule.processMsg unexpected error (undefined loadWasmReject)");break;case"startupOkay":if(this.loadWasmResolve)this.loadWasmResolve(void 0);else throw Error("twrWasmAsyncModule.processMsg unexpected error (undefined loadWasmResolve)");break;case"callCFail":if(this.callCReject)this.callCReject(r);else throw Error("twrWasmAsyncModule.processMsg unexpected error (undefined callCReject)");break;case"callCOkay":if(this.callCResolve)this.callCResolve(r);else throw Error("twrWasmAsyncModule.processMsg unexpected error (undefined callCResolve)");break;default:if(!this.waitingcalls)throw Error("internal error: this.waitingcalls undefined.");if(!this.waitingcalls.processMessage(e,r))throw Error("twrWasmAsyncModule - unknown and unexpected msgType: "+e)}}}}),o("2vKdq",function(e,r){t(e.exports,"twrWaitingCalls",()=>n);var i=s("47Wdp"),o=s("lsUl2");class n{callCompleteSignal;parameters;constructor(){this.callCompleteSignal=new i.twrSignal,this.parameters=new Uint32Array(new SharedArrayBuffer(4))}startSleep(t){setTimeout(()=>{this.callCompleteSignal.signal()},t)}time(){let t=(0,o.twrTimeImpl)();this.parameters[0]=t,this.callCompleteSignal.signal()}getProxyParams(){return[this.callCompleteSignal.sharedArray,this.parameters.buffer]}processMessage(t,e){switch(t){case"sleep":let[r]=e;this.startSleep(r);break;case"time":this.time();break;default:return!1}return!0}}}),o("bqeaG",function(e,r){t(e.exports,"default",()=>m);let i={a:"selectAll",c:"copy",s:"save",v:"paste",x:"cut",y:"redo",z:"undo"},s={"/":"?",".":">",",":"<","'":'"',";":":","[":"{","]":"}","\\":"|","`":"~","=":"+","-":"_",1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")",a:"A",b:"B",c:"C",d:"D",e:"E",f:"F",g:"G",h:"H",i:"I",j:"J",k:"K",l:"L",m:"M",n:"N",o:"O",p:"P",q:"q",r:"R",s:"S",t:"T",u:"U",v:"V",w:"W",x:"X",y:"Y",z:"Z"},o={};for(let t in s)o[s[t]]=t;let n={0:"\\",8:"backspace",9:"tab",12:"num",13:"enter",16:"shift",17:"ctrl",18:"alt",19:"pause",20:"caps",27:"esc",32:" ",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",44:"print",45:"insert",46:"delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",91:"meta",92:"meta",93:"meta",96:"num0",97:"num1",98:"num2",99:"num3",100:"num4",101:"num5",102:"num6",103:"num7",104:"num8",105:"num9",106:"*",107:"+",108:"num_enter",109:"num_subtract",110:"num_decimal",111:"num_divide",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",124:"print",144:"num",145:"scroll",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"`",224:"cmd",225:"alt",57392:"ctrl",63289:"num"},a={"\r":"enter"},l=JSON.parse(JSON.stringify(n));for(let t of Object.keys(a))l[t]=a[t];let h={num_subtract:"-",num_enter:"\n",num_decimal:".",num_divide:"/",enter:"\n",tab:"	",backspace:"\b"},c=["keydown","keyup"],d=()=>{let t=navigator.userAgent;return 0!==(/IEMobile|Windows Phone|Lumia/i.test(t)?"w":/iPhone|iP[oa]d/.test(t)?"i":/Android/.test(t)?"a":/BlackBerry|PlayBook|BB10/.test(t)?"b":/Mobile Safari/.test(t)?"s":/webOS|Mobile|Tablet|Opera Mini|\bCrMo\/|Opera Mobi/i.test(t)?1:0)};function u(t){let e=String.fromCharCode(t);return d()?e:e in o?o[e]:e in l?l[e]:e}function m(t){let e;if("keypress"!==t.type||d()){if("keypress"===t.type&&d())e=u(t.keyCode);else{if(!(c.indexOf(t.type)>-1))return!1;e=void 0!==t.which?n[t.which]:void 0!==t.keyCode?n[t.keyCode]:"enter"}}else e=u(t.charCode);let r=e;return t.shiftKey&&e in s?r=s[e]:t.ctrlKey&&e in i?r=i[e]:e in h&&(r=h[e]),{char:r,key:e}}}),o("2xFSI",function(t,e){var r=s("hoqmg");let i=new URL("../twrmodworker.1fcd8634.js",import.meta.url);t.exports=r(i.toString(),i.origin,!0)}),o("hoqmg",function(t,e){t.exports=function(t,e,r){if(e===self.location.origin)return t;var i=r?"import "+JSON.stringify(t)+";":"importScripts("+JSON.stringify(t)+");";return URL.createObjectURL(new Blob([i],{type:"application/javascript"}))}}),s("eZoLj").register(new URL("",import.meta.url).toString(),JSON.parse('["kjr0c","index.debfe79a.js","cTHdP","../twrmodworker.1fcd8634.js"]'));
//# sourceMappingURL=index.debfe79a.js.map
