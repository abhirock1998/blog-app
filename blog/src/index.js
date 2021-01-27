import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DataLayer } from "./data-layer";
import { initialState, reducer } from "./reducer";

ReactDOM.render(
<DataLayer    reducer={reducer} initialState={initialState} >
<App />
</DataLayer>


, document.getElementById("root"));
