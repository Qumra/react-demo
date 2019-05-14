import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
// import { browserHistory } from 'react-router-dom'
import history from '@/config/history';
import { regExpConfig } from '@/config/Reg.confing'
import cssObj from './LoginContain.css'
// import sdk from '@/sdk.js'
const FormItem = Form.Item;
class LoginContain extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    
    this.props.form.validateFields(['userName', 'password'], (err, values) => {
       // values.callback=function(res){
      //   if(res.code!=0){
          
      //   }
      // }
      if (!err) {
        console.log('Received values of form: ', values);
        history.push({pathname:'/main'})
       
        // sdk.SMCSDK_User_Auth.login(values)

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className={cssObj.loginForm}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              { required: true, message: 'Please input your username!' },
              { pattern: regExpConfig.policeNo, message: '账号4-10位数字或字母组成' },
            ],

          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
            ],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className={cssObj.formButton}>
            Log in
              </Button>
        </FormItem>
      </Form>
    );
  }
}
LoginContain = Form.create()(LoginContain);
export default LoginContain
