import { io } from "socket.io-client";
import Player from "./player";
import { RefObject } from "react";

export default class Socket{
    private socket;
    
    public player:Player;

    constructor(playerRef: RefObject<HTMLVideoElement>){
        this.socket = io()
        this.player = new Player(playerRef)
    
        this.socket.on('video-event',(payload) => {
          switch (payload){
            case "play":
              this.player.play()
              break;
            case "pause":
              this.player.pause()
              break
            case "play_pause":
              this.player.toogle()
              break;
          }
        })

        this.socket.on("skip",(time) => {
          this.player.skipTo(time)
        })
    }

    public emit(event:string,payload?:any){
        this.socket.emit(event,payload)
    }
}