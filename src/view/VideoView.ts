export class VideoView {
    private eventsObj
    public constructor(eventsObj) {
        this.eventsObj = eventsObj;
        this.handleVideoView();
    }

    private handleVideoView() {
        const vp: any = document.getElementById("videoPlayer");
        vp.play();
        vp.addEventListener("timeupdate", () => this.onTimeUpdate(vp));
    }

    private onTimeUpdate(vp) {
        this.eventsObj.emit("currentTimeChanged", vp.currentTime);
    }

    public onCurrentTimeUpdated(currentTime) {
        const vp: any = document.getElementById("videoPlayer");
        const sp: any = document.getElementById("")
        vp.currentTime = currentTime;
    }
}