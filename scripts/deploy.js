const hre = require("hardhat");

async function main() {
  const CrowdHelp = await hre.ethers.getContractFactory("CrowdHelp");
  const crowdHelp = await CrowdHelp.deploy();

  await crowdHelp.deployed();
  console.log("CrowdHelp deployed to:", crowdHelp.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
