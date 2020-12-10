# my-lib

## Install

## Usage

## API

## License

# 脚手架介绍
该脚手架用于开发纯JS库.

## 特性
- 内置link调试模式.
- 内置单元测试.
- 内置eslint代码检测.
- 打包自动生成 UMD, ESModule(esm), CommonJS(cjs) 格式代码.

## 项目依赖
```
node:       v8+
webpack:    v4
rollup:     v2
eslint:     v6
babel:      v7
gulp:       v4
jest:       v23
```

## 安装
```
npm install
```

## 开发
### 别名
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

### 环境配置
在 package.json 中配置:
```
  ...
  "devEnvironments": {
    "servers": {
      "local": 8080,    // 本地web服务端口, 默认为 8080
      "mock": 3000      // 本地mock服务端口, 默认为 3000
    },
    "proxies": {        // 代理服务配置, 参考 @easytool/proxy-config 库文档
      "/api": "http://localhost:3000"
    },
    "globals": {        // 全局变量配置, 仅适用于开发环境, 生产环境会保留变量名
    }
  }
```
注意: 该配置仅适用于开发环境.

### 服务
1. 执行 bin/startup.bat 启动本地 web 服务, 组件开发过程中可在 /test/app.js 中调试用户使用组件的情况.
2. 执行 bin/mock.bat 启动 mock 服务, 如有数据需求可在 mock 服务中配置模拟数据.

### 测试
执行 bin/test.bat 启动单元测试, 需先在 /test/ 目录中对组件进行测试编码(测试框架为jest).

### link调试模式
当应用端使用 npm link 关联当前模块时, 可以使用该模式进行联调.  
该模式会启动一个本地服务部署静态资源, 并持续监听本地代码, 一旦发生变化会立即构建到dist目录.

#### 当前模块
1. 链接到全局
```
npm link
```
2. 启动link模式
```
npm run link
```

#### 应用端
1. 链接本库
```
npm link my-lib(模块名称)
```
2. 启动应用
```
npm start
```

## 模块配置
```js
{
  "name": "my-lib",                 // 模块名称
  "version": "0.1.0",               // 模块版本
  "main": "dist/index.cjs.js",      // 模块引入主路径
  "module": "dist/index.esm.js",    // 模块esm格式引入路径
  "browser": "dist/index.umd.js",   // 模块umd格式引入路径
  "parcel": {                       // 生产环境打包配置
    "library": "MyLib",             // 模块打包为 umd 格式时, 使用的全局变量名称
    "externals": [],                // 模块打包时排除的依赖项, 参考 rollup > external 文档说明
    "exports": "auto",              // 模块打包为 umd 和 cjs 格式时的导出模式, 参考 rollup > output.exports 文档说明
    "globals": {}                   // 模块打包为 umd 格式时, 依赖项使用的全局变量名称, 参考 rollup > output.globals 文档说明
  }
  "description": "Use for development JS library.",     // 模块描述
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
}
```
其余配置请参考npm官方文档.

## 部署
### 1. 注册和登录
注册npm账号, 执行后会依次提示输入用户名, 密码, 邮箱.
```
npm adduser  
```

登录npm服务, 便于发布.
```
npm login
```

### 2. 发布
1. 发布X版本号执行 bin/publish-major.bat, 表示有重大更新, 并且不兼容老的版本.
2. 发布Y版本号执行 bin/publish-minor.bat, 表示有功能更新, 并且兼容老的版本.
3. 发布Z版本号执行 bin/publish-patch.bat, 表示有bug修复, 并且兼容老的版本.
4. 发布预发布版本号执行 bin/publish-prerelease.bat, 表示该版本还在开发测试中, 可能会有较大改动.
5. 从服务端卸载模块执行 bin/unpublish.bat.

## 目录结构
```
bin                                         // 可执行命令目录.
|-build.bat                                 // 将src目录中的源码通过 webpack.config.js 编译到build目录.
|-git-push.bat                              // 更新 git 版本号.
|-link.bat                                  // 用于npm link调试模式.
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
    |-Module2.js                            // 模块文件.
|-utils                                     // 工具文件目录.
    |-common.js                             // 常用工具库.
|-index.js                                  // 模块打包时的入口js文件.
test                                        // 代码测试目录, 目录结构同src.
|-module1                                   // 模块1的测试目录.
    |-index.js                              // 测试文件.
|-module2                                   // 模块2的测试目录.
    |-index.js                              // 测试文件.
|-index.js                                  // 测试模块在 Web 环境下使用的入口文件.
|-index.ejs                                 // 测试 Web 环境的html模板文件.
.eslintignore                               // eslint忽略校验配置文件.
.eslintrc.js                                // eslint开发环境代码校验配置文件.
.eslintrc.prod.js                           // eslint生产环境代码校验配置文件, 比开发环境更加严格, 发版和提交代码时会自动执行此配置校验代码.
.gitignore                                  // git忽略提交配置文件.
babel.config.js                             // babel配置文件.
fileTransformer.js                          // jest单元测试时的文件转换器.
gulpfile.babel.js                           // gulp任务脚本, 主要用于修改版本号.
jest.config.js                              // jest单元测试配置.
package.json                                // npm配置文件.
README.md                                   // JS库使用手册.
rollup.config.js                            // rollup配置文件, 用于生产环境模块打包.
webpack.config.dev.babel.js                 // webpack配置文件, 用于测试 Web 环境下的模块使用情况(仅用于测试).
```