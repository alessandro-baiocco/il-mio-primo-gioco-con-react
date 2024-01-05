import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { persistor} from "./redux/information";
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react"; // import da utilizzare in futuro

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
