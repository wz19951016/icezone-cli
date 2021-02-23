/*
 * @Author: wangzhong
 * @Date: 2020-06-29 16:52:36
 * @LastEditors: wangzhong
 * @description: 全局状态仓库类
 * @LastEditTime: 2020-12-07 17:51:55
 * @FilePath: /icezoneTemplate/src/globalEventDistributor.js
 */

/**
* 工具类，集成了简单的发布订阅功能
*/
class ToolClass {
  constructor() {
    this.events = {};
  }
  on(type, listener) {
    if (!this.events[type]) {
      this.events[type] = [listener];
    }
  }
  emit(type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach((item) => {
        item.call(this, ...args);
      });
    }
  }
}
/**
 * 全局状态仓库类，提供整合注册store已经dispatch和getState功能
 */
export class GlobalEventDistributor extends ToolClass {
  constructor() {
    super();
    this.stores = [];
  }

  registerStore(store) {
    this.stores.push(store);
  }

  dispatch(event) {
    this.stores.forEach((s) => {
      s.dispatch(event);
      this.emit("dispatch");
    });
  }

  getState() {
    let state = {};
    this.stores.forEach((s) => {
      let currentState = s.getState();
      state = { ...state, ...currentState };
    });
    return state;
  }
  
  subscribe(subHandle) {
    this.stores.forEach(s => {
      s.subscribe(() => {
        console.log("触发监听")
        subHandle.apply(null, [this.getState()])
      })
    })
  }
}
