import { EmptyWasi } from "../empty-wasi.js";
import fs from "fs";

(async () => {
    const [ target ] = process.argv.slice(2);
    const wasi = new EmptyWasi();
    const bc = fs.readFileSync(target, null);
    const module = await WebAssembly.compile(bc);
    const instance = await WebAssembly.instantiate(module, wasi.getImports(module));
    const exitcode = wasi.start(instance);
    if (typeof exitcode !== 'undefined' && exitcode !== 0) {
        throw new Error(`exit code: ${exitcode}.`);
    }
})();
