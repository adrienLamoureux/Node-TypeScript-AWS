const config = require("../config");

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
    region: config.env.DYNAMO_REGION,
    endpoint: "http://"+config.env.DYNAMO_URL+":"+config.env.DYNAMO_PORT
});

// Create the DynamoDB service object
const ddb = new AWS.DynamoDB({apiVersion: config.env.DYNAMO_API_VERSION});

module.exports = ddb;
