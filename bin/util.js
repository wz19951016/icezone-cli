/*
 * @Author: wangzhong
 * @Date: 2021-01-22 16:40:49
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-01-26 18:31:14
 * @FilePath: /icezone-cli/bin/util.js
 */

const path = require("path")
const fs = require("fs")

/**
 * 遍历文件夹匹配特定文件，并返回文件path
 * @param {*} dirPath 文件夹path
 * @param {*} fileName 需要匹配的文件名
 */
const recursionDirToMatchFile = (dirPath, fileName) => {
  console.log(dirPath)
  let excludeDir = /^node_modules$/
  let fileReg = new RegExp(fileName)
  let list = fs.readdirSync(dirPath)
  let dir = []
  let fileList = list.filter(item => {
    let fileReg = /[^\.]{1,}\./
    let dirReg = /^\.[^\.]*/
    if(fileReg.test(item)){
      return item
    }
    (!excludeDir.test(item) && !dirReg.test(item)) && dir.push(item)
  })
  for (let item of fileList){
    if(fileReg.test(item)){
      return path.resolve(dirPath, item)
    }
  }
  for (let item of dir){
    const result = recursionDirToMatchFile(path.resolve(dirPath, item), fileName)
    if(typeof result === "string"){
      return result
    }
  }
}
/**
 * 判断文件是否有打包必要依赖，并决定是否修改文件内容
 * @param {*} path 文件路径
 */
const DetermineWhetherToModifyConfigAndToDo = (path) => {
  let content = fs.readFileSync(path).toString()
  let reg = /const [^ ]* = require\(.*\)/g
  console.log(content)
  console.log(content.match(reg))
}

exports.DetermineWhetherToModifyConfigAndToDo = DetermineWhetherToModifyConfigAndToDo
exports.recursionDirToMatchFile = recursionDirToMatchFile