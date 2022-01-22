# Mosh redux course
> 這份 repository 紀錄課程中最後一個單元

## Integration with React
1. 可以直接把之前寫好的 redux 資料夾 `store` 擺進來
2. install redux 程式中使用到的 dependencies
```bash
npm install redux @redux.js/toolkit axios moment
```
3. install react-redux
```bash
npm install react-redux
```

4. 在上層 component `configureStore`，以及使用 `react-redux` 建立 `Provider`
```js
import "./App.css";
import BugsList from "./components/BugsList";
// import createStore
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

function App() {
  return (
    // every components below this component will be able to access our store
    <Provider store={store}>
      <BugsList />
    </Provider>
  );
}

export default App;

```

5. 被包住在 `Provider` 裡面的 `component`，使用 `useDispatch`, `useSelector` 進行操作。

`useDispatch()`: 回傳一個 dispatch function。
```js
const dispatch = useDispatch();
```
`useSelector(func)`: 需要輸入一個 function 當作 argument。這個 function 可以選擇 `state` 中的特定資料進行回傳

> 當 store 中的 state 有變更時，會使 react rerender，沒變更的話不會

```js
const bugs = useSelector((state) => state.entities.bugs.list);
```
完整程式碼: ( BugsList Component )
```js
// in BugsList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs } from "../store/bugs";

const BugsList = () => {
  // 獲得 dispatch function
  const dispatch = useDispatch();

  // 選擇 state 中特定的資料
  const bugs = useSelector((state) => state.entities.bugs.list);

  useEffect(() => {
    // 從 remote server loads bugs (只需要第一次)
    dispatch(loadBugs());
  }, []);

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>{bug.description}</li>
      ))}
    </ul>
  );
};

export default BugsList;

```

Exercise:
在 React 上，顯示 Unresolved Bugs
```js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, resolveBug, getUnresolvedBugs } from "../store/bugs";

const BugsList = () => {
  const dispatch = useDispatch();

  const bugs = useSelector(getUnresolvedBugs); // bugs 會獲得 unresolved bugs

  useEffect(() => {
    dispatch(loadBugs());
  }, []);

  const handleResolved = (bugId) => {
    dispatch(resolveBug(bugId));
  };

  return (
    <ul>
      {bugs.map((bug) => (
        <li key={bug.id}>
          <span>{bug.description}</span>
          <button onClick={() => handleResolved(bug.id)}>Resolved</button>
        </li>
      ))}
    </ul>
  );
};

export default BugsList;

```
