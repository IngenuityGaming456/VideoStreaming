import {getElementTag, fullScreenSwitch} from "../utils";

export class VideoView {
    private eventsObj
    public constructor(eventsObj) {
        this.eventsObj = eventsObj;
        this.handleVideoView();
    }

    /***
     * Get the view elements and put the desired eventListeners.
     * @private
     */
    private handleVideoView() {
        const vp= getElementTag("videoPlayer");
        const fb = getElementTag("fullScreen");
        vp.addEventListener("timeupdate", () => this.onTimeUpdate(vp));
        fb.addEventListener("click", () => fullScreenSwitch("portrait-primary"));
        document.addEventListener("click", () => (vp as HTMLVideoElement).muted = false);
    }

    /***
     * For every currentTimeChanged event fired, send the payload to Controller.
     * @param vp
     * @private
     */
    private onTimeUpdate(vp) {
        this.eventsObj.emit("currentTimeChanged", vp.currentTime);
    }

    /***
     * Update the currentTime of the video so it starts from the same point where the user left it.
     * @param currentTime
     */
    public onCurrentTimeUpdated(currentTime) {
        const vp = document.getElementById("videoPlayer");
        (vp as HTMLVideoElement).currentTime = currentTime;
    }
}