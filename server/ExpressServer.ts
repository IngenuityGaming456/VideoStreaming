import * as path from "path";
import * as fs from "fs";
import {getRangedChunks} from "./utils";

export class ExpressServer {
    private express;
    private app;
    private http;
    private io;
    private currTime;

    public constructor(express, app, http, io, currTime) {
        this.express = express;
        this.app = app;
        this.http = http;
        this.io = io;
        this.currTime = currTime;
        this.startServer();
    }

    private startServer() {
        this.applyMiddleWares();
        this.makeIOConnection();


        this.http.listen(3000, () => {
            console.log("listening on 3000");
        })
    }

    private applyMiddleWares() {
        this.app.use(this.express.static(path.join(__dirname, '../public')));

        this.app.get('/', function(req, res) {
            res.sendFile(path.join(__dirname, '../index.htm'));
        })

        this.app.get('/video', function(req, res) {
            const assetPath = '../assets/sample.mp4';
            const stat = fs.statSync(assetPath);
            const fileSize = stat.size;
            const range = req.headers.range;
            if (range) {
                const {file, head} = getRangedChunks(range, fileSize, res, assetPath);
                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                }
                res.writeHead(200, head);
                fs.createReadStream(assetPath).pipe(res);
            }
        })
    }

    private makeIOConnection() {
        this.io.on("connection", (socket) => {
            console.log("a user just connected");
            if(this.currTime > 0) {
                socket.emit("updatedCurrentTime", this.currTime);
            }
            socket.on("getCurrentTime", (currentTime) => {
                this.onGetCurrentTime(currentTime);
            });
        });
    }

    private onGetCurrentTime(currentTime) {
        this.currTime = currentTime;
    }

}