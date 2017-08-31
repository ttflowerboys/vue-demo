# vue-zwy-mobile

> 基于`Vue`的单页应用。文档请看：[Webpack](http://vuejs-templates.github.io/webpack)

##  技术栈
* `vue`：[https://github.com/vuejs/vue](https://github.com/vuejs/vue)
* `vuex`：[https://github.com/vuejs/vuex](https://github.com/vuejs/vuex)
* `vue-router`：[https://github.com/vuejs/vue-router](https://github.com/vuejs/vue-router)
* `vue-cli`：[https://github.com/vuejs/vue-cli](https://github.com/vuejs/vue-cli)
* `axios`：[https://github.com/mzabriskie/axios](https://github.com/mzabriskie/axios)
* `webpack`：[https://github.com/webpack](https://github.com/webpack)

## bug
错误提示
```bash
$ cnpm install
[npminstall:get] retry GET http://registry.npm.taobao.org/selenium-server/download/selenium-server-3.5.2.tgz after 100ms, retry left 4, error: ResponseTimeoutError: Response timeout for 60000ms, GET https://cdn.npm.taobao.org/selenium-server/-/selenium-server-3.5.2.tgz 200 (connected: true, keepalive socket: false, agent status: {"createSocketCount":3,"createSocketErrorCount":0,"closeSocketCount":3,"errorSocketCount":0,"timeoutSocketCount":2,"requestCount":3,"freeSockets":{},"sockets":{},"requests":{}})
headers: {"server":"Tengine","content-type":"application/octet-stream","content-length":"19328248","connection":"keep-alive","date":"Wed, 30 Aug 2017 08:37:55 GMT","x-oss-request-id":"59A6796312058DF222CBCF82","accept-ranges":"bytes","etag":"\"B6B3E78C27FD39DD9234AFD822368450\"","last-modified":"Sat, 26 Aug 2017 08:35:33 GMT","x-oss-object-type":"Normal","x-oss-hash-crc64ecma":"13154839708924026398","x-oss-storage-class":"Standard","cache-control":"max-age=0, s-maxage=86400","content-md5":"trPnjCf9Od2SNK/YIjaEUA==","x-oss-server-time":"3","via":"cache10.l2et15[0,304-0,H], cache8.l2et15[1,0], kunlun3.cn288[0,200-0,H], kunlun3.cn288[2,0]","age":"61826","x-cache":"HIT TCP_HIT dirn:2:922752046","x-swift-savetime":"Wed, 30 Aug 2017 08:38:23 GMT","x-swift-cachetime":"86372","timing-allow-origin":"*","eagleid":"d3a236a915041441011946084e"}

```
解决方案：
```bash
npm install babel-runtime --save
```

## Root Folder Structure
```bash
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── dev-client.js
│   ├── dev-server.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   ├── webpack.prod.conf.js
│   └── webpack.test.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   ├── prod.env.js
│   └── test.env.js
├── src
│   ├── assets  # common assets folder
│   │   ├── img
│   │   │   └── logo.png
│   │   ├── js
│   │   └── css
│   ├── components # common components folder
│   │   ├── Footer.vue
│   │   ├── Header.vue
│   │   └── Index.vue
│   └── router
│       └── index.js
├── static
│   └── .gitkeep
├── .babelrc          # babel config (es2015 default)
├── .editorconfig
├── .gitignore
├── .postcssrc.js
├── index.html
├── package.json
└── README.md         # readme
```

## [API Proxying During Development](https://vuejs-templates.github.io/webpack/proxy.html)
>When integrating this boilerplate with an existing backend, a common need is to access the backend API when using the dev server. To achieve that, we can run the dev server and the API backend side-by-side (or remotely), and let the dev server proxy all API requests to the actual backend.
> [gitbooks](https://lvyongbo.gitbooks.io/vuejs-templates/content/proxy.html)

```javascript
// config/index.js
module.exports = {
  // ...
  dev: {
    proxyTable: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
```

## PHP Server data
```php
<?php
  $array = array(
    0 => array(
    "NEWSID"=>1,
     "NEWSTYPE"=>1,
     "IMGURL"=>"./static/image/m-img/slider1.jpg",
     "CITY"=>1
    ),
    1 => array(
    "NEWSID"=>2,
     "NEWSTYPE"=>1,
     "IMGURL"=>"./static/image/m-img/slider2.jpg",
     "CITY"=>1
    )
  );

  echo json_encode($array);
?>
```
Output
```javascript
[
    {
        "NEWSID": 1,
        "NEWSTYPE": 1,
        "IMGURL": "./static/image/m-img/slider1.jpg",
        "CITY": 1
    },
    {
        "NEWSID": 2,
        "NEWSTYPE": 1,
        "IMGURL": "./static/image/m-img/slider2.jpg",
        "CITY": 1
    }
]
```

## prerender-spa-plugin
* [prerender-spa-plugin](https://www.npmjs.com/package/prerender-spa-plugin)

```javascript
// build/webpack.prod.conf.js
var PrerenderSpaPlugin = require('prerender-spa-plugin')

new PrerenderSpaPlugin(
  Path.join(__dirname, '../dist'),
  [ '/' ]
)
```

## HTML5 History 模式
`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

``` js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 `http://yoursite.com/user/id`，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面。

### 后端配置例子

#### Apache
>到项目根目录新建 `.htaccess` 文件，内容如下：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```


***

## 技术支持
>[三镇网络技术有限公司](http://www.threetowns.cn)，专注于网络营销、电子商务和企业定制化建站服务，把正确的营销方向当作一种使命，帮助客户提供专业的网络营销方案。其雄厚的实力，专业的营销团队一直活跃于各大电子商务平台的前线。
>* 营销官网：`http://www.threetowns.cn`
>* 技术支持：`http://www.flowerboys.cn`

## 联系方式

* EMAIL联系方式：`threetowns@163.com`

| 官方网站 | 技术微信 | 技术QQ | QQ交流群 |
|--------|--------|--------|--------|
|![qq-1209445709](https://github.com/threetowns/About/raw/master/qrCode/website_threetowns.cn.jpg)|![wechat-433238694](https://github.com/threetowns/About/raw/master/qrCode/wechat_yonger_lei.jpg)|   ![qq-1209445709](https://github.com/threetowns/About/raw/master/qrCode/qq_1209445709.jpg)     |    ![qq-433238694](https://github.com/threetowns/About/raw/master/qrCode/qqGroup_433238694.jpg)    |
