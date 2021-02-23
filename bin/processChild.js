/*
 * @Author: wangzhong
 * @Date: 2020-12-08 16:11:09
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-01-26 17:56:51
 * @FilePath: /icezone-cli/bin/processChild.js
 */
const path = require('path');
const spawn = require("child_process").spawn
const {downloadTemplate, renameOrDelete} = require("./download.js")
console.log(process.argv)
const npmInstall = () => {
  return new Promise((resolve, reject) => {
    const targetPath = path.resolve(process.cwd(), process.argv[2]);
    console.log(targetPath)
    const install = spawn("npm", ["install"], {cwd: targetPath, shell: true})
    install.on("exit", () => {
      resolve("success")
    })
    install.on("error", (err) => {
      console.log(err)
      resolve("success")
    })
  })
}
const createTemplate = async () => {
  await downloadTemplate(process.argv[4], process.argv[2], JSON.parse(process.argv[5]), JSON.parse(process.argv[3]))
  if(!Array.isArray(JSON.parse(process.argv[3]))){
    renameOrDelete(process.argv[2], JSON.parse(process.argv[3]))
  }
  await npmInstall()
}
createTemplate()

