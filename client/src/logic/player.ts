import { RefObject } from "react";

export default class Player{
    private ref;
    public paused:boolean;

    constructor(ref:RefObject<HTMLVideoElement>){
        this.ref = ref
        this.paused = true
    }

    public play(){
        this.paused = false
        this.ref.current!.play()
    }

    public pause(){
        this.paused = true
        this.ref.current!.pause()
    }

    public unmute(){
        this.ref.current!.muted = false
    }

    public toogle(){
        if(this.paused){
            this.play()
        }
        else{
            this.pause()
        }
    }

    public skipTo(time:number){
        this.ref.current!.currentTime = time
    }
}