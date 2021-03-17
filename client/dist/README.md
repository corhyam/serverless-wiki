## Serverless架构的Wiki系统
>该Wiki系统主要使用AWS各产品，Serverless Framework以及docsify进行搭建。
>
>此文档用于记录一下该系统搭建过程中碰到的各种问题以及自己的学习过程，如有错误之处，请予指正。
<!-- ![github p](_images/deploy-github-pages.png)图片测试-->

**由于对云计算层面比较感兴趣，许多新兴技术应运而生。在接触到AWS Lambda与阿里云函数计算时，感觉Serverless技术较为有趣，故想尝试着搭建一些简单的Demo做做尝试。
初次接触Serverless架构，架构的简单想法如下。**

![architect p](_images/architeture.png)


**如今资历尚浅，仍在不断充实自己。在搭建这个简单wiki系统后，个人鄙见，感觉Serverless架构感觉落地仍需要一些时间，也常能在论坛中看到使用者诟病冷启动等等问题，在此次编写简单lambda函数时也感觉略微繁琐。**
**在本人实习阶段，接触到许多idc上云，一些大公司也已经有着自己的k8s集群，并且如今Kubernetes也有许多Serverless产品，免去繁琐的内容即可使用，技术架构慢慢都会往这个方向去靠。目前感觉自己也应把容器与Kubernetes相关知识做为未来的学习方向，多了解云原生知识**