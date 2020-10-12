export function getElementTag(key: string): HTMLElement {
    return document.getElementById(key);
}

export async function fullScreenSwitch(from: string, to: string) {
    try {
        await document.documentElement.requestFullscreen();
        const currentOrientation = screen.orientation;
        if(currentOrientation.type === "portrait-primary") {
            await screen.orientation.lock("landscape");
        }
    } catch(err) {
        console.log(err);
    }
}