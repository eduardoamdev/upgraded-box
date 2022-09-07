# Upgraded Box

<img src="./readme-images/open-zeppelin.png" alt="open-zeppelin" style="width: 100%"/>

Este mini-proyecto está basado en siguiente artículo: https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916.
El propósito consiste en aprender como hacer upgrades de contratos de Solidity con la ayuda de la librería @openzeppelin/hardhat-upgrades.

Comandos de Hardhat:

npx hardhat node

npx hardhat run scripts/1.deploy_box.ts --network localhost

npx hardhat run scripts/2.upgradeV2.ts --network localhost

npx hardhat run scripts/3.upgradeV3.ts --network localhost

npx hardhat run scripts/4.prepareV4.ts --network localhost

npx hardhat console --network localhost
