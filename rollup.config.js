import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import del from 'rollup-plugin-delete';
import url from '@rollup/plugin-url';
import merge from 'lodash/merge';
import pkg from './package.json';

const { main, module, browser, parcels: { library, exports, external, globals } } = pkg;
const BUILD_PATH = process.env.BUILD_PATH || 'build';
const umdFile = getFilename(browser);
const cjsFile = getFilename(main);
const esmFile = getFilename(module);

function getFilename(dest = '') {
    return dest.split('/').pop();
}

function rollupMerge(base, source) {
    var { plugins: basePlugins = [], ...baseOthers } = base;
    var { plugins: sourcePlugins = [], ...sourceOthers } = source;

    var config = merge({}, baseOthers, sourceOthers);
    config.plugins = basePlugins.concat(sourcePlugins);
    
    return config;
}

function base(file) {
    return {
        input: 'src/index.js',
        output: {
            file: `${BUILD_PATH}/${file}`
        },
        external,               // 打包时排除外部依赖包
        plugins: [
            del({
                targets: `${BUILD_PATH}/${file}`
            }),
            eslint({
                fix: true,
                throwOnError: true,
                throwOnWarning: true,
                include: ['src/**/*.js'], 
                configFile: '.eslintrc.prod.json'
            }),
            babel({
                exclude: 'node_modules/**',  
                runtimeHelpers: true
            }),
            resolve(),
            commonjs(),                   
            json(),
            // 导入的文件, 仅使用base64
            url({
                limit: 99999 * 1024
            })
        ]
    };
}

export default [rollupMerge(base(umdFile), {
    // umd module
    output: {
        format: 'umd',
        sourcemap: true,
        name: library,
        exports,
        globals
    },
    plugins: [
        uglify()	                     
    ]
}), rollupMerge(base(cjsFile), {
    // commonjs module
    output: {
        format: 'cjs',
        exports
    }
}), rollupMerge(base(esmFile), {
    // es module
    output: {
        format: 'es'
    }
})];