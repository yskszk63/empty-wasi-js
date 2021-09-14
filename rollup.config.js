import pluginTypescript from "@rollup/plugin-typescript";

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'empty-wasi.js',
      format: 'es',
      sourcemap: 'inline',
      exports: 'named',
    },
    plugins: [
      pluginTypescript(),
    ]
  },
  //{
  //},
];
