export declare class EmptyWasi {
    constructor(config?: {});

    getImports(module: WebAssembly.Module): WebAssembly.Imports;

    start(instance: WebAssembly.Instance): number|undefined;
}
