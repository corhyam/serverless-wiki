//这个js主也要负责令牌的校验和解码，成功则向auth0提供的tokeninfo endpoint发送请求。
// jwt也包含在请求中，tokeninfo返回用户信息，发回网站。大致思路
'use strict';

var jwt = require('jsonwebtoken');
var request = require('request');

exports.handler = function(event, context, callback){
    if (!event.authToken) {
    	callback('Could not find authToken');
    	return;
    }

    var token = event.authToken.split(' ')[1];

    var secretBuffer = new Buffer(process.env.AUTH0_SECRET);
    jwt.verify(token, secretBuffer, function(err, decoded){
    	if(err){
    		console.log('Failed jwt verification: ', err, 'auth: ', event.authToken);
    		callback('Authorization Failed');
    	} else {

        var body = {
          'id_token': token
        };

        var options = {
          url: 'https://'+ process.env.DOMAIN + '/tokeninfo',
          method: 'POST',
          json: true,
          body: body
        };

        request(options, function(error, response, body){
          if (!error && response.statusCode === 200) {
            callback(null, body);
          } else {
            callback(error);
          }
        });
    	}
    })
};
