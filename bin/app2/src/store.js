/*
 * @Author: wangzhong
 * @Date: 2020-07-10 16:31:08
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-12-07 14:51:47
 * @FilePath: /iceZoneChild/src/store.js
 */
import { createStore } from "redux";
import app2Reducer from "./reducers";

export const storeInstance = createStore(app2Reducer);
