/*
 * @Author: wangzhong
 * @Date: 2021-01-12 17:58:37
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-01-13 16:06:41
 * @FilePath: /icezone-cli/test.js
 */
// const jsObj = require("./webpack")

// jsObj = jsObj.toString()

let testData = {
  value: 1,
  entry: {
    cc: {},
    bb: [1,2,23],
    dd: "dgsgdsgds",
  },
  // entry: "fagasgasg",
  testvalue: "gs"
}
testData = JSON.stringify(testData)

const reg = /\"entry\":.*/g
console.log(testData)
console.log(testData.match(reg))
console.log(reg.test(testData))