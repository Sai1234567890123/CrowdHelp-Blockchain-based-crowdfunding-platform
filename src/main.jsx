import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { app, auth} from "./config/firebase-config";  // for firebase.
import ErrorBoundary from "./components/ErrorBoundary";
import { UseWalletProvider } from "use-wallet";
import { Web3ReactProvider } from "@web3-react/core";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Web3ReactProvider>
        <UseWalletProvider>
          <App />
        </UseWalletProvider>
      </Web3ReactProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
