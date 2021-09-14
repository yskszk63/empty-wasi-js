//@deno-types="../empty-wasi.d.ts"
import { EmptyWasi } from "../empty-wasi.js";

const [ target ] = Deno.args;
const wasi = new EmptyWasi();
const bc = await Deno.readFile(target);
const module = await WebAssembly.compile(bc);
const instance = await WebAssembly.instantiate(module, wasi.getImports(module));
const exitcode = wasi.start(instance);
if (typeof exitcode !== 'undefined' && exitcode !== 0) {
    throw new Error(`exit code: ${exitcode}.`);
}
