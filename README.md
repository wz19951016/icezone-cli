<!--
 * @Author: wangzhong
 * @Date: 2020-12-08 14:22:08
 * @LastEditors: wangzhong
 * @LastEditTime: 2021-02-23 17:16:36
 * @FilePath: /icezone-cli/README.md
-->
## 简介
本脚手架是一个实验性的项目，用于快速生成一个具备基础配置的完整的single-spa项目，开箱即用，可直接进行业务开发。
## 安装
```
npm install -g icezone-cli
```
## 指令
### icezone-cli init `<name>`

初始化single-spa项目，根据提示对基座应用和子应用进行简单配置

### icezone-cli start
在基座应用中使用此命令，可以一键启动基座应用及其所属的全部子应用

### icezone-cli initBase `<name>`
生成一个空白的基座应用项目

### icezone-cli initChild `name`
生成一个空白的子应用
