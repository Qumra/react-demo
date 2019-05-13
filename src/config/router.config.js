import React from 'react'
import {Router , Route, Switch, browserHistory, /* , Redirect */ } from 'react-router-dom'
import history from './history';
import * as base from '@/views/base'
import app from '@/App'
export default () => (
    //设为hashHistory，路由将通过URL的hash部分（#）切换，URL的形式类似example.com/#/some/path。
    <Router history={history}>
        <Switch>
            <Route path="/" component={app} />
            {/* <Route path="/login" component={base.Login} /> */}
            <Route path="/main" component={base.Main}>
            </Route>
        </Switch>
    </Router>
)