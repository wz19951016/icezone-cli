#!/usr/bin/env node 
// console.log("hello world!")
const { program } = require("commander")
const path = require('path');
const inquirer = require("inquirer")
const Handlebars = require('handlebars');
const fs = require('fs');
const download = require('download-git-repo');
const ora = require('ora');
const chalk = require("chalk");

let baseSources = ["src/main.js", "src/Router.js", "webpack.config.js"]
let childSources = ["webpack.config.js", "package.json", "index.html", "src/App.tsx", "src/store.js", "src/actions/index.ts", "src/reducers/index.ts", "src/singleSpaEntry.js"]
let tsOrJsExchange = ["src/App.tsx", "src/actions/index.ts", "src/reducers/index.ts", "src/connect.tsx", "src/provider.tsx"]
let tsConfigFiles = ["global.d.ts", "tsconfig.json"]
let eslintConfigFiles = [".eslintrc.js"]
let reg = /.ts/

const replaceTemplate = (fsPath, valueArray) => {
  if(fs.existsSync(fsPath)){
    let templateData = Array.isArray(valueArray) ? {apps: valueArray} : valueArray
    const content = fs.readFileSync(fsPath).toString()
    const template = Handlebars.compile(content)
    const result = template(templateData)
    fs.writeFileSync(fsPath, result)
  }
}
const downloadTemplate = (downloadUrl, name, sources, spinner, valueArray) => {
  return new Promise((resolve, reject) => {
    const targetPath = path.resolve(__dirname, name);
    download(`direct:${downloadUrl}`, targetPath, {clone: true}, err => {
      if(!err){
        spinner.succeed()
        let currentSources = sources.map(item => {
          return path.join(targetPath, item)
        })
        currentSources.forEach(item => {
          replaceTemplate(item, valueArray)
        })
        console.log(chalk.green(`项目${name}初始化成功~`))
        resolve("success")
      }else{
        reject(err)
      }
    })
  })
  
}
const renameOrDelete = async (documentName, valueArray) => {
  const targetPath = path.resolve(__dirname, documentName);
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

program
  .version("1.0.0")
  .command("init <name> [branch]")
  .description("初始化项目文件")
  .action(async (name, branch) => {
    const paramater = await inquirer.prompt([
      {
        name: "description",
        message: "请输入描述",
        default: "desc"
      },
      {
        name: "author",
        message: "请输入作者",
        default: "author"
      }
    ])
    const appsNum = await inquirer.prompt([
      {
        name: "num",
        message: "您想创建几个single-spa子应用？",
        default: 2
      }
    ])
    let askArray = new Array(appsNum.num - 0).fill(null)
    askArray = askArray.map((item, index) => {
      return {
        name: `app${index + 1}`,
        message: `您的第${index + 1}个single-spa子应用的名字为：`,
        default: `app${index + 1}`,
      }
    })
    let valueArray = [], appkeyArr = []
    for(let index in askArray){
      let appObj = {}
      const result = await inquirer.prompt(askArray[index])
      let appKey = Object.keys(result)[0]
      appObj.name = result[appKey]
      const result2 = await inquirer.prompt({
        name: appKey,
        message: `${result[appKey]}是否需要自己的应用状态仓库（会导出并在基座应用中与其他子应用的状态仓库合并为一个共享仓库）？`,
        type: "confirm",
        default: true
      })
      const result3 = await inquirer.prompt({
        name: appKey,
        message: `${result[appKey]}是否使用typescript？`,
        type: "confirm",
        default: true
      })      
      const result4 = await inquirer.prompt({
        name: appKey,
        message: `${result[appKey]}是否使用eslint检查代码格式？`,
        type: "confirm",
        default: true
      })
      appObj.hasStore = result2[appKey]
      appObj.useTs = result3[appKey]
      appObj.useEslint = result4[appKey]
      appObj.index = Number(index) + 1
      appkeyArr.push(appKey)
      valueArray.push(appObj)
    }
    for(let index in valueArray){
      const spinner = ora(`${appkeyArr[index]}子应用模板下载中~请稍候`);
      spinner.start();
      await downloadTemplate("https://github.com/wz19951016/iceZoneChild.git#master", appkeyArr[index], childSources, spinner, valueArray[index])
      renameOrDelete(appkeyArr[index], valueArray[index])
    }
    const spinner = ora("基座应用模板下载中~请稍候");
    spinner.start();
    await downloadTemplate("https://github.com/wz19951016/icezoneBase.git#master" ,name, baseSources, spinner, valueArray)
  })
program.parse(process.argv)