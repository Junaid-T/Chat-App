import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./Contexts/store";
import { Provider } from "react-redux";
import store from "./Store/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
// ReactDOM.render(
//   <React.StrictMode>
//     <StoreProvider>
//         <App />
//     </StoreProvider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
