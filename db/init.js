const config = require("../config");
const ddb = require('./aws');

var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'username',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'username',
      KeyType: 'HASH'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: config.test.USER_TABLE,
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});