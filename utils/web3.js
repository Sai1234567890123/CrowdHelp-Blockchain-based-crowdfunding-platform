import Web3 from "web3";

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // we are in the browser and MetaMask is installed
  web3 = new Web3(window.ethereum);
  try {
    // Request account access if needed
    await window.ethereum.enable();
  } catch (error) {
    console.error("User denied account access");
  }
} else {
  // we are on the server *OR* MetaMask is not running
  // creating our own provider
  const provider = new Web3.providers.HttpProvider(
    "https://palm-testnet.infura.io/v3/eaf842956c36444c8aaf54163a47e0d2"
  );

  web3 = new Web3(provider);
}

export default web3;
