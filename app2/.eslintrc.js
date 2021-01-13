/*
 * @Author: wangzhong
 * @Date: 2020-07-07 20:41:11
 * @LastEditors: wangzhong
 * @LastEditTime: 2020-07-14 16:55:51
 * @FilePath: /ice-login/.eslintrc.js
 */

module.exports = {
  root: true,
  parser: "babel-eslint",
  env: {
    browser: true,
    es6: true,
  },
  extends: ["airbnb", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      webpack: {
        config: "./webpack.config.js",
      },
    },
  },
  plugins: ["react", "react-hooks", "promise", "import"],
  rules: {
    "no-useless-constructor": 0,
    "react/jsx-filename-extension": [1, { extensions: [".js", ".ts", ".tsx"] }], // 允许js文件使用jsx语法
    "react/prop-types": 1, // 开启PropTypes验证
    "react/forbid-prop-types": 0,
    "react/prefer-stateless-function": 1, // 建议使用函数式组件
    "linebreak-style": 0,
    "react/jsx-one-expression-per-line": 0,
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
    "import/prefer-default-export": 0,
    "prettier/prettier": "error",
    "import/extensions": [2, "never", { "web.js": "never", json: "never" }],
    "import/no-extraneous-dependencies": 0,
    "import/no-unresolved": "error",
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "prefer-const": 0,
    "react/jsx-fragments": 0,
    "react/no-array-index-key": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-this-in-sfc": 0,
    "no-underscore-dangle": 0,
    "no-unresolved": 0,
    // "react-hooks/exhaustive-deps": 0,
  },
};
