const config = require("../config");
const ddb = require("./aws");

var params = {
    TableName: config.test.USER_TABLE,
    Item: {
      'username' : {S: config.test.USER_USERNAME},
      'password' : {S: config.test.USER_PASSWORD}
    }
  };
  
  // Call DynamoDB to add the item to the table
  ddb.putItem(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });