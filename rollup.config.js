import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import del from 'rollup-plugin-delete';
import url from 'rollup-plugin-url';
import merge from 'lodash/merge';
import pkg from './package.json';

const { main, module, browser, parcels: { library, exports, external, globals } } = pkg;
const BUILD_PATH = process.env.BUILD_PATH || 'build';
const umdFile = browser.split('/').pop();
const cjsFile = main.split('/').pop();
const esmFile = module.split('/').pop();

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
            // 导入的文件
            url({
                limit: 999999 * 1024                      // only use inline files, don't use copy files.
            })
        ]
    };
}

export default [rollupMerge(base(umdFile), {
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
    output: {
        format: 'cjs',
        exports
    }
}), rollupMerge(base(esmFile), {
    output: {
        format: 'es'
    }
})];