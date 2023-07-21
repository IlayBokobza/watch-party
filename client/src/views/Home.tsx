import Button from "../components/button";
import { ChangeEvent, useEffect, useRef } from "react";
import Socket from "../logic/socket";
import ReadyDialog from "../components/readyDialog";
import Generics from "../logic/generics";


function App() {
  const playerRef = useRef<HTMLVideoElement>(null)
  const timeBarRef = useRef<HTMLInputElement>(null)
  const volumeBarRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const socket = useRef(new Socket(playerRef)).current

  //runs an event
  function runEvent(e:string){
    socket.emit("video-event",e)
  }
  
  //sets fullscreen
  function fullscreen(){
    playerRef.current!.requestFullscreen()
  }

  //update the time in text and bar
  function updateTime(){
    const current = playerRef.current!.currentTime
    const max = playerRef.current!.duration

    timeBarRef.current!.value = current.toString()
    timeBarRef.current!.max = max.toString()

    //update text
    timeRef.current!.textContent = `${Generics.parseTime(current)}/${Generics.parseTime(max)}`
  }

  //skips when clicks the bar
  function handleTimelineSkip(){
    const time = parseInt(timeBarRef.current!.value)
    socket.emit("skip",time)
  }

  //skip in x amount of seconds
  function skipInSeconds(skip:number){
    const time = playerRef.current!.currentTime
    socket.emit("skip",time + skip)
  }

  //sync time between users
  function sync(){
    const time = playerRef.current!.currentTime
    runEvent("play")
    socket.emit("skip",time)
  }

  //when update volume
  function handleVolumeUpdate(e:ChangeEvent<HTMLInputElement>){
    const value = parseFloat(e.target.value)

    if(value <= 1){
      playerRef.current!.volume = value
      socket.player.audioGain!.amplify(1)
    }
    else{
      playerRef.current!.volume = 1
      socket.player.audioGain!.amplify(value)
    }
  }

  //when pop up is clicked
  function ready(){
    socket.player.createAudioGain()
  }

  useEffect(() => {
    volumeBarRef.current!.value = "1"
  },[])

  return (
    <div className="home">
      <div className="player">
        <video onTimeUpdate={updateTime} ref={playerRef}>
          <source src="/movie" />
        </video>
        <input ref={timeBarRef} className="range" onChange={handleTimelineSkip} value="0" min="0" max="1" type="range" />
        <div className="player__toolbar">
          <Button icon onClick={() => runEvent("play")} text="play_arrow" color={1}/>
          <Button icon onClick={() => runEvent("pause")} text="pause" color={1}/>
          <Button icon onClick={() => skipInSeconds(-10)} text="keyboard_double_arrow_left" color={1}/>
          <Button icon onClick={() => skipInSeconds(10)} text="keyboard_double_arrow_right" color={1}/>
          <Button icon onClick={sync} text="sync_alt" color={1}/>
          <Button icon onClick={fullscreen} text="fullscreen" color={1}/>
          <div className="right">
            <span className="home__time" ref={timeRef}>0:0:0/0:0:0</span>
            <div className="volume">
              <span className="material-symbols-outlined">volume_up</span>
              <input ref={volumeBarRef} onChange={handleVolumeUpdate} step={0.1} type="range" min={0} max={4} />
            </div>
          </div>
        </div>
      </div>
      <ReadyDialog onClick={ready} />
    </div>
  )
}

export default App;
