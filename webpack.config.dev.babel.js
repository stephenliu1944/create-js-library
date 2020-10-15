import path from 'path';
import webpack from 'webpack';
import proxyConfig from '@easytool/proxy-config';
import defineConfig from '@easytool/define-config';
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
            ...proxyConfig(proxies)
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
        extensions: ['.js', '.jsx']
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
                    configFile: '.eslintrc.js'
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
             * 图片加载器
             */
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: `${ASSETS_PATH}/images/[name].[ext]`
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
            template: './test/template.ejs'
        }),
        // 文件大小写检测
        new CaseSensitivePathsPlugin(),          
        // check package size
        // new WebpackBundleAnalyzer.BundleAnalyzerPlugin(),
        // 配置全局变量
        new webpack.DefinePlugin({
            ...defineConfig(globals)
        })
    ]
};
