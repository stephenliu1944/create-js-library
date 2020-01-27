import path from 'path';
import webpack from 'webpack';
import { settings } from '@easytool/proxy-config';
import define from '@easytool/define-config';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import { devEnvironments } from './package.json';

const { servers, proxies, globals } = devEnvironments;
const BUILD_PATH = 'build';
const ASSETS_PATH = 'assets';

export default {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        host: '0.0.0.0',
        port: servers.local,
        inline: true,
        compress: true,             // 开起 gzip 压缩
        disableHostCheck: true,
        historyApiFallback: true,   // browserHistory路由
        contentBase: path.resolve(__dirname, BUILD_PATH),
        proxy: {
            ...settings(proxies)
        }
    },
    entry: {
        main: ['./test/app.js']
    },
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, BUILD_PATH),
        filename: `${ASSETS_PATH}/js/[name].[chunkhash].js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less', '.scss']
    },
    module: {
        rules: [{
            /**
             * eslint代码规范校验
             */
            test: /\.(js|jsx)$/,
            enforce: 'pre',
            include: path.resolve(__dirname, 'src'),
            use: [{
                loader: 'eslint-loader',
                options: {
                    fix: true,
                    configFile: '.eslintrc.json'
                }
            }]
        }, {
            /**
             * JS加载器
             */
            test: /\.(js|jsx)?$/,
            exclude: path.resolve(__dirname, 'node_modules'),
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }, {
            /**
             * CSS加载器
             */
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: true,                        
                        localIdentName: '[local]__[hash:base64:5]'
                    }
                }                
            ]
        }, {
            /**
             * 图片加载器
             */
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${ASSETS_PATH}/images/[name]_[hash].[ext]`
                }
            }]
        }]
    },
    plugins: [
        // 清除编译目录
        new CleanWebpackPlugin(),
        // index.html 模板插件
        new HtmlWebpackPlugin({                             
            filename: 'index.html',
            template: './test/template.html'
        }),
        // 文件大小写检测
        new CaseSensitivePathsPlugin(),          
        // check package size
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            ...define(globals)
        })
    ]
};
