/*
 * @Author: wangzhong
 * @Date: 2020-07-10 16:31:08
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-12-03 17:22:41
 * @FilePath: /iceZoneChild/src/store.js
 */
import { createStore } from "redux";
import app1Reducer from "./reducers";

export const storeInstance = createStore(app1Reducer);
