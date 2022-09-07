# Upgraded Box

<img src="./readme-images/open-zeppelin.png" alt="open-zeppelin" />

## Descripción:

Este mini-proyecto está basado en siguiente artículo: https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916.

El propósito consiste en aprender como hacer upgrades de contratos de Solidity con la ayuda de la librería @openzeppelin/hardhat-upgrades.

El proceso de construcción de este proyecto está dividido en 7 tareas divididas a su vez en varias subtareas.

## Funcionamiento de un smart contract actualizable:

Para ilustrar como se estructuran esta clase de contratos vamos a echar mano de una imágen del artículo que hemos mencionado en la descripción.

<img src="./readme-images/upgradeable-structure.jpeg" alt="upgradeable-structure" />

Un smart contract actualizable consta de tres contratos a su vez:

- Contrato proxy (proxy contract): Es al que apuntará cualquier cliente que quiere interactuar con el contrato. Su address siempre es la misma en las sucesivas actualizaciones. Es también el responsable de conservar la información en memoria.

- Contrato proxy de administración (proxy admin contract): La address de este contrato, al igual que la del anterior, tampoco variará entre las sucesivas actualizaciones. Su función en este ejercicio será la de proporcionarnos una interfaz con la que poder actuar para hacer ciertas actulizaciones en el contrato proxy por medio de Etherscan. Podríamos decir que este contrato proxy admin actúa como el owner del proxy.

- Contrato de implementación (implementation contract): Este contrato es el que contiene la lógica. Viene a ser el smart contract que el desarrollador programa. Cada implementación o actualización tiene su propia address es decir, así como los contratos anteriores se mantienen este va cambiando en cada implementación.

Cuando desplegamos por primera vez un smart contract actualizable lo que en realidad desplegamos son estos tres contratos que acabamos de mencinar. Es en esta labor en la que los pluggins de OpenZeppelin Upgrades para Hardhat (también están disponibles para Truffle) nos resultarán de gran ayuda.

Como se veía en el esquema anterior, el contrato de admin y el proxy están vinculados siendo el proxy, a su vez, la puerta de entrada al contrato de implementación.

## Tarea 1: Generar el entorno de desarrollo de Hardhat (si ya tienes experiencia trabajando con Hardhat puedes saltar esta primera tarea).

### Tarea 1.1: Crear el esqueleto de Hardhat.

Nota: si estamos trabajando con la versión 18 de NodeJS y nos aparece el error < Error HH604: Error running JSON-RPC server: error:0308010C:digital envelope routines::unsupported > debemos ejecutar en la terminal el comando: export NODE_OPTIONS=--openssl-legacy-provider.

- Lo primero que haremos será crear un directorio (donde mejor nos venga) y acceder a su interior mediante la terminal de comandos.

- Una vez dentro del directorio inicializaremos un proyecto con el comando < npm init >.

- Una vez se nos haya creado el package.json estaremos en disposición de instalar Hardhat ejecutando < npm i hardhat >.

- Lo siguiente será generar el entorno de desarrollo de Hardhat mediante el comando < npx hardhat node >. Se nos irán ofreciendo varias opciones. es importante para seguir este tutorial de una manera sencilla que, cuando se nos pregunte entre Javascript y Typescript, elegir Typescript.

### Tarea 1.2: Arrancar un nodo de Hardhat.

Si volvemos a ejecutar el comando < npx hardhat node > se nos arrancará un nodo de Hardhat y, en la terminal, se nos mostrarán una serie de pares de claves que se nos proporcionarán por defecto.

<img src="./readme-images/hardhat-node.png" alt="hardhat-node" />

### Tarea 1.3: Cambiar el contrato que viene por defecto por otro más simple.

En el esqueleto que nos ha creado Hardhat aparece un contrato Lock.sol creado por defecto. Vamos a cambiar este contrato para que simplificarlo y que se parezca lo máximo posible al que vamos a utilizar posteriormente para el ejercicio.

Vamos a cambiar el nombre del contrato contrato por Box.sol y el código va a ser el siguiente:

