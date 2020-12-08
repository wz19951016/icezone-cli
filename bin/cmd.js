#!/usr/bin/env node 
// console.log("hello world!")
const { program } = require("commander")
const path = require('path');
const inquirer = require("inquirer")
const ora = require('ora');
const fork = require('child_process').fork

let baseSources = ["src/main.js", "src/Router.js", "webpack.config.js"]
let childSources = ["webpack.config.js", "package.json", "index.html", "src/App.tsx", "src/store.js", "src/actions/index.ts", "src/reducers/index.ts", "src/singleSpaEntry.js"]
let downloadFlag = [1], installFlag = [1]

const ifOver = (flag, spinner) => {
  if(flag.length === 0){
    spinner.succeed()
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
    const targetPath = path.resolve(__dirname, "processChild.js");
    const spinner = ora("项目生成中...")
    spinner.start()
    for(let index in valueArray){
      downloadFlag.push(1)
      installFlag.push(1)
      const currentProcess = fork(targetPath, [appkeyArr[index], JSON.stringify(valueArray[index]), "https://github.com/wz19951016/iceZoneChild.git#master", JSON.stringify(childSources)])
      currentProcess.on("close", code => {
        // console.log(`子进程${index}关闭：${code}`)
        downloadFlag.shift()
        ifOver(downloadFlag, spinner)
      })
    }
    const masterProcess = fork(targetPath, [name, JSON.stringify(valueArray), "https://github.com/wz19951016/icezoneBase.git#master", JSON.stringify(baseSources)])
    masterProcess.on("close", code => {
      // console.log(`主进程关闭`)
      downloadFlag.shift()
      ifOver(downloadFlag, spinner)
    })
    // const spinner = ora("基座应用模板下载中~请稍候");
    // spinner.start();
    // await downloadTemplate("https://github.com/wz19951016/icezoneBase.git#master", name, baseSources, spinner, valueArray)
  })
program.parse(process.argv)
