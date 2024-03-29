import { twrDiv } from "./twrdiv.js";
import { IModParams, IModOpts, twrWasmModuleBase } from "./twrmodbase.js";
import { twrCanvas } from "./twrcanvas.js";
export declare abstract class twrWasmModuleInJSMain extends twrWasmModuleBase {
    iocanvas: twrCanvas;
    d2dcanvas: twrCanvas;
    iodiv: twrDiv;
    modParams: IModParams;
    constructor(opts?: IModOpts, isWasmModule?: boolean);
    divLog(...params: string[]): void;
}
//# sourceMappingURL=twrmodjsmain.d.ts.map