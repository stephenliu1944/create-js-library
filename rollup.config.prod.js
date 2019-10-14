import { uglify } from 'rollup-plugin-uglify';
import base, { rollupMerge } from './rollup.config.base';
import pkg from './package.json';

var { main, module, browser, libraryName } = pkg;
var cjsName = main.split('/')[1];
var esmName = module.split('/')[1];
var umdName = browser.split('/')[1];

export default [rollupMerge(base({ filename: umdName }), {
    output: {
        format: 'umd',
        sourcemap: true,
        name: libraryName
    },
    plugins: [
        uglify()	                     
    ]
}), rollupMerge(base({ filename: cjsName }), {
    output: {
        format: 'cjs'
    }
}), rollupMerge(base({ filename: esmName }), {
    output: {
        format: 'es'
    }
})];