const fs = require('fs')
const path = require('path')
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let currTime = null;

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.htm'))
})

app.get('/video', function(req, res) {
  const path = 'assets/sample.mp4'
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return
    }

    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
  const head = {
    'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
  }
  res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
})

io.on("connection", (socket) => {
  console.log("a user just connected");
  if(currTime > 0) {
    socket.emit("updatedCurrentTime", currTime);
  }
  socket.on("getCurrentTime", (currentTime) => {
    onGetCurrentTime(currentTime);
  });
});

http.listen(3000, () => {
  console.log("listening on 3000");
})

function onGetCurrentTime(currentTime) {
  currTime = currentTime;
}