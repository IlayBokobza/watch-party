import { MouseEventHandler } from "react"

type Color = 1 | 2 |3 | 4

export default function Button(props:{text:string,icon?:boolean,color:Color,className?:string,round?:boolean,linkTo?:string,onClick?:MouseEventHandler<HTMLButtonElement>}){

    
    function getClassName(){
        let className = `btn btn--color-${props.color}`

        if(props.round){
            className += ' btn--round'
        }
        
        if(props.className){
            className += ' ' + props.className
        }

        return className
    }

    
    return <button onClick={props.onClick} className={getClassName()}>
        <span className={"btn__text " + (props.icon ? "material-symbols-outlined" : "")}>{props.text}</span>
    </button>
}