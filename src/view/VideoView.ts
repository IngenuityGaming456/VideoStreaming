import {getElementTag, fullScreenSwitch} from "../utils";

export class VideoView {
    private eventsObj
    public constructor(eventsObj) {
        this.eventsObj = eventsObj;
        this.handleVideoView();
    }

    private handleVideoView() {
        const vp: any = getElementTag("videoPlayer");
        const fb: any = getElementTag("fullScreen");
        vp.addEventListener("timeupdate", () => this.onTimeUpdate(vp));
        fb.addEventListener("click", () => fullScreenSwitch("portrait-primary", "landscape"));
    }

    private onTimeUpdate(vp) {
        this.eventsObj.emit("currentTimeChanged", vp.currentTime);
    }

    public onCurrentTimeUpdated(currentTime) {
        const vp: any = document.getElementById("videoPlayer");
        vp.currentTime = currentTime;
    }
}