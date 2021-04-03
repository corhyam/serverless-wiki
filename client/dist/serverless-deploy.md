## 使用Serverless finch部署docsify

安装`Serverless finch`

```bash
npm install --save serverless-finch
```

> serverless-finch可以用作静态网站部署，运行`serverless client deploy`命令后会部署client/dist里面的内容至存储桶。

创建serverless.yml

```bash
touch serverless.yml
```

将以下内容填入到serverless.yml中

```
service: docsify-test

plugins:
  - serverless-finch
#client 网站部署plugins

custom:
  client:
    bucketName: serverless-aws-docsify

provider:
  name: aws
  runtime: nodejs12.x
```

> **其中`service`为服务名，`bucketName`根据自己的需求进行修改**

最后，部署docsify

```bash
serverless client deploy
```

即可部署至aws s3存储桶中，返回的域名即为静态网站托管的域名。

---

---



## 实操

**配置好对应凭证之后，部署全过程命令以及部署全过程日志如下：**

```shell
corhyam@Ccc-MacBook-Pro aws-serverless-docsify % ls
corhyam@Ccc-MacBook-Pro aws-serverless-docsify % docsify init client/dist

Initialization succeeded! Please run docsify serve client/dist

corhyam@Ccc-MacBook-Pro aws-serverless-docsify % docsify serve client/dist

Serving /Users/corhyam/aws-serverless-docsify/client/dist now.
Listening at http://localhost:55627

^C
corhyam@Ccc-MacBook-Pro aws-serverless-docsify % npm install --save serverless-finch

up to date, audited 125 packages in 2s

found 0 vulnerabilities
corhyam@Ccc-MacBook-Pro aws-serverless-docsify % touch serverless.yml
corhyam@Ccc-MacBook-Pro aws-serverless-docsify % vim serverless.yml
corhyam@Ccc-MacBook-Pro aws-serverless-docsify % serverless client deploy
Serverless: This deployment will:
Serverless: - Upload all files from 'client/dist' to bucket 'serverless-aws-docsify'
Serverless: - Set (and overwrite) bucket 'serverless-aws-docsify' configuration
Serverless: - Set (and overwrite) bucket 'serverless-aws-docsify' bucket policy
Serverless: - Set (and overwrite) bucket 'serverless-aws-docsify' CORS policy
? Do you want to proceed? true
Serverless: Looking for bucket...
Serverless: Bucket found...
Serverless: Deleting all objects from bucket...
Serverless: Configuring bucket...
Serverless: Configuring policy for bucket...
Serverless: Retaining existing tags...
Serverless: Configuring CORS for bucket...
Serverless: Uploading client files to bucket...
Serverless: Success! Your site should be available at http://serverless-aws-docsify.s3-website-us-east-1.amazonaws.com/
corhyam@Ccc-MacBook-Pro aws-serverless-docsify % tree
.
├── client
│   └── dist
│       ├── README.md
│       └── index.html
└── serverless.yml

2 directories, 3 files

```

>http://serverless-aws-docsify.s3-website-us-east-1.amazonaws.com/ 即为docsify文档托管域名，最好是使用自己域名，根据自己的需求，把该CNAME加入到域名解析。

**同理，该Wiki中自定义认证授权实现中的前置网页http://auth0.corhyam.xyz 也是使用Serverless finch进行静态网站部署。**



---



---





## Serverless部署云上函数等资源

> auth0.corhyam.xyz网站最初的资源是通过编写serverless.yml进行云上资源创建与部署的。

```bash
service: auth0-test

plugins:
  - serverless-finch

custom:
  client:
    bucketName: auth0.ccc

provider:
  name: aws
  runtime: nodejs12.x

functions:
  auth:
    handler: handler.auth
    environment:
      AUTH0_ID: ${file(./config.yml):AUTH0_ID}
      AUTH0_SECRET: ${file(./config.yml):AUTH0_SECRET}

  publicEndpoint:
    handler: handler.publicEndpoint
    events:
      - http:
          path: api/public
          method: get
          integration: lambda
          cors: true
  privateEndpoint:
    handler: handler.privateEndpoint
    events:
      - http:
          path: api/private
          method: get
          integration: lambda
          authorizer: auth
          cors:
            origins:
              - '*'
            headers:
              - Content-Type
              - X-Amz-Date
              - Authorization
              - X-Api-Key
              - X-Amz-Security-Token
              - accessToken
```

> 上方的`serverless.yml`是第一版的yml文件，根据模版进行修改，但由于实现的函数问题，在部署完响应的资源之后，因为需求关系就采取了别的做法，后大部分都以控制台操作为主。

**但是该`serverless.yml`让我的后续开发与部署有了雏形。**

>该`yml`文件中
>
>service：服务名称，Lambda函数名
>
>plugins：安装了serverless-finch 插件
>
>custom：配置了个人的存储桶
>
>provide：配置提供商以及选择函数运行环境
>
>functions：function内容为lambda函数的配置，此处包含了三个函数，`auth`,`publicEndpoint`,`privateEndpoint`三个函数，并且两个endpoint中，在API Gateway创建了两个HTTP API。并且配置了一些跨域请求头，自定义授权函数等。
>
>handler：通过在函数的配置上设置处理程序参数来告诉 Lambda 运行时要调用哪个处理程序方法。当您在 Node.js 中配置函数时，处理程序`index.handler`，它调用的就是 `index.js` 中的 `exports.handler`。

在编写完`serverless.yml`后，运行下方命令即可部署:

```bash
serverless deploy -v
```

会出现如下的日志：

```bash
Serverless: Deprecation warning: Resolution of lambda version hashes was improved with better algorithm, which will be used in next major release.
            Switch to it now by setting "provider.lambdaHashingVersion" to "20201221"
            More Info: https://www.serverless.com/framework/docs/deprecations/#LAMBDA_HASHING_VERSION_V2
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service auth0-service-test-outdated.zip file to S3 (80.88 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
CloudFormation - UPDATE_IN_PROGRESS - AWS::CloudFormation::Stack - auth0-service-test-outdated-dev
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - AuthLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - PublicEndpointLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::Logs::LogGroup - PrivateEndpointLogGroup
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution
CloudFormation - CREATE_IN_PROGRESS - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_COMPLETE - AWS::ApiGateway::RestApi - ApiGatewayRestApi
CloudFormation - CREATE_IN_PROGRESS - AWS::IAM::Role - IamRoleLambdaExecution

```

> 若部署完成可前往控制台中查看资源。

