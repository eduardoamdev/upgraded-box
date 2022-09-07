import React from "react";
import { ethers } from "ethers";
import contractAbi from "../resources/contractAbi.json";

/* const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; */

const contractAddress = "0xE7C274005713912aA3639B99Ab3E0435e24fA44f";

const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

const signer = provider.getSigner();

export const contract = new ethers.Contract(
  contractAddress,
  contractAbi,
  signer
);

export const ContractContext = React.createContext();
