/***
 * To return the requested element tag.
 * @param key
 */
export function getElementTag(key: string): HTMLElement {
    return document.getElementById(key);
}

/***
 * To switch from portrait to landscape on full screen switch
 * @param from
 */
export async function fullScreenSwitch(from: string) {
    try {
        await document.documentElement.requestFullscreen();
        const currentOrientation = screen.orientation;
        if(currentOrientation.type === from) {
            await screen.orientation.lock("landscape");
        }
    } catch(err) {
        console.log(err);
    }
}