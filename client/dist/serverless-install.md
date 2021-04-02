## 安装与初始化

>**Serverless Framework使用起来会很便捷，让你免于大部分的配置，只要编写`Serverless.yml`就可以完成云上资源的构建。**
>
>**但是Serverless Framework刚开始配置坑比较多，容易出现配置AWS密钥的时候会出现invalid token等问题。**
>
>**由于时区在国内，并且国内合作是和腾讯云，所以在下载之后都是默认提供商为腾讯云。网上资料极少，Serverless文档中也没有提及该部分，一直想切换云平台但是无果。后在Stack overflow，github issue等平台各种查看几十页的问题讨论，才找到有用的答案。详细可见下文**

首先确保系统包含以下环境：

- [Node.js](https://nodejs.org/en/) 
- [Git](https://git-scm.com/)

**1. 安装 Serverless Framework**

```shell
$ npm install -g serverless
```

