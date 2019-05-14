import React from 'react';
import cssObj from'./App.css';
import Login from './views/base/Login/Login.jsx'
// import { Button } from 'antd';

function App() {
  return (
    <div className={cssObj.App}>
      {/* <Button type="primary">Button</Button> */}
      <Login></Login>
    </div>
  );
}

export default App;

