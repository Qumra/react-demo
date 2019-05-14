import React, { Component } from "react";
import cssObj from "./Logo.css";
function Logo(props) {
    const { logoStyle } = props
        return <div className={[cssObj.logoImg,cssObj.logoStyle].join(' ')}></div>
}
export default Logo
