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
        <UseWalletProvider
          config={{
            chainId: 31337,
            rpcUrl: "http://127.0.0.1:8545",
          }}
        >
          <App />
        </UseWalletProvider>
      </Web3ReactProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
