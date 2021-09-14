import { EmptyWasiImports, ExitStatus } from "./imports";

export class EmptyWasi {
    imports: EmptyWasiImports;

    constructor({}:{} = {}) {
        this.imports = new EmptyWasiImports();
    }

    getImports(module: WebAssembly.Module): any {
        // Detect wasi namespace. Use the first one found.
        const [ns] = WebAssembly.Module.imports(module)
            .filter(m => m.kind === "function" && m.module.startsWith("wasi_"))
            .map(m => m.module);
        switch (ns) {
        case "wasi_unstable":
            return {
                wasi_unstable: this.imports,
            }
        case "wasi_snapshot_preview1":
            return {
                wasi_snapshot_preview1: this.imports,
            }
        default:
            throw new Error("could not detect wasi namespace.");
        }
    }

    start(instance: WebAssembly.Instance): number|undefined {
        const memory = instance.exports.memory;
        if (!(memory instanceof WebAssembly.Memory)) {
            throw new Error("instance.exports.memory != WebAssembly.Memory");
        }
        this.imports._memory = memory;

        const _start = instance.exports._start;
        if (_start) {
            try {
            (_start as Function)();
            } catch (e) {
                if (e instanceof ExitStatus) {
                    return e.code;
                }
                throw e;
            }
        }
    }
}
