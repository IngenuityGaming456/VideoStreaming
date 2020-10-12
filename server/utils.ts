import * as fs from "fs";

/***
 * Get the chunk size from the range request header to provide chunk video data as a response.
 * @param range
 * @param fileSize
 * @param res
 * @param assetPath
 */
export function getRangedChunks(range, fileSize, res, assetPath) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
        ? parseInt(parts[1], 10)
        : fileSize-1

    if(start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
        return
    }

    const chunkSize = (end-start)+1
    const file = fs.createReadStream(assetPath, {start, end})
    const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
    }
    return {
        file,
        head
    }
}