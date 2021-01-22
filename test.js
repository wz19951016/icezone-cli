/*
 * @Author: wangzhong
 * @Date: 2021-01-12 17:58:37
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-01-21 11:43:16
 * @FilePath: /icezone-cli/test.js
 */
// const jsObj = require("./webpack")

// jsObj = jsObj.toString()

let str = `/*
* @Author: wangzhong
* @Date: 2020-03-03 10:50:54
* @LastEditors: wangzhong
* @LastEditTime: 2021-01-05 16:20:47
* @FilePath: /frog/src/index.js
*/
import React, { useReducer, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Router from "./route";
import { reducers, IndexContext } from "./context/index";
import "lib-flexible";

// const init = reducers()
// const initContext = {
//   state: init,
//   dispatch: null
// };
// export const IndexContext = createContext();
const init = reducers();
const Main = () => {
 const [state, dispatch] = useReducer(reducers, init);
 const [isOver, setIsOver] = useState(false);
 useEffect(() => {
   console.log("初始化app");
   console.log(window.location.href);
   sessionStorage.setItem("href", window.location.href);
   setIsOver(true);
 }, [1]);
 return (
   <IndexContext.Provider value={{ state, dispatch }}>
     {isOver && <Router />}
   </IndexContext.Provider>
 );
};

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
`

let reg1 = /ReactDOM.render\([^,]*/g
let reg2 = /<.*/g

console.log(str.match(reg1))
console.log(str.match(reg1)[0].match(reg2))