# Serverless架构的Wiki系统

>该Wiki系统主要使用AWS各产品，Serverless Framework以及docsify进行搭建。

>该知识库中概念性知识摘自网络上优秀文章以及各大百科。其余均为本人原创，非原创部分已标明相关出处。
>
>**由于本人造诣不深，仍在不断充实自己，文档仅用于记录一下该系统搭建过程中碰到的各种问题以及自己的学习过程，仅用于个人学习，如有错误之处或其他问题，还请予指正。**

**由于对云计算层面比较感兴趣，许多新兴技术应运而生。在接触到AWS Lambda与阿里云函数计算时，感觉Serverless技术较为有趣，故想尝试着搭建网站做做尝试。
初次接触Serverless架构，架构的想法如下。**

![architect pic](_images/serverless-architecture-version2.png)

> - **本人的个人域名在阿里云中，所以使用阿里云DNS云解析解析至AWS S3静态网站托管地址。**
> - **AWS Lambda：用作无服务器后端，实现用户信息反馈以及自定义授权方功能。**
> - **AWS API Gateway：API网关，统一对外接口**
> - **Auth0：第三方认证提供商**
> - **使用Serverless Framework进行docsify快速部署，并引入Jenkins+Github实现静态文档的CI/CD。**
> - **AWS CloudWatch：云监控服务**
> - **AWS CloudFront：内容分发网络(CDN)**

---



**如今资历尚浅，仍在不断充实自己。在搭建这个简单Wiki系统后，个人鄙见，感觉Serverless架构感觉落地仍需要一些时间，也常能在论坛中看到使用者诟病冷启动等等问题，在此次编写简单lambda函数时也感觉略微繁琐，缺乏调试工具。**
**在本人实习阶段，接触到许多idc上云，一些大公司也已经有着自己的k8s集群，并且如今Kubernetes也有许多Serverless产品，免去繁琐的内容即可使用，起码在现阶段，大部分技术架构都会慢慢都会往这个方向去靠。目前感觉自己也应把容器与Kubernetes相关知识做为未来的学习方向，多了解云原生知识**

>**部分文档目前仍在整理中。。。**🐌

