import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and meta mask is installed
  web3 = new Web3(window.ethereum);
} else {
  // we are on the server *OR* meta mask is not running
  // creating our own provider
  const provider = new Web3.providers.HttpProvider(
    "https://palm-testnet.infura.io/v3/eaf842956c36444c8aaf54163a47e0d2"
  );

  web3 = new Web3(provider);
}

export default web3;
