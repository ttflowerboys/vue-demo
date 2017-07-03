# vue-zwy

> 基于`Vue`的多面应用。

##  技术栈
* `vue`、`vuex`、`vue-router`、`axios`、`webpack`
* UI组件：[iView](https://www.iviewui.com/docs/guide/install)


## Root Folder Structure
```bash
├── src  # main folder
│   ├── assets  # common assets folder
│   │   ├── img
│   │   │   └── logo.png
│   │   ├── js
│   │   └── css
│   ├── components # common components folder
│   │   └── modal.vue
│   └── views  # pages
│       ├── user  # user part (folder name can be customized)
│       │   ├── login # login.html (folder name can be customized)
│       │   │   ├── app.js   # entry js (file name can't be customized unless you change the webpack.config.js)
│       │   │   ├── app.vue  # login vue (file name can be customized)
│       │   │   └── app.html # template html (file name can't be customized unless you change the webpack.config.js)
│       │   └── index # index.html
│       │       ├── app.js
│       │       ├── app.html
│       │       └── app.vue
│       └── customer # customer part (folder name can be customized)
│           └── home # home.html
│               ├── app.html
│               ├── app.js
│               └── app.vue
├── LICENSE
├── .babelrc          # babel config (es2015 default)
├── .eslintrc.js      # eslint config (eslint-config-vue default)
├── server.js         # port 2333
├── package.json
├── postcss.config.js # postcss (autoprefixer default)
├── webpack.config.js
└── README.md
```

## 多入口
| column | column |
|--------|--------|
| utils |        |
|  glob | var glob = require('glob'); // glob模块，用于读取webpack入口目录文件 |





For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


http://blog.lanchenglv.com/article/vue2-webpack2-cli-vux2-multe-page.html

http://localhost:8882/find/friendcircle

https://mrleo.gitbooks.io/books/content/codes/Vue/vue-cli%E5%A4%9A%E9%A1%B5%E5%BA%94%E7%94%A8.html

http://www.jianshu.com/p/acbff04b4096

https://vuxjs.gitbooks.io/vux/content/

http://thunf.me/2017/02/17/20170217-grace-vue-boilerplate/


http://blog.csdn.net/m0_37558869/article/details/72803128