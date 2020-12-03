/*
 * @Author: wangzhong
 * @Date: 2020-07-07 22:18:40
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-12-03 14:43:56
 * @FilePath: /iceZoneChild/src/singleSpaEntry.js
 */
import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App";

function domElementGetter() {
  let el = document.getElementById("{{name}}");
  if (!el) {
    el = document.createElement("div");
    el.id = "{{name}}";
    document.body.append(el);
  }

  return el;
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: App,
  domElementGetter,
});

export function bootstrap(props) {
  return reactLifecycles.bootstrap(props);
}

export function mount(props) {
  return reactLifecycles.mount(props);
}

export function unmount(props) {
  return reactLifecycles.unmount(props);
}
