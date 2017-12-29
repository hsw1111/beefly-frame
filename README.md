# app-web

App端中的web页面，根目录下每个目录为一个单独的模块（除common外，
该目录中存放所有模块中使用的公共资源。），单独开发。

### 切换模块

1.手动切换，修改<code>./config.js</code>中属性``projectDir``值，指定到相应的目录。
```js
module.exports = {
	// 当前模块
	projectDir: "mid-autumn",
}
```

2、命令切换
```
// 中秋活动
node script.js -P mid-autumn

// 邀请好友活动
node script.js -P invite-friends
```


### To run

* You'll need to have [git](https://git-scm.com/) and [node](https://nodejs.org/en/) installed in your system.
* Fork and clone the project:

```
git clone http://59.110.52.154:82/html/app-web.git
```

* Then install the dependencies:

```
npm install
```

* Run development server:

```
npm start
```

* Or you can run development server with [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard):

```
npm run dev
```

Open the web browser to `http://localhost:3000/`

### To test
To run unit tests:

```
npm test
```

Tests come bundled with:

* Jest
* Enzyme
* React Test Utils
* React Test Renderer

### To build the production package

```
npm run build
```

### Eslint
There is a `.eslint.yaml` config for eslint ready with React plugin.

To run linting, run:

```
npm run lint
```


### App端调试：
html页面中增加下面代码，会在页面中出现调试功能，功能类似chrome开发者工具。
开发模式默认已添加，如果生产环境中需要调度，则手动在index.html中添加下面两行代码。
```html
<script src="//cdn.bootcss.com/eruda/1.2.4/eruda.min.js"></script>
<script>eruda.init();</script>
```

### 项目参数配置信息

在<code>./common/config.js</code>文件中，来配置开发环境与生产环境下不同的参数。

```js
// 开发环境
const development = {
	env: 'development',
	mifengApp: 'http://test.api.mmuu.com/mifeng/app/',
	...
};


// 生产环境
const production = {
	env: 'production',
	mifengApp: 'http://api.mmuu.com/mifeng/app/',
	...
};

export default development;
```


使用如下命令，切换不同环境：
```
// 切换开发环境
node script.js -d

// 切换生产环境
node script.js -p
```




