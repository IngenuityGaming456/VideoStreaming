const { ExpressServer } = require("./ExpressServer");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
(function () {
    let currTime = null;
    new ExpressServer(express, app, http, io, currTime);
})();
//# sourceMappingURL=server.js.map