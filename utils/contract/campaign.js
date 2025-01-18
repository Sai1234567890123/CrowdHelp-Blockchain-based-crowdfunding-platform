import web3 from "../web3";
import Campaign from "../../artifacts/contracts/CrowdHelp.sol/Campaign.json";

function isValidEthereumAddress(address) {
  return /^(0x)?[0-9a-fA-F]{40}$/.test(address);
}

export default (address) => {
  if (!address) {
    throw new Error("Address is required");
  }
  if (!isValidEthereumAddress(address)) {
    throw new Error("Invalid Ethereum address");
  }
  address = address.toLowerCase();
  return new web3.eth.Contract(Campaign.abi, address);
};
