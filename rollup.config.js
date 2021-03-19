import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'es',
    },
    {
      name: pkg.name,
      file: pkg.browser,
      format: 'umd',
      globals: {
        react: 'react',
        axios: 'axios',
        '@rooks/use-did-update': '@rooks/use-did-update',
      },
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [typescript({ typescript: require('typescript') }), nodeResolve(), commonjs()],
}
