import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const MIN = process.env.MIN;

export default {
  output: {
    file: `dist/storager.cjs${MIN ? '.min' : ''}.js`,
    format: 'cjs',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // 只编译我们的源代码
    }),
    MIN && uglify(),
  ],
};
