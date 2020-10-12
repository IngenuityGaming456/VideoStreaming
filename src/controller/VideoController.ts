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

    /***
     * Subscribes to the currentTimeChanged event which is to be sent to the server to store currentTime of the video.
     * @private
     */
    private subscribeListeners() {
        this.eventsObj.on("currentTimeChanged", (currentTime) => {
            this.onCurrentTimeChanged(currentTime);
        })
    }

    /***
     * On every currentTimeChanged event fired, send the currentTime payload to server.
     * @param currentTime
     * @private
     */
    private onCurrentTimeChanged(currentTime) {
        this.socket.emit("getCurrentTime", currentTime);
    }

    /***
     * Making a socket.io connection to ensure the video plays from the same point where the user left it.
     * @private
     */
    private makeConnection() {
        this.socket = io();
        this.socket.on("updatedCurrentTime", (currentTime) => {
            this.onUpdatedCurrentTime(currentTime);
        })
        this.socket.on("connect", () => {
            console.log("a user just connected");
        });
    }

    /***
     * Get the updated currentTime from the server and start the video from their on a page load.
     * @param currentTime
     * @private
     */
    private onUpdatedCurrentTime(currentTime) {
        this.view.onCurrentTimeUpdated(currentTime);
    }

}