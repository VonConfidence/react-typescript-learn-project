## 创建 react+typescript 项目

```
create-react-app my-project-name --scripts-version=react-scripts-ts
```

## package.json

```json
  // create-react-app 创建项目的时候
  "scripts": {
    "start": "react-scripts-ts start",
    "build": "react-scripts-ts build",
    "test": "react-scripts-ts test --env=jsdom",
    "eject": "react-scripts-ts eject"
  },
  // npm run eject之后
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom"
  },

  // 之后 被 react-app-rewired版本给坑了 "react-app-rewired": "1.6.2",
  // 最新版2.0的使用下面的配置会有bug
  "scripts": {
    "start": "react-app-rewired start --scripts-version react-scripts-ts",
    "build": "react-app-rewired build --scripts-version react-scripts-ts",
    "test": "react-app-rewired test --env=jsdom --scripts-version react-scripts-ts"
  },
```

## 引入 antd

1. yarn add antd
2. yarn add ts-import-plugin react-app-rewired@1.6.2 react-app-rewire-less --dev
3. 项目初始化见: https://www.jianshu.com/p/daef80dbd2ed
