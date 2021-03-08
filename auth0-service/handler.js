const jwt = require('jsonwebtoken');

const AUTH0_CLIENT_ID = process.env.AUTH0_ID;
const AUTH0_CLIENT_SECRET = process.env.AUTH0_SECRET;

//generatePolicy方法用于生成一个IAM的策略 官方DEMO 根据生成的是 'Allow' 或者 'Deny' 来判断，该用户是否拥有权限
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.auth = (event, context, cb) => {
  if (event.authorizationToken) {
    // remove "bearer " from token
    const token = event.authorizationToken.substring(7);
    const options = {
      audience: AUTH0_CLIENT_ID,
    };
    jwt.verify(token, AUTH0_CLIENT_SECRET, options, (err, decoded) => {  //根据 AUTH0 的 ID 和密钥来校验 token 是否是有效
      if (err) {
        cb('Unauthorized');
      } else {
        cb(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
      }
    });
  } else {
    cb('Unauthorized');
  }
};

// PublicAPI
module.exports.publicEndpoint = (event, context, cb) => {
  cb(null, { message: 'Welcome to our Public API!' });
};

// PrivateAPI
module.exports.privateEndpoint = (event, context, cb) => {
  cb(null, { message: 'Only logged in users can see this' });
};
