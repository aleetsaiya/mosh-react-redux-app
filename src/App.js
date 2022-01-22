import "./App.css";
import BugsList from "./components/BugsList";
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
