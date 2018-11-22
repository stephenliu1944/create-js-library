import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import replace from 'rollup-plugin-replace';
import serve from 'rollup-plugin-serve';
import del from 'rollup-plugin-delete';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import alias from 'rollup-plugin-alias';
import json from 'rollup-plugin-json';
import pkg from './package.json';

const { local } = pkg.devServer;
const BUILD_PATH = 'build';
const FILE_NAME = 'index';

function base() {
    return [
        
    ];
}

export default base;



export default [{
    input: 'src/dev.js',
    output: {
        file: `${BUILD_PATH}/${FILE_NAME}.js`,
        sourcemap: true,
        format: 'umd'
    },
    plugins: [
        del({ targets: `${BUILD_PATH}/*` }),
        alias({
            utils: 'src/_utils',
            config: 'src/_config'
        }),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        resolve({       
            browser: true       // node_modules 里的包使用browser配置
        }), 
        // 全局变量
        replace({
            __DEV__: true,
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        commonjs(),     // so Rollup can convert `ms` to an ES module
        json(),
        eslint({
            fix: true,
            throwOnError: true,
            include: ['src/**/*.js'], // defaults to .svg, .png, .jpg and .gif files
            configFile: '.eslintrc.json'
        }),
        // web服务
        serve({ 				
            host: '0.0.0.0',
            port: local.port,
            contentBase: [BUILD_PATH],
            openPage: 'index.html',
            historyApiFallback: 'index.html'
        }),
        htmlTemplate({
            template: 'src/template.html',
            target: 'index.html'
        })
    ]
}];