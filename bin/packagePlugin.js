/* eslint-disable */
/*
 * @Author: wangzhong
 * @Date: 2020-08-17 17:04:12
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-01-21 18:16:00
 * @FilePath: /icezone-cli/app1/testPlugin.js
 */
const fs = require('fs');
const path = require('path');

const getFileContent = (url) => {
  console.log(url)
  const content = fs.readFileSync(url).toString()
  return content
}
const checkIsReactEntry = async (content) => {
  let reg = /ReactDOM.render/g
  return reg.test(content)
}
const getRenderComponent = () => {
  let reg1 = /ReactDOM.render\([^,]*/g
    let reg2 = /<.*/g
}

class PackagePlugin {
  entry = null;
  apply(compiler) {
    compiler.hooks.afterPlugins.tap("test", (compiler) => {
      console.log(compiler.options.entry)
      this.entry = compiler.options.entry
    });
    compiler.hooks.afterEmit.tapPromise("test", compilation => {
      return new Promise((resolve, reject) => {
        console.log("获取储存entry")
        console.log(this.entry)
        console.log(Object.prototype.toString.call(this.entry))
        if(Object.prototype.toString.call(this.entry) ===  "[object Object]"){
          let keys = Object.keys(this.entry)
          for(let item of keys){
            const content = getFileContent(this.entry[item])
            console.log(content)
            if(checkIsReactEntry(content)){
              return null
            }
          }
        }else if(Array.isArray(this.entry)){

        }else{
          const content = getFileContent(this.entry)
          console.log(content)
        }
      })
    })
  }
}
module.exports = PackagePlugin;
