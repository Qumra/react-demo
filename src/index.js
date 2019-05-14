import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from '@/config/router.config'
// import sdk from '@/sdk.js'
ReactDOM.render(
    <Routes></Routes>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister({});
let config = {
    ip: '10.190.54.234',
    port: '8080',
    serverAddress: "10.190.54.234",
    serverHttpPort: "8080",
    sdkServerUrl: "http://localhost:8080"
}
// sdk.SMCSDK({config})
// console.log(sdk.huaweiSMCSDK.userInfo)
