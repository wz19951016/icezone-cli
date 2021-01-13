/*
 * @Author: wangzhong
 * @Date: 2020-06-29 17:14:00
 * @LastEditors: wangzhong
 * @description: 模块加载器
 * @LastEditTime: 2020-11-26 18:36:11
 * @FilePath: /ice/src/Loader.js
 */

import * as singleSpa from "single-spa";
import createHistory from "history/createBrowserHistory";
export const history = createHistory();

/**
 * 判断路由是否匹配
 * @param {string} path 待匹配路径
 */
export const pathMatch = (path) => {
  return (location) => {
    return location.pathname.startsWith(`${path}`);
  };
};

/**
 * 通过应用打包生成的json文件获取对应入口文件
 * @param {string} url 
 * @param {string} baseUrl 
 * @param {string} entryName 
 */
export const getEntryfromJson = async (url, baseUrl, entryName) => {
  const fetchResult = await fetch(url).then((s) => s.json());
  console.log(fetchResult);
  console.log(baseUrl);
  const { entrypoints, publicPath } = fetchResult;
  // let index = entrypoints[entryName].chunks.indexOf(0)
  console.log(`${publicPath}${entrypoints[entryName].assets[0]}`);
  let truePath = `${publicPath}${entrypoints[entryName].assets[0]}`
  const getResult = await SystemJS.import(truePath);
  return getResult;
};

/**
 * 子应用加载器
 * @param {string} name 
 * @param {string} pathName 
 * @param {string} appUrl 
 * @param {string} baseUrl 
 * @param {boolean} hasStore 
 * @param {GlobalEventDistributor} globalEventDistributor 
 */
export const loadApp = async (
  name,
  pathName,
  appUrl,
  baseUrl,
  hasStore,
  globalEventDistributor
) => {
  let store = {},
    props = { globalEventDistributor };

  try {
    store = hasStore
      ? await getEntryfromJson(appUrl, baseUrl, "store")
      : { storeInstance: null };
  } catch (err) {
    console.log(`加载${name}数据仓库失败：${err}`);
  }
  if (store.storeInstance && globalEventDistributor) {
    props.store = store.storeInstance;
    globalEventDistributor.registerStore(store.storeInstance);
  }
  SystemJS.config({ transpiler: "transpiler-module" });
  props.history = history;
  props.data = globalEventDistributor && globalEventDistributor.getState();
  singleSpa.registerApplication(
    name,
    () => getEntryfromJson(appUrl, baseUrl, "singleSpaEntry"),
    pathMatch(pathName),
    props
  );
};
