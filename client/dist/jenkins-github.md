## Jenkins配置

**该Jenkins服务器使用AWS EC2，使用Docker进行安装，由于需要访问AWS S3存储桶，所以需要在该EC2服务器中添加可以访问AWS S3存储桶的IAM角色**

![image-20210401010251057](_images/image-20210401010251057.png)

>源码管理：Repository URL为该项目的https形式的.git链接
>
>**（如果使用SSH形式需要在Credentials中添加密钥，需在配置管理中修改）**

![image-20210401011305941](_images/image-20210401011305941.png)

>GitHub Webhook触发jenkins进行构建，需要去Github上进行配置。也可以选择定时构建或者轮询，定时去扫描代码有没有更新，和Crontab差不多。