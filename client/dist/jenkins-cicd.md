## 一、思路介绍
由于个人Wiki代码基本都为静态代码，函数代码都已放至AWS Lambda中。静态代码以及静态文件存放在对象存储中。
为了省心省事，不用每次push代码上Github后仍需自己再部署一遍，所以就通过Jenkins来实现把代码推送到S3中实现简单的CI/CD。

![cicd architecture](_images/cicd-architeture.png)

## 二、操作过程
### 2.1
