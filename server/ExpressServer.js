"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const path = require("path");
const fs = require("fs");
const utils_1 = require("./utils");
const PORT = process.env.PORT || 3000;
class ExpressServer {
    constructor(express, app, http, io, currTime) {
        this.express = express;
        this.app = app;
        this.http = http;
        this.io = io;
        this.currTime = currTime;
        this.startServer();
    }
    startServer() {
        this.applyMiddleWares();
        this.makeIOConnection();
        this.http.listen(PORT, () => {
            console.log(`listening on ${PORT}`);
        });
    }
    applyMiddleWares() {
        this.app.use(this.express.static(path.join(__dirname, '../public')));
        this.app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, '../index.htm'));
        });
        this.app.get('/video', function (req, res) {
            const assetPath = path.join(__dirname, '../assets/sample.mp4');
            const stat = fs.statSync(assetPath);
            const fileSize = stat.size;
            const range = req.headers.range;
            if (range) {
                const { file, head } = utils_1.getRangedChunks(range, fileSize, res, assetPath);
                res.writeHead(206, head);
                file.pipe(res);
            }
            else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                };
                res.writeHead(200, head);
                fs.createReadStream(assetPath).pipe(res);
            }
        });
    }
    makeIOConnection() {
        this.io.on("connection", (socket) => {
            console.log("a user just connected");
            if (this.currTime > 0) {
                socket.emit("updatedCurrentTime", this.currTime);
            }
            socket.on("getCurrentTime", (currentTime) => {
                this.onGetCurrentTime(currentTime);
            });
        });
    }
    onGetCurrentTime(currentTime) {
        this.currTime = currentTime;
    }
}
exports.ExpressServer = ExpressServer;
//# sourceMappingURL=ExpressServer.js.map