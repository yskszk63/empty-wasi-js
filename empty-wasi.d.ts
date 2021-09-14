export declare class EmptyWasi {
    constructor({}: {});

    getImports(module: WebAssembly.Module): WebAssembly.Imports;

    start(instance: WebAssembly.Instance): number|undefined;
}
