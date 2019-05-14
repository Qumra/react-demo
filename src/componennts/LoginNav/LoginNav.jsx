import { Menu, Icon } from 'antd';
import React, { Component } from "react";
import cssObj from"./LoginNav.css"
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
class LoginNav extends Component {
    constructor(){
        super()
        this.state = {
            theme:"dark" 
        }
    }
    getInitialState() {
        return {
          current: 'mail'
        };
    };
    handleClick(e) {
        console.log('click ', e);
        this.setState({
          current: e.key
        })
    };
    render (){
        return  <Menu 
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        className={cssObj.navRight}
        theme={this.state.theme}
        mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="mail" />登录
        </Menu.Item>
        <Menu.Item key="app">
          <Icon type="appstore" />TE Desktop下载
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />语言</span>}>
          <MenuItemGroup title="分组1">
            <Menu.Item key="setting:1">选项1</Menu.Item>
            <Menu.Item key="setting:2">选项2</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="http://www.alipay.com/" ><Icon type="question-circle" theme="outlined" />帮助</a>
        </Menu.Item>
      </Menu>
    }
}
export default LoginNav
