# simple-wasi

Empty WASI implementation.

No I/O supported. But simple.

## Usage

```javascript
import { EmptyWasi } from "empty-wasi";

const wasi = new EmptyWasi();
const bc = do_fetch_wasm_binary()
const module = await WebAssembly.compile(bc);
const instance = await WebAssembly.instantiate(module, wasi.getImports(module));
const exitcode = wasi.start(instance);
```

## License

[MIT](LICENSE)

## Author

yskszk63
