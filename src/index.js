import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
import { statistic, persistor } from "./redux/statistic";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // import da utilizzare in futuro

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={statistic}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
