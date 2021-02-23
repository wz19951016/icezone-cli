/*
 * @Author: wangzhong
 * @Date: 2020-06-16 14:43:59
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-12-03 13:55:33
 * @FilePath: /icezoneTemplate/src/Router.js
 */ 
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import {history} from "./Loader.js"
import NotFound from "./404.js"


const Router = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/404">
          <NotFound/>
        </Route>
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  )
}
export default Router
