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

