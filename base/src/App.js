/*
 * @Author: wangzhong
 * @Date: 2020-06-16 14:43:59
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-08-11 15:21:03
 * @FilePath: /ice/src/App.js
 */ 
import React from "react";
import ReactDom from "react-dom"
import Router from "./Router"
ReactDom.render(
  <Router/>,
  document.getElementById("app")
)