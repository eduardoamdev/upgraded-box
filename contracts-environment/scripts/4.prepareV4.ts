// scripts/4.prepareV4.ts
import { ethers } from "hardhat";
import { upgrades } from "hardhat";

/* const proxyAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0"; */

const proxyAddress = "0xE7C274005713912aA3639B99Ab3E0435e24fA44f";

async function main() {
  console.log(proxyAddress, " original Box(proxy) address");
  const BoxV4 = await ethers.getContractFactory("BoxV4");
  console.log("Preparing upgrade to BoxV4...");
  const boxV4Address = await upgrades.prepareUpgrade(proxyAddress, BoxV4);
  console.log(boxV4Address, " BoxV4 implementation contract address");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
