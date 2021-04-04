## 为什么选择docsify

![docsify](_icon/icon2.svg)

>docsify 是一个动态生成文档网站的工具。不同于 GitBook、Hexo 的地方是它不会将 `.md` 转成 `.html` 文件，所有转换工作都是在运行时进行。这将非常实用，如果只是需要快速的搭建一个小型的文档网站，或者不想因为生成的一堆 `.html` 文件“污染” commit 记录，只需要创建一个 `index.html` 就可以开始写文档而且直接部署在[GitHub Pages](https://links.jianshu.com/go?to=https%3A%2F%2Fdocsify.js.org%2F%23%2Fzh-cn%2Fdeploy)。

由于在完成这个Serverless架构的实验时，想着着手写一些文档来记录自己的学习进度以及是踩坑经历，最初使用一些Saas笔记软件来进行记录自己的学习进度，慢慢发现好像不是那么好整理并且也不是太美观。

---



- 最初第一个想法就是使用gitbook，`.html`文件实在太多，并且官网里的那道墙就已经让我却步。

- Hexo，WordPress，也是十分优秀的博客平台，Hexo有着一样的问题，如果做个人博客hexo与WordPress也是个不错的选择。

- MMWiki：轻量级的知识分享与团队协作软件，基于golang编写。由于本人golang方面造诣不深，所以....(只能怪自己学艺不精哎)。

- 还有很多诸如dokuWiki，TiddlyWiki，Wiki.js，mkdocs等，基本都有去了解过，clone过代码下来本地运行或使用其他部署方法进行部署。

  查看到docsify官方的这段文字时，便有一种想使用docsify进行搭建文档网站的冲动。一直以来查看过很多的Wiki搭建的开源项目，但是许多都感觉不是太合自己的口味，一直尝试无果。直到碰到docsify。

---

## 个人角度

- 感觉docsify使用起来更为轻巧简便，也无需进行什么构建，写完文档可以直接进行发布，主题以及插件都比较多。

- 个人比较偏爱vue.css风格的主题，页面的布局让人阅读起来较为舒适，配合sidebar能够让逻辑条理更清晰地进行文档展示。

- 有许多方便的插件，页面自定义起来方便，封装好的插件只需在`index.html`中进行简单调用便可以使用。

- 通过`docsify serve`命令，能够方便地进行本地实时预览。

> 毕竟各花入各眼，情人眼里出西施。以上仅为个人观点。


