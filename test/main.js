/* globals
console, process, require 
*/

// Configure aws sdk to test skill locally as per: https://developer.amazon.com/blogs/post/tx24z2qzp5rrtg1/new-alexa-technical-tutorial-debugging-aws-lambda-code-locally

// Copyright 2015, Amazon Web Services.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// the role ARN to assume for any AWS SDK related calls
// the role must have a trusted policy with
// "lambda.amazonaws.com" and "arn:aws:iam::<YOUR ACCOUNT ID>:user/<YOUR USER>"

var roleArn = 'arn:aws:iam::{your_role_id_here}:role/{role_name}';
var region = 'us-east-1'; // Change if you're using a different region
/* DO NOT MAKE CHANGE BELOW THIS */
var AWS = require('aws-sdk');

function context() {
   var context = require('./context.json');
   context.done = function(error, result) {
       console.log('context.done');
       console.log(error);
       console.log(result);
       process.exit();
   }
   context.succeed = function(result) {
       console.log('context.succeed');
       console.log(result);
       process.exit();
   }
   context.fail = function(error) {
       console.log('context.fail');
       console.log(error);
       process.exit();
   }

   return context;
}

AWS.config.region = region;
var sts = new AWS.STS();
sts.assumeRole({
    RoleArn: roleArn,
    RoleSessionName: 'emulambda'
}, function(err, data) {
    if (err) { // an error occurred
        console.log('Cannot assume role');
        console.log(err, err.stack);
    } else { // successful response
        AWS.config.update({
            accessKeyId: data.Credentials.AccessKeyId,
            secretAccessKey: data.Credentials.SecretAccessKey,
            sessionToken: data.Credentials.sessionToken
        });
        var Module = require('module');
        var originalRequire = Module.prototype.require;
        Module.prototype.require = function(){
          if (arguments[0] === 'aws-sdk'){
            return AWS;
          } else {
            return originalRequire.apply(this, arguments);
          }
        };
        var lambda = require('../src/index.js');
        // var event = require('./turn_input.json');
        var event = require('./longest_game.json');
        // var event = require('./start_game.json');        
        lambda.handler(event, context());
    }
});
