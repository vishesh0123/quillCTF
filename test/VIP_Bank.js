const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("VIP_Bank", () => {
  let vip_bank, hack_vip_bank, manager, attacker;
  beforeEach(async () => {
    [manager, attacker] = await ethers.getSigners();
    const VIP_Bank = await hre.ethers.getContractFactory("VIP_Bank");
    const Hack_VIP_Bank = await hre.ethers.getContractFactory("Hack_VIP_Bank");

    vip_bank = await VIP_Bank.connect(manager).deploy();
    hack_vip_bank = await Hack_VIP_Bank.connect(attacker).deploy(
      vip_bank.address
    );
    console.log("Adding Manager as VIP and Depositing 0.05 ETH");
    await vip_bank.connect(manager).addVIP(manager.address);
    await vip_bank
      .connect(manager)
      .deposit({ value: ethers.utils.parseEther("0.05") });
  });

  it("Manager should withdraw their 0.05 ETH", async () => {
    await expect(
      vip_bank.connect(manager).withdraw(ethers.utils.parseEther("0.05"))
    ).not.to.be.reverted;
  });

  it("Manager can't withdraw after calling attack with more than 0.5 ETH", async () => {
    await hack_vip_bank
      .connect(attacker)
      .destroy({ value: ethers.utils.parseEther("1.0") });

    await expect(
      vip_bank.connect(manager).withdraw(ethers.utils.parseEther("0.05"))
    ).to.be.reverted;
  });
});
