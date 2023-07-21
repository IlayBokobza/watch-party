import { RefObject } from "react";

type AudioGain = {
    context: AudioContext;
    source: MediaElementAudioSourceNode;
    gain: GainNode;
    amplify: (multiplier: number) => void;
    getAmpLevel: () => number;
}

export default class Player{
    private ref;
    public paused:boolean;
    public audioGain:AudioGain | null = null

    constructor(ref:RefObject<HTMLVideoElement>){
        this.ref = ref
        this.paused = true
    }

    public createAudioGain() {
        const context = new AudioContext
        const result = {
            context: context,
            source: context.createMediaElementSource(this.ref.current!),
            gain: context.createGain(),
            amplify: function(multiplier:number) {
              result.gain.gain.value = multiplier;
            },
            getAmpLevel: function() {
              return result.gain.gain.value;
            }
          };
        result.source.connect(result.gain);
        result.gain.connect(context.destination);
        
        this.audioGain = result
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