```js
// contracts/Box.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Box {
    uint256 private value;

    constructor(uint256 newValue) {
        value = newValue;
    }

    function retrieve() public view returns (uint256) {
        return value;
    }
}
```

### Tarea 1.4: Compilar el contrato.

Para compilar nuestro contrato utilizaremos el comando < npx hardhat compile >.

Se nos generará una carpeta llamada artifacts que contiene a su vez un directorio llamado contracts dentro del cual se encuentra el .json del contrato.

```js
{
  "_format": "hh-sol-artifact-1",
  "contractName": "Box",
  "sourceName": "contracts/Box.sol",
  "abi": [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "newValue",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "newValue",
          "type": "uint256"
        }
      ],
      "name": "ValueChanged",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "retrieve",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5060405161016b38038061016b8339818101604052810190610032919061007a565b80600081905550506100a7565b600080fd5b6000819050919050565b61005781610044565b811461006257600080fd5b50565b6000815190506100748161004e565b92915050565b6000602082840312156100905761008f61003f565b5b600061009e84828501610065565b91505092915050565b60b6806100b56000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80632e64cec114602d575b600080fd5b60336047565b604051603e91906067565b60405180910390f35b60008054905090565b6000819050919050565b6061816050565b82525050565b6000602082019050607a6000830184605a565b9291505056fea26469706673582212203ab95319930035d477a42d36ca635ae4ffe6ec17482f4501dd3a6f85686e826e64736f6c63430008090033",
  "deployedBytecode": "0x6080604052348015600f57600080fd5b506004361060285760003560e01c80632e64cec114602d575b600080fd5b60336047565b604051603e91906067565b60405180910390f35b60008054905090565b6000819050919050565b6061816050565b82525050565b6000602082019050607a6000830184605a565b9291505056fea26469706673582212203ab95319930035d477a42d36ca635ae4ffe6ec17482f4501dd3a6f85686e826e64736f6c63430008090033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
```

### Tarea 1.4: Desplegar el contrato en nuestro nodo local.

El despliegue lo realizaremos mediante la ejecución del archivo deploy.ts que se encuentra en la carpeta scripts.

El código que debe contener es el siguiente:

```js
import { ethers } from "hardhat";

async function main() {
  const Box = await ethers.getContractFactory("Box");
  const box = await Box.deploy(5);

  await box.deployed();

  console.log(`Contract deployed to the following address ${box.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

Este script hace lo siguiente:

- Importamos una función ethers (en este caso la implementación de hardhat).

- Declaramos una función main. Dentro de main está la llamada al contrato y el despliegue del mismo pasándole el parámetro que requería el constructor (recordemos que era un uint256 para darle un valor a la propiedad value).

- Por último viene el llamado a la función main. Es aquí cuando se despliega el contrato.

Una vez configurado el archivo podemos ejecutar el despliegue con el comando < npx hardhat run scripts/deploy.ts --network localhost >

Si el proceso se ha producido correctamente veremos en la terminal en la que está arrancado en nodo la siguiente información:

<img src="./readme-images/contract-deploy.png" alt="contract-deploy" />

Al mismo tiempo, tiene que aparecer en la terminal en la que hemos ejecutado el comando de despliegue el siguiente mensaje:

<img src="./readme-images/deployment-message.png" alt="deployment-message" />

### Tarea 1.5: Comprobar en la consola de Hardhat el correcto funcionamiento del contrato.

En otra terminal ejecutaremos en comando < npx hardhat console --network localhost >

Esto nos abre la consola de Hardhat.

Lo siguiente que haremos será llamar al contrato, instanciarlo, llamar nuestro método retrieve para guardar el valor que devuelve en una constante y, por último, imprimir el valor de la constante por consola.

La secuencia completa quedaría de la siguiente forma:

```js
> const Box = await ethers.getContractFactory("Box")
undefined
> const box = await Box.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
undefined
> const value = await box.retrieve()
undefined
> value
BigNumber { value: "5" }
```
