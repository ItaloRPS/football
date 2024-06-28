import React, { ReactNode } from "react"
import './styles.scss'
type HeaderProp = {
    children:ReactNode
}
export const Header = ({children}:HeaderProp)=>{
    return (
        <header className="header-style">
            {children}
        </header>
    )
}
