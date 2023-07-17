import Button from "../components/button";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Socket from "../logic/socket";
import Dialog from "../components/dialog";
import ReadyDialog from "../components/readyDialog";
import Generics from "../logic/generics";


function App() {
  const playerRef = useRef<HTMLVideoElement>(null)
  const barRef = useRef<HTMLInputElement>(null)
  const timeRef = useRef<HTMLSpanElement>(null)
  const socket = useRef(new Socket(playerRef)).current
  // const [currentTime,setCurrentTime] = useState(0)


  function runEvent(e:string){
    socket.emit("video-event",e)
  }
  
  function fullscreen(){
    playerRef.current!.requestFullscreen()
  }

  function updateTime(){
    const current = playerRef.current!.currentTime
    const max = playerRef.current!.duration

    barRef.current!.value = current.toString()
    barRef.current!.max = max.toString()

    //update text
    timeRef.current!.textContent = `${Generics.parseTime(current)}/${Generics.parseTime(max)}`
  }

  function onChange(){
    const time = parseInt(barRef.current!.value)
    socket.emit("skip",time)
  }

  useEffect(() => {
    socket.player.unmute()
  },[])

  return (
    <div className="home">
      <div className="player">
        <video onTimeUpdate={updateTime} muted ref={playerRef}>
          <source src="/movie" />
        </video>
        <input ref={barRef} className="range" onChange={onChange} value="0" min="0" max="1" type="range" />
        <div className="player__toolbar">
          <Button icon onClick={() => runEvent("play")} text="play_arrow" color={1}/>
          <Button icon onClick={() => runEvent("pause")} text="pause" color={1}/>
          <Button icon onClick={fullscreen} text="fullscreen" color={1}/>
          <span className="home__time" ref={timeRef}>0:0:0/0:0:0</span>
        </div>
      </div>
      <ReadyDialog/>
    </div>
  )
}

export default App;
