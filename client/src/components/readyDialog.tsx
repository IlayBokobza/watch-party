import { useState } from "react";
import Dialog from "./dialog";
import Button from "./button";

export default function ReadyDialog(props:{onClick?:Function}){
    const showState = useState(true)

    function handleClick(){
        if(props.onClick){
            props.onClick()
        }

        showState[1](false)
    }

    return <Dialog showSate={showState}>
        <h1>Are You Ready?</h1>
        <Button onClick={handleClick} text="YES!" color={2}/>
    </Dialog>
}