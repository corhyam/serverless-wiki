'use strict';

var jwt = require('jsonwebtoken');
//generatePolicy方法用于生成一个IAM的策略，根据生成的是 'Allow' 或者 'Deny' 来判断，该用户是否拥有权限。
// 策略规定api gateway可调用的资源
var generatePolicy = function(principalId, effect, resource) {
    var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17';
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke';
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    return authResponse;
}

exports.handler = function(event, context, callback){
    if (!event.authorizationToken) {
    	callback('Could not find authToken');
    	return;
    }

    var token = event.authorizationToken.split(' ')[1];
    //const AUTH0_CLIENT_PUBLIC_KEY = new Buffer(process.env.AUTH0_CLIENT_PUBLIC_KEY);//这里测试一下用public key能不能解码
    var secretBuffer = new Buffer(process.env.AUTH0_SECRET,"base64");//可以通过环境变量获取 在lambda里面配了
    jwt.verify(token, secretBuffer, {algorithms: ['HS256']},function(err, decoded){//根据 AUTH0 的 ID 和密钥来校验 token 是否是有效
    	if(err){
    		console.log('Failed jwt verification: ', err, 'auth: ', event.authorizationToken);
    		callback('Authorization Failed');
    	} else {//判断令牌是否有效 有效就返回个策略
    		callback(null, generatePolicy('user', 'allow', event.methodArn));
    	}
    })
};
