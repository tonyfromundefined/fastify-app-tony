import "./styles/global.css";

import ReactDOM from "react-dom/client";

import App from "./App";

// biome-ignore lint/style/noNonNullAssertion:
const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
