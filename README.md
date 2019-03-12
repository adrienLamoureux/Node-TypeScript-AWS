# Node-TypeScript-AWS

## Pre-requiert

- nodejs v8.11.3 with npm v5.6.0 (https://nodejs.org/en/blog/release/v8.11.3/)
- DynamoDBLocal (https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

## Technologies

- Node.js with TypeScript
- Express server with Inversify and Passport
- Grunt with TypeScript compiler
- Jasmine for testing
- DynamoDBLocal with aws-sdk

## Getting Started

### Dependencies installation

```
npm install
```

### Setup DynamoDB

Go to the DynamoDB folder to start it with (Unix)

```
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

In the root folder, execute

```
node db/init.js
```

```
node db/update.js
```

```
node db/init.prod.js
```

### Test

```
npm test
```

### Start

```
npm start
```
