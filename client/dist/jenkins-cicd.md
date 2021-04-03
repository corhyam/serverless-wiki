## 一、思路介绍
由于个人Wiki代码基本都为静态代码，函数代码都已放至AWS Lambda中。静态代码以及静态文件存放在对象存储中。
为了省心省事，不用每次push代码上Github后仍需自己再部署一遍，所以就通过Jenkins来实现把代码推送到S3中实现简单的CI/CD。

![cicd architecture](_images/cicd-architeture.png)

## 二、操作过程
## 2.1



---



**2021.4.1**

![image-20210402224943563](_images/image-20210402224943563.png)

今天日常push代码到github，忽然发现没有自动部署，Jenkins管理页面也无法访问。本以为是服务器给宕了(因为我用的1核1g....)。

到AWS控制台后发现服务器正常运行，通过ssh进入服务器之后，`docker ps -a`查看到jenkins容器停掉了`Exited(137)`，上网查了一下貌似挺多出现这种问题都是内存分配问题，可能是OOM引起。

此处重新`docker start`了一下该容器继续使用。