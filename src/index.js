import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import sdk from './sdk1'
// import App from './App';
import Login from './view/Login/Login'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Login />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
const config = {
        "sdkServerUrl": "https://10.162.247.125:9898/sdkserver"
}
sdk.SMCSDK(config)