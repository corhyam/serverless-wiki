apigateway 通过映射模版传值过去 lambda通过event接受
https://blog.csdn.net/zzdjk6/article/details/46542145/ 静态网站解析存储桶时问题

<span id="busuanzi_container_site_pv" style='display:none'>
    本站总访问量<span id="busuanzi_value_site_pv"></span>次|<br>
    本站访客数：<span id="busuanzi_value_site_uv"></span>人次<br>
</span>

> 隔三差五会涌现出一波波技术热潮，扬言要淘汰前一代技术。现在一种名为“无服务器”（serverless）的用来编写应用程序的技术成为了一个热议话题。其想法是，将你的应用程序部署成一系列函数，它们需要运行时按需调用。你不需要为管理服务器而担心，这些函数具有你所需要的扩展性，因为它们按需调用、并在集群上运行。

> 但是无服务器并不意味着没有Docker――实际上，Docker就是无服务器系统。你可以使用Docker容器来隔离这些函数，然后在Swarm上按需运行。无服务器这种技术可用来构建分布式应用程序，而Docker正是在上面构建这种应用程序的完美平台。

>随着时间的流逝，我们看到服务器失去了重要性。 逐渐但稳步地进行。

 > 不可见 ，确切地说。
 > 使用无服务器 ，您不再关心服务器。 它可能是物理机，云虚拟机， K8s吊舱 ， ECS容器 ……等等，甚至是物联网设备 。
 > 只要工作完成，没人在乎。

> 由于LVS是单机版的软件，若LVS所在服务器宕机则会导致整个后端系统都无法访问，因此需要有备用节点。
>
> 可使用keepalived软件模拟出虚拟IP，然后把虚拟IP绑定到多台LVS服务器上，浏览器访问虚拟IP时，会被路由器重定向到真实的LVS服务器
>
> 当主LVS服务器宕机时，keepalived软件会自动更新路由器中的路由表，把虚拟IP重定向到另外一台正常的LVS服务器，从而达到LVS服务器高可用的效果。

K8S 在微服务架构下做服务注册中心的一种思路

使用 K8S 的 Service 和 DNS:

每个微服务 都在 K8S 中创建一个 Service ,名起名比如: user.xingren.host ,
然后,其他微服务只需要 配置好这个 K8s 中的 Service name 即可,
最后,只要这些微服务服务都在一个 k8S 集群中运行,便可省去注册中心与服务发现的这些微服务组件

这种方案,在公司已经落地,并且运行稳定. 从技术上来看, 比 Eureka 和 Nacos 这种请求穿透的 注册中心要高效的多, 因为 K8s 的服务发现和负载均衡是通过 iptables 和 内部的 DNS 来实现的

摘录自：https://blog.csdn.net/itguangit/article/details/109731971

knative：

https://www.bookstack.cn/read/serverless-handbook/knative-primer-overview.md

https://zhuanlan.zhihu.com/p/139671487



不难看出，「无服务器」并不是真的没有服务器，而是由云计算厂商将管理服务器的繁杂事务自动化，为用户提供更贴近业务的接口，让用户可以更快速地进行业务的探索和创新。

此外，云计算的弹性资源池，以及以微虚拟机为单位的资源划分和占用，也让用户可以享受到云计算的最大优势：按需使用，按需付费。

从技术层面来说，Lambda 等无服务器计算服务，实际采用的就是已经很成熟的容器技术。只是 Lambda 使用了 AWS 自研的 Firecracker 技术，更快速并且更安全。

https://zhuanlan.zhihu.com/p/106513886



jenkins持续集成

https://www.liaoxuefeng.com/article/1083282007018592

https://blog.csdn.net/qq_35368183/article/details/84558134?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control&dist_request_id=&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control



工厂里的装配线以快速、自动化、可重复的方式从原材料生产出消费品。同样，软件交付管道以快速、自动化和可重复的方式从源代码生成发布版本。如何完成这项工作的总体设计称为“持续交付”（CD）。启动装配线的过程称为“持续集成”（CI）。确保质量的过程称为“持续测试”，将最终产品提供给用户的过程称为“持续部署”。一些专家让这一切简单、顺畅、高效地运行，这些人被称为 运维开发(DevOps)践行者。
https://blog.csdn.net/ichen820/article/details/115211978

https://blog.csdn.net/weixin_34037515/article/details/92258572  细看 持续集成步骤。



Serverless架构演变

https://www.jianshu.com/p/09e36a6dc503


微服务与容器
> 现在一提到微服务，有很多人会想到容器技术（这里说到的容器技术是指docker）。那么微服务和容器之间到底有什么关系呢，我来简要和大家探讨下。先抛出结论：微服务和容器其实没有半毛钱关系。微服务理念出现的比容器技术要早很多，其理念是在70年代提出的。而容器技术是2013年才提出的，它最初是由一个叫做dotcloud的项目发展而来，后来改名叫做docker。基于微服务的思想开发应用程序是完全可以不用容器技术的，例如现在很流行的spring cloud和dubbo都是可以不使用容器技术来做开发实现的。从2017年开始很多人喜欢同时提到微服务和容器化，这主要是基于以下几个原因：
  （1）按照微服务的理念，如果使用容器作为基础设施，能够实现快速部署，快速迭代；
  （2）在云计算浪潮中，容器作为替代vm的基础设施受到大家的关注度更高；
  （3）k8s作为几乎实际默认的容器化平台标准，其集成了配置中心和注册中心，相当于天然的帮微服务架构解决了自己开发配置中心和注册中心的问题。在我看来，以上三个是促使在2017年度很多时候，大家会将微服务和容器技术一起谈论的重要原因，甚至有些公司直接将自己的新建的微服务应用部署在容器平台上。
  容器是一种新的软件交付方式，它把应用和其运行环境以一个标准镜像格式打包， 能保证应用及其运行环境的统一，并能在装有Docker环境上以容器方式运行，不管宿主机是什么环境
  微服务是应用软件架构设计模式，推崇单一职责、服务自治、轻量通信和接口明确等原则， 基于此，容器可以比较好的配合使微服务易于开发和维护、按需伸缩等。
