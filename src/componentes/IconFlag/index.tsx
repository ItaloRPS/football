import React from "react"
import './styles.scss'
type IconFlagProp = {
    src:string
    size?:'small'|'medium'|'large'
}
export const IconFlag = ({src, size='small'}:IconFlagProp)=>{
    return (
        <img className={`flag ${size}`} src={src}/>
    )
}
