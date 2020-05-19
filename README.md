# my-lib

## Install

## Usage

## API

## License

# 脚手架介绍
脚手架用于开发纯JS库, 支持打包为 UMD, ESModule(esm), CommonJS(cjs) 格式.

## 项目依赖
```
eslint:  v6
babel:   v7
gulp:    v4
jest:    v23
webpack  v4
rollup:  v1.27
node:    v10
```

## 使用教程
从git拉取项目代码后, 执行:
```
npm install
```

## 注册和登陆
注册npm账号, 执行后会依次提示输入用户名, 密码, 邮箱.
```
npm adduser  
```

登录npm服务, 便于发布.
```
npm login
```

## 模块配置
```js
{
  "name": "my-lib",                 // 模块名称
  "version": "0.1.0",               // 模块版本
  "description": "Use for development JS library.",     // 模块描述
  "main": "dist/index.cjs.js",      // 模块引入主路径
  "module": "dist/index.esm.js",    // 模块esm格式引入路径
  "browser": "dist/index.umd.js",   // 模块umd格式引入路径
  "license": "MIT",                 // 模块使用协议
  "repository": {                   // 模块保存的仓库地址
    "type": "git",
    "url": ""
  },
  "homepage": "",                   // 模块首页地址
  "bugs": {                         // 模块提issue地址
    "url": ""
  },
  "keywords": [],                   // 模块搜索关键字
  "files": [                        // 模块打包上传到npm服务器的文件
    "dist",
    "LICENSE",
    "README.md"
  ],
  ...
  // 以下为项目自定义属性, npm官方文档不存在.
  "devEnvironments": {              // 开发环境配置
    "servers": {                    // 本地服务配置
      "local": 8080,                // web服务端口
      "mock": 3000                  // mock服务端口
    },
    "globals": {                    // 全局变量, 仅适用于开发环境, 生产环境无效
      "__DEV__": true,
      "process.env.NODE_ENV": "development"
    },
    "proxies": {}                   // HTTP请求代理配置, 如需要可参考 @easytool/proxy-config 文档配置
  },
  "parcels": {                      // 生产环境打包配置
    "library": "MyLib",             // 模块打包为 umd 格式时, 使用的全局变量名称
    "exports": "auto",              // 模块打包为 umd 和 cjs 格式时的导出模式, 参考 rollup > output.exports 文档说明
    "external": [],                 // 模块打包时排除的依赖项, 参考 rollup > external 文档说明
    "globals": {}                   // 模块打包为 umd 格式时, 依赖项使用的全局变量名称, 参考 rollup > output.globals 文档说明
  }
}
```
其余配置请参考npm官方文档.

## 别名
默认在 babel.config.js 中配置了 Constants, Images, Utils 三个路径别名(webpack, rollup, jest共享).
```js
['babel-plugin-module-resolver', {
    alias: {
        'Constants': './src/constants',
        'Images': './src/images',
        'Utils': './src/utils'
    }
}]
```

## 本地调试
### 单元测试
在 test 目录对模块进行单元测试编码后, 执行 bin/test.bat 启动单元测试(测试框架为jest).

### Web测试
在 test/app.js 中引用模块(src/index.js 或 dist/index.umd.js), 模拟项目调用, 执行 bin/startup.bat 启动 Web 服务, 通过 http://localhost:8080 访问.

## link调试
将模块引入到应用项目(使用模块的项目)中调试, 执行 bin/link.bat, 然后在应用项目中执行:
```
npm link 模块名
```

## 打包发布
1. 发布X版本号执行 bin/publish-major.bat, 表示有重大更新, 并且不兼容老的版本.
2. 发布Y版本号执行 bin/publish-minor.bat, 表示有功能更新, 并且兼容老的版本.
3. 发布Z版本号执行 bin/publish-patch.bat, 表示有bug修复, 并且兼容老的版本.
4. 发布预发布版本号执行 bin/publish-prerelease.bat, 表示该版本还在开发测试中, 可能会有较大改动.
5. 从服务端卸载模块执行 bin/unpublish.bat.

## 目录结构
```
bin                                         // 可执行命令目录.
|-build-dev.bat                             // 将src目录中的源码通过 webpack.config.js 编译到build目录.
|-build-prod.bat                            // 将src目录中的源码通过 rollup.config.js 编译到build目录.
|-git-push.bat                              // 更新 git 版本号.
|-link.bat                                  // 创建link快捷方式, 用于本地调试.
|-lint-js.bat                               // 执行eslint生产环境代码校验.
|-lint-js.sh                                // 同上, 用于 linux 版本.
|-mock.bat                                  // 启动 mock server.
|-mock.sh                                   // 同上, 用于 linux 版本.
|-package.bat                               // 将src目录中的源码通过 rollup.config.js 编译打包到dist目录.
|-package.sh                                // 同上, 用于 linux 版本.
|-publish-major.bat                         // 发布新X版本.
|-publish-minor.bat                         // 发布新Y版本.
|-publish-patch.bat                         // 发布新Z版本.
|-publish-prerelease.bat                    // 发布预发布版.
|-startup.bat                               // 启动开发环境web服务.
|-startup.sh                                // 同上, 用于 linux 版本.
|-test.bat                                  // 执行jest单元测试.
|-test.sh                                   // 同上, 用于 linux 版本.
|-unpublish.bat                             // 用于从服务端撤销发布.
build                                       // 代码编译后生成的目录
dist                                        // 代码打包后生成的目录
mock                                        // mock server 服务配置目录.
src                                         // 项目源码目录
|-constants                                 // 常量文件目录.
    |-common.js                             // 常用常量.
|-images                                    // 图片资源目录.
|-module1                                   // 模块组件1
    |-index.js                              // 组件的索引文件, 便于外部快速引用.
    |-module1.js                            // 模块文件.
|-module2                                   // 模块组件2
    |-index.js                              // 组件的索引文件, 便于外部快速引用.
    |-module2.js                            // 模块文件.
|-utils                                     // 工具文件目录.
    |-common.js                             // 常用工具库.
|-index.js                                  // 模块打包时的入口js文件.
test                                        // 代码测试目录, 目录结构同src.
|-module1                                   // 模块1的测试目录.
    |-index.js                              // 测试文件.
|-module2                                   // 模块2的测试目录.
    |-index.js                              // 测试文件.
|-app.js                                    // 测试模块在 Web 环境下使用的入口文件.
|-template.html                             // 测试 Web 环境的html模板文件.
.eslintignore                               // eslint忽略校验配置文件.
.eslintrc.json                              // eslint开发环境代码校验配置文件.
.eslintrc.prod.json                         // eslint生产环境代码校验配置文件, 比开发环境更加严格, 发版和提交代码时会自动执行此配置校验代码.
.gitignore                                  // git忽略提交配置文件.
babel.config.js                             // babel配置文件.
fileTransformer.js                          // jest单元测试时的文件转换器.
gulpfile.babel.js                           // gulp任务脚本, 主要用于修改版本号.
jest.config.js                              // jest单元测试配置.
package.json                                // npm配置文件.
README.md                                   // JS库使用手册.
rollup.config.js                            // rollup配置文件, 用于生产环境模块打包.
webpack.config.js                           // webpack配置文件, 用于测试 Web 环境下的模块使用情况(仅用于测试).
```