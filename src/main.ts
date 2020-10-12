import {VideoView} from "./view/VideoView";
import {VideoController} from "./controller/VideoController";
import * as EventEmitter from "events";

function main() {
    const eventsObj = new EventEmitter();
    const videoView = new VideoView(eventsObj);
    new VideoController(eventsObj, videoView);
}

main()