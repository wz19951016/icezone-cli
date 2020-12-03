/*
 * @Author: wangzhong
 * @Date: 2020-06-16 14:43:59
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-12-02 18:46:54
 * @FilePath: /icezoneTemplate/src/Router.js
 */ 
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import {history} from "./Loader.js"


const Router = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
          <Route path="/app1"/>
          <Route path="/ma"/>
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  )
}
export default Router
