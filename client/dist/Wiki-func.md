## 文档目前大致树状图

```
├── _icon
│   ├── cc.png
│   ├── ..jpg
├── _images
│   ├── acloud-guru.png
│   ├── ............
│   └── serverless-spa-architecture.png
├── _navbar.md
├── _sidebar.md
│   ├── _images
│   │   └── deploy-github-pages.png
│   ├── alicloud
│   │   ├── README.md
│   │   ├── _coverpage.md
│   │   ├── _image
│   │   │   └── alicloud.jpeg
│   │   ├── _sidebar.md
│   │   └── index.html
│   ├── aws
│   │   ├── README.md
│   │   ├── _coverpage.md
│   │   ├── _image
│   │   │   └── lambda.png
│   │   ├── _sidebar.md
│   │   └── index.html
│   ├── library
│   │   └── gitalk.min.js
│   └── unclassified
│       ├── README.md
│       ├── _coverpage.md
│       ├── _images
│       │   ├── 1D52FDFA-AD28-4459-B252-7A89D890E21A.png
│       │   ├── ...................
│       │   └── image-20210330184514594.png
│       ├── _sidebar.md
│       └── index.html
├── docsify-build.md
├── index.html
├── init.md
├── interview.md
├── jenkins-cicd.md
├── jenkins-github.md
├── jenkins.md
├── library
│   └── gitalk.min.js
├── merit.md
├──..................

```

> 截取部分文档树状图，详细可查看源码列表。[文件以及文件夹内容解释可在实现过程中查看（点击跳转）](docsify-build.md)



---



## 文档系统封面_coverpage

![image-20210331165341889](_images/image-20210331165341889.png)

>封面个人文档内容简介，Github跳转按钮，以及文档Get Started按钮，点击后跳转至README.md

---

## 搜索栏_search.min.js

![image-20210331181238646](_images/image-20210331181238646.png)

>页面左上角搜索栏，可根据需要搜索文档内容

---



## Edit on GitHub_跳转

![image-20210331181624659](_images/image-20210331181624659.png)

> 点击Edit on Github跳转至当前页面文档的链接页面。

---



## Github Corner 

![image-20210331181736312](_images/image-20210331181736312.png)

> 点击角标跳转至个人Github中

---

## 图片缩放以及代码复制到剪贴栏

```html
 <script src="//cdn.jsdelivr.net/npm/docsify-copy-code"></script><!--add Copy to Clipboard添加复制到剪贴板-->
 <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/zoom-image.min.js"></script><!--点击图片放大缩小-->
```

>引入相关JS实现，**点击图片可进行图片放大。移动鼠标至上方代码块会出现复制到剪贴板按钮**📋

## Gitalk评论功能

![image-20210331182248908](_images/image-20210331182248908.png)

>与Gitalk集成，实现评论功能，结合gIthub OAuth Apps以及github issue实现。发表的评论会保存在该项目的issue页面。
>
>https://github.com/corhyam/serverless-wiki/issues

