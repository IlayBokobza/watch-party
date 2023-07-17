import { useState } from "react";
import Dialog from "./dialog";
import Button from "./button";

export default function ReadyDialog(){
    const showState = useState(true)

    return <Dialog showSate={showState}>
        <h1>Are You Ready?</h1>
        <Button onClick={() => showState[1](false)} text="YES!" color={2}/>
    </Dialog>
}