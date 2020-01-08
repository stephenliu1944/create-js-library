# my-lib

## Install

## Usage

## API

## License

# 项目介绍
该项目脚手架用于开发纯JS库, 支持打包为 UMD, ESModule(esm), CommonJS(cjs) 格式.

## 项目依赖
```
eslint:  v6
babel:   v7
gulp:    v4
jest:    v23
webpack  v4
rollup:  v1.27
node:    v8+
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
1. 在 package.json 中对模块的相关信息进行配置, 参考npm官方文档.
2. name 为模块的名字, libraryName 为UMD格式打包后的全局变量名, 这两项为必填.
```js

```

## 开发环境配置
在 package.json > devEnvironments 中可修改相关配置:
```js
"devEnvironments": {
    "servers": {
        "local": 8080,      // 本地服务端口
        "mock": 3000        // mock服务端口
    },
    "globals": {            // 全局变量, 仅适用于开发环境, 生产环境无效
        "__DEV__": true,
        "process.env.NODE_ENV": "development"
    },
    "proxies": {}           // 代理服务配置, 如需要可参考 @easytool/proxy-config 文档配置
}
```

## 本地调试
1. 开发阶段执行 bin/startup.bat 启动开发服务器, 模块开发过程中可在 src/dev.js 文件中模拟外部使用模块的情况进行本地调试.
2. 开发完成后可以在 bin/test.bat 执行单元测试.(需先在test/目录进行单元测试编码, 测试框架为jest).

## link调试
将模块引入到项目中调试执行 bin/link.bat , 然后在需要引入模块的项目中执行:
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