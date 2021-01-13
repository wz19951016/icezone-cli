/*
 * @Author: wangzhong
 * @Date: 2021-01-13 17:50:54
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-01-13 18:33:02
 * @FilePath: /icezone-cli/bin/start.js
 */
const concurrently = require('concurrently');
const fs = require('fs');
const path = require('path');

const test = async () => {
  const targetJson = path.resolve(process.cwd(), "package.json")
  const content = JSON.parse(fs.readFileSync(targetJson).toString())
  let commandArray = []
  commandArray.push("npm run start")
  content.singleChildren.forEach(item => {
    commandArray.push(`cd ../${item} && npm run start`)
  })
  console.log(content)
  console.log(content.singleChildren)
  console.log(commandArray)
  concurrently(commandArray).then(s=> {
    console.log(s)
    console.log("success")
  }, err => {
    console.log(err)
    console.log("fail")
  })
}
test()

