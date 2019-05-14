import React, { Component } from "react";
import cssObj from "./Login.css";
import LoginNav from "@/components/LoginNav/LoginNav.jsx"
import Logo from "@/components/Logo/Logo.jsx"
import LoginContain from "@/components/LoginContain/LoginContain.jsx"
import history from '@/config/history';
class Login extends Component {
    constructor(){
        super()
        this.state = {
        //   logoStyle:cssObj.logoImg
         
        }
    }
    render() {
        return (
            <div className={cssObj.Login}>
                <LoginNav></LoginNav>
                <div className={cssObj.bgDiv}>
                <Logo  logoStyle="logoStyle"></Logo>
                <LoginContain></LoginContain>
                <button onClick= {()=> history.push({pathname:'/main'})}>跳转</button>
                </div>
            </div>
        )
    }
}


export default Login
