//这个js主也要负责令牌的校验和解码，成功则向auth0提供的userinfo endpoint发送请求。
// jwt也包含在请求中，userinfo返回用户信息，发回网站。大致思路 okeninfo弃用了
'use strict';

var jwt = require('jsonwebtoken');
var request = require('request');

exports.handler = function(event, context, callback){
    if (!event.authToken) {
        callback('Could not find authToken');
        return;
    }

    var id_token = event.authToken.split(' ')[1];//取id Token的值 拆分后第二个
    var access_token = event.accessToken;

    var secretBuffer = new Buffer(process.env.AUTH0_SECRET);
    jwt.verify(id_token, secretBuffer, function(err, decoded){
        if(err){
            console.log('Failed jwt verification: ', err, 'auth: ', event.authToken);
            callback('Authorization Failed: ' + id_token + ", error: " + err + ", auth: " + event.authToken);
        } else {

            var body = {
                'id_token': id_token,
                'access_token': access_token
            };

            var options = {
                url: 'https://'+ process.env.DOMAIN + '/userinfo',
                method: 'GET',
                json: true,
                body: body
            };

            request(options, function(error, response, body){
                console.log("Response0: " + JSON.stringify(response));
                if (!error && response.statusCode === 200) {
                    console.log("Response1: " + JSON.stringify(response));
                    callback(null, body);
                } else {
                    callback(error);
                }
            });
        }
    })
};

