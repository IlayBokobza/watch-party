import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use('/',express.static('dist'))

app.get('/movie',(req,res) => {
  
  if(/^http/.test(process.env.MOVIE!)){
    res.redirect(process.env.MOVIE!)
  }else{
    res.sendFile(process.env.MOVIE!)
  }
})

io.on("connection", (socket) => {
  socket.on('video-event',(payload) => {
    io.emit('video-event',payload)
  })

  socket.on('skip',(payload) => {
    io.emit('skip',payload)
  })
});

const port = 3000
httpServer.listen(port,() => {
  console.log('Running on port ' + port)
});