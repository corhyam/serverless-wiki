## 安装与初始化

>**Serverless Framework使用起来会很便捷，让你免于大部分的配置，只要编写`Serverless.yml`就可以完成云上资源的构建。**
>
>**但是Serverless Framework刚开始配置坑比较多，容易出现配置AWS密钥的时候会出现invalid token等问题。**
>
>**由于时区在国内，并且国内合作是和腾讯云，所以在下载之后都是默认提供商为腾讯云。网上资料极少，Serverless文档中也没有提及该部分，一直想切换云平台但是无果。后在Stack overflow，github issue等平台各种查看几十页的问题讨论，才找到有用的答案。详细可见下文**

**1. 安装 Serverless Framework**

```shell
$ npm install -g serverless
```

**修改默认提供商(重要)**

> 不修改平台提供商则默认时`腾讯云`，某些命令反馈的情况也不相同。

 **修改环境变量**

```bash
vim ~/.bash_profile
```

**将下方环境变量配置添加到`.bash_profile`中**

```shell
export SERVERLESS_PLATFORM_VENDOR=aws
```

`:wq`保存之后输入下方命令使其生效

```shell
source ~/.bash_profile
```

查看版本

```bash
serverless -v
```

---



## 设置AWS凭证

### 配置凭证之前，需要先在AWS IAM（Identity & Access Management）中创建对应的用户，附加需要的策略后创建，并妥善保存您自己的密钥对。

官方的示例如下：

```bash
serverless config credentials --provider aws --key <your-key> --secret <your-secret-key>
```

又或者如我的做法，直接在` ~/.aws/credentials`中配置( 不存在则手动创建 )

```bash
vim ~/.aws/credentials
```

```
[default]
aws_access_key_id=<your-access-key>
aws_secret_access_key=<your-secret-key>
aws_session_token=FwoGZXIvYXdzEHQaDO3UKi03vjqW71YdlyLCARsCGafzixZWyZrZe/FmwC/SnHT0JlRr5UvLJGqltsP15zjT5wxNlN49TKabfhsBBp5GzseGH+G64r9+t**********
~                                                                               
~                                                                                                                                                                                                                                           
"~/.aws/credentials" [noeol] 4L, 498C
```

!> **由于此处本人的AWS账号为AWS educate账号，提供的是临时凭证，需要有session_token。**

!> **所以建议在IAM中创建AWS用户，附加需要的策略，创建用户后保存对应的AK/SK**