const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  let target = "0xf8E9327E38Ceb39B1Ec3D26F5Fad09E426888E66"; //Goerli Test Net

  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);

  const slot4 = await provider.getStorageAt(target, 4);
  const slot9 = await provider.getStorageAt(target, 9);

  const Confidential = await ethers.getContractFactory("Confidential");
  const confidential = new ethers.Contract(
    target,
    Confidential.interface,
    provider
  );

  const hash = await confidential.hash(slot4, slot9);
  const verifyhash = await confidential.checkthehash(hash);

  if (verifyhash === true) {
    console.log("Hash Found and Verified");
    console.log(hash);
  } else {
    console.error("Error");
  }
}
main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
