## 初始化docsify

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

---



## Serverless Framework

> 本文主要展示为使用Serverless Framework部署docsify至AWS。其余云平台如何配置可以根据[Serverless官网](https://www.serverless.com/)中的文档进行修改。由于国内Serverless Framework与腾讯云

**安装Serverless Framework**

```bash
npm install -g serverless
```

