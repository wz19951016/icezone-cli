/*
 * @Author: wangzhong
 * @Date: 2020-07-01 23:23:28
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-12-02 18:08:06
 * @FilePath: /icezoneTemplate/src/main.js
 */

import * as singleSpa from "single-spa";
import { GlobalEventDistributor } from "./globalEventDistributor";
import { loadApp } from "./loader";

const init = async () => {
  const globalEventDistributor = new GlobalEventDistributor();
  const loadingArray = [];
    loadingArray.push(
      loadApp(
        "app1",
        "/app1",
        "/app1Route/manifest.json",
        "/app1Route",
        true,
        globalEventDistributor
      )
    );
    loadingArray.push(
      loadApp(
        "app2",
        "/app2",
        "/app2Route/manifest.json",
        "/app2Route",
        true,
        globalEventDistributor
      )
    );
  // loadingArray.push(
  //   loadApp(
  //     "login",
  //     "/login",
  //     "/app1/manifest.json",
  //     "/app1",
  //     true,
  //     globalEventDistributor
  //   )
  // );
  // loadingArray.push(
  //   loadApp(
  //     "show",
  //     "/show",
  //     "/app2/manifest.json",
  //     "/app2",
  //     false,
  //     globalEventDistributor
  //   )
  // );
  // loadingArray.push(
  //   loadApp(
  //     "create",
  //     "/create",
  //     "/app3/manifest.json",
  //     "/app3",
  //     true,
  //     globalEventDistributor
  //   )
  // );
  // loadingArray.push(
  //   loadApp("iframe", "/iframe", "/app4/manifest.json", "/app4", false, null)
  // );
  await Promise.all(loadingArray);
  singleSpa.start();
};
init();
