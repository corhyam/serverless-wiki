## docsify初始化

**全局安装`docsify-cli`工具**

```bash
npm i docsify-cli -g
```

---



**项目初始化**

```bash
docsify init ./docs
```

**文件路径`./docs`可以根据你自己的选择做修改**

---



**初始目录结构**

初始化成功之后，会自动在目录中创建文件。

- `index.html` 入口文件
- `README.md` 会做为主页内容渲染，在访问网页时主页中显示该md的内容。
- `.nojekyll` 用于阻止 GitHub Pages 忽略掉下划线开头的文件。 **本文使用AWS S3做部署，所以该文件可要可不要**

直接编辑 `docs/README.md` 就能更新文档内容。

---



### 本地预览

使用`docsify serve`启动本地服务器实现预览

```bash
docsify serve docs
```

运行情况：

```
corhyam@Ccc-MacBook-Pro serverless-wiki % npm run docs

> s3-static-file@1.0.0 docs
> docsify serve client/dist

Serving /Users/corhyam/finalDesign/serverless-wiki/client/dist now.
Listening at http://localhost:3000

```

**此处本人文档内容在`client/dist`下，所以修改了`package.json`文件中的`Scripts`进行路径修改。**

**访问localhost:3000即可预览**   （由于需要搭配serverless framework中的Serverless-finch做部署，所以文档建设在client/dist内。）

---



### 目前文档目录结构

仅截取文件夹部分。

```
├── _icon
├── _images
├── docs
│   ├── _images
│   ├── alicloud
│   │   └── _image
│   ├── aws
│   │   └── _image
│   ├── library
│   └── unclassified
│       └── _images
└── library
├── index.html
├── README.md
├── _navbar.md
├── _sidebar.md
├── _404.md
├── _coverpage.md
```



- `_icon` 存放标题图标，主页图标。

- `_images` 存放文档图片。

- `docs` 存放各类文档内容，alicloud、AWS均为分支文档。

- `library` 存放需要调用的js文件

- `index.html` 入口文件

- `README.md` 自述文件，访问时内容显示在主页

- `_navbar.md` 页面导航栏

- `_sidebar.md` 页面侧边栏

- `_404.md` error页面

- `_coverpage.md` 网页封面文件

  > 此处仅展示已使用的插件，更多插件可去docsify文档中进行查看：https://docsify.js.org/

  ---
  
  

## _navbar页面导航栏

**HTML配置**

```html
<!-- index.html -->
<script>   
  window.$docsify = {
    loadNavbar: true   
  } 
</script> <script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
```
创建 `_navbar.md` 文件，内容如下:

```markdown
<!-- _navbar.md -->
- [:memo:主页](/)
- :memo:其他笔记
   - [AWS](docs/aws/)
   - [阿里云](docs/alicloud/)
   - [未整理笔记](docs/unclassified/)
```



## _coverpage 网页封面    

```html
<!-- index.html -->
<script>
  window.$docsify = {
    coverpage: true
  }
</script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
```

创建 `_coverpage.md` 文件，内容如下:

```markdown
<!-- _coverpage.md -->

![logo](_icon/icon2.svg)

#  Corhyam's Wiki

> 一个基于Serverless架构的个人wiki

- Serverless Framework
- AWS S3，AWS Lambda，AWS Cloudformation，
- 阿里云 DNS云解析

[GitHub](https://github.com/corhyam)
[Get Started](README.md)
```

## _sidebar网页侧边栏

```html
<!-- index.html -->
<script>
  window.$docsify = {
    loadSidebar: true
  }
</script>
<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
```

创建 `_sidebar.md` 文件，内容如下:

```markdown
<!-- _sidebar.md -->
- 无服务器(Serverless)
  - [什么是Serverless](what-is-serverless.md)
  - [Serverless的优点](merit.md)
  - [Serverless适用于哪些场景](scene.md)
  - [Serverless存在什么问题](demerit.md)
  
- 系统概述
  - [AWS云上资源](aws-resource.md)
  - [Wiki系统实现功能](Wiki-func.md)
  - [Auth0集成Lambda实现自定义授权](custom-authorizer.md)
  - [Jenkins-Github自动部署](jenkins-github.md)
```

