import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Web3AuthProvider, Web3AuthInnerContext } from "@web3auth/modal-react-hooks";
import { web3AuthContextConfig } from "./web3AuthProviderProps";
import { WalletServicesProvider } from "@web3auth/wallet-services-plugin-react-hooks";
import dotenv from 'dotenv';

dotenv.config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Web3AuthProvider config={web3AuthContextConfig}>
      <WalletServicesProvider context={Web3AuthInnerContext}>
        <App />
      </WalletServicesProvider>
    </Web3AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
