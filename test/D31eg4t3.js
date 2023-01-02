const { expect } = require('chai');
const { ethers } = require('hardhat');
const hre = require('hardhat');

describe('D31eg4t3', () => {
  let D31eg4t3, HackDelegate, d31eg4t3, hackdelegate, deployer, attacker;
  before(async () => {
    [deployer, attacker] = await ethers.getSigners();
    D31eg4t3 = await ethers.getContractFactory('D31eg4t3');
    HackDelegate = await ethers.getContractFactory('HackDelegate');
    // console.log('Deploying Contracts..');

    d31eg4t3 = await D31eg4t3.connect(deployer).deploy();
    hackdelegate = await HackDelegate.connect(attacker).deploy();
    // console.log(`D31eg4t Deployed at ${d31eg4t3.address}`);
    // console.log(`HackDelegate Deployed at ${hackdelegate.address}`);

    // console.log('attacking by calling dcall function');
    // await hackdelegate.connect(attacker).dcall(d31eg4t3.address);
  });

  it('address of the owner in D31eg4t3 should be deployers address', async () => {
    await expect(await d31eg4t3.owner()).to.be.equal(deployer.address);
  });

  it('canYouHackMe value in mapping for attacker should be false', async () => {
    await expect(await d31eg4t3.canYouHackMe(attacker.address)).equals(false);
  });

  it('after calling dcall in attack contract owner should be changed to attack contract', async () => {
    await hackdelegate.connect(attacker).dcall(d31eg4t3.address);
    await expect(await d31eg4t3.owner()).to.be.equal(hackdelegate.address);
  });

  it('canYouHackMe after dcall for attacker contract should be true', async () => {
    await expect(await d31eg4t3.canYouHackMe(hackdelegate.address)).to.be.equal(
      true,
    );
  });
});
