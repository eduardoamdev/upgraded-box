import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    ropsten: {
      url: "https://ropsten.infura.io/v3/e9d0dff95e834a47a72f1a111b2e98bd",
      accounts: [
        "7a652ec2674749b3b5eded5df8cb88ca8837dc6f5f07c629d99bafe15071a65f",
      ],
    },
  },
};

export default config;
