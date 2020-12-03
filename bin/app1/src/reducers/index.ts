/*
 * @Author: wangzhong
 * @Date: 2020-07-10 16:17:30
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-12-03 17:21:01
 * @FilePath: /iceZoneChild/src/reducers/index.ts
 */

const initialState = {
  data: ""
};

const app1Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INITACTION":
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default app1Reducer;
