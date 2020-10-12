import * as io from "socket.io-client";
import {VideoView} from "../view/VideoView";

export class VideoController {
    private view: VideoView;
    private eventsObj;
    private socket;

    public constructor(eventsObj, view: VideoView) {
        this.view = view;
        this.eventsObj = eventsObj;
        this.subscribeListeners();
        this.makeConnection();
    }

    private subscribeListeners() {
        this.eventsObj.on("currentTimeChanged", (currentTime) => {
            this.onCurrentTimeChanged(currentTime);
        })
    }

    private onCurrentTimeChanged(currentTime) {
        this.socket.emit("getCurrentTime", currentTime);
    }

    private makeConnection() {
        this.socket = io();
        this.socket.on("updatedCurrentTime", (currentTime) => {
            this.onUpdatedCurrentTime(currentTime);
        })
        this.socket.on("connect", () => {
            console.log("a user just connected");
        });
    }

    private onUpdatedCurrentTime(currentTime) {
        this.view.onCurrentTimeUpdated(currentTime);
    }

}