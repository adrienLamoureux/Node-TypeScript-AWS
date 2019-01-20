var server = require("../dist/src/server");
const express = require("express");
const config = require("../config");

var bootServer = server.Server.getServerInstance();
var port = bootServer.getPort();
var server = bootServer.getApp();

const app = express();
app.use(config.env.API, server);

app.listen(port);

console.log("Express started on port: "+port);