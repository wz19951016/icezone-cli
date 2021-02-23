/*
 * @Author: wangzhong
 * @Date: 2020-12-08 16:11:09
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-01-26 18:11:41
 * @FilePath: /icezone-cli/bin/webpackHandle.js
 */
const path = require('path');
const spawn = require("child_process").spawn
console.log(process.argv)
const webpackHandle = () => {
  return new Promise((resolve, reject) => {
    const targetPath = path.resolve(process.cwd(), process.argv[2]);
    console.log(targetPath)
    const install = spawn("webpack", [], {cwd: targetPath, shell: true})
    install.on("exit", () => {
      resolve("success")
    })
    install.on("error", (err) => {
      console.log(err)
      resolve("success")
    })
  })
}
webpackHandle()

