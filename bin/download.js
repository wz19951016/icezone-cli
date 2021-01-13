/*
 * @Author: wangzhong
 * @Date: 2020-12-08 16:39:55
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-01-13 17:47:05
 * @FilePath: /icezone-cli/bin/download.js
 */
const path = require('path');
const Handlebars = require('handlebars');
const fs = require('fs');
const download = require('download-git-repo');
const chalk = require("chalk");

let tsOrJsExchange = ["src/App.tsx", "src/actions/index.ts", "src/reducers/index.ts", "src/connect.tsx", "src/provider.tsx"]
let tsConfigFiles = ["global.d.ts", "tsconfig.json"]
let eslintConfigFiles = [".eslintrc.js"]
let reg = /.ts/

const replaceTemplate = (fsPath, valueArray, name) => {
  if(fs.existsSync(fsPath)){
    let templateData = Array.isArray(valueArray) ? {apps: valueArray, name} : valueArray
    const content = fs.readFileSync(fsPath).toString()
    const template = Handlebars.compile(content)
    const result = template(templateData)
    fs.writeFileSync(fsPath, result)
  }
}
const downloadTemplate = (downloadUrl, name, sources, valueArray) => {
  return new Promise((resolve, reject) => {
    const targetPath = path.resolve(process.cwd(), name);
    download(`direct:${downloadUrl}`, targetPath, {clone: true}, err => {
      if(!err){
        let currentSources = sources.map(item => {
          return path.join(targetPath, item)
        })
        currentSources.forEach(item => {
          replaceTemplate(item, valueArray, name)
        })
        resolve("success")
      }else{
        reject(err)
      }
    })
  })
}
const renameOrDelete = async (documentName, valueArray) => {
  const targetPath = path.resolve(process.cwd(), documentName);
  if(!valueArray.useTs){
    let changeSources = tsOrJsExchange.map(item => {
      return path.join(targetPath, item)
    })
    let delSources = tsConfigFiles.map(item => {
      return path.join(targetPath, item)
    })
    for(let item of changeSources){
      fs.renameSync(item, item.replace(reg, ".js"))
    }
    for(let item of delSources){
      fs.unlinkSync(item)
    }
  }
  if(!valueArray.useEslint){
    let delSources = eslintConfigFiles.map(item => {
      return path.join(targetPath, item)
    })
    for(let item of delSources){
      fs.unlinkSync(item)
    }
  }
}
exports.downloadTemplate = downloadTemplate
exports.renameOrDelete = renameOrDelete