# Projet 3 Alyra : Voting front

## Rendu

- Déploiement de la dApp sur Vercel : https://projet3-alyra.vercel.app/
- Lien vers la vidéo de démo

## Environnement

<u>_BackEnd :_</u>

- Déploiement avec Truffle
- Script web3

<u>_Front End :_</u>

- React + Redux + web3

<u>_Remarque : L'utilisation de Redux n'était pas indispensable pour l'exercice, mais je me suis servis du cas cette dApp pour me former à React (+redux). (je n'avais jamais travaillé avec React auparavant).  
L'utilisation de Redux m'a finalement été très utile car elle m'a permis de bien comprendre les différentes interractions avec la BLockchain étant donné que je pouvais visualiser tout ce que je remontais de la BC dans le store Redux en temps réel_</u>

## Principe de fonctionnement

Sur le principe, ma dApp fonctionne de la façon suivante :

- J'interragis avec le smart contract en appelant des fonctions (changeStatus, addProposal, vote, ...) dans des conponents (ProposalInput, VoterInput, ...).
- J'écoute les events de la blockchain et je stock les retours de ces events dans mon store Redux dans ContractProvider.jsx
- Je lis mon store Redux en permanance pour mettre a jours les components de mon app dans les différents components.

<u>_Remarque : Je n'ai pas réussis à stocker la notion de contrat dans le store Redux (c'est un objet qui semble trop compliqué pour Redux). J'ai donc utilisé un Context pour cet objet contract._</u>

## Résultat du déploiement du contrat sur goerli :\*\*

```
thibaut@Air-de-Thibaut projet3 % truffle migrate --network goerli
bigint: Failed to load bindings, pure JS will be used (try npm run rebuild?)

# Compiling your contracts...

> Everything is up to date, there is nothing to compile.

# Migrations dry-run (simulation)

> Network name: 'goerli-fork'
> Network id: 5
> Block gas limit: 30000000 (0x1c9c380)

# 01_script.js

Deploying 'Voting'

---

> block number: 9237941
> block timestamp: 1687693971
> account: 0xEC9dA52CCFb524264aec9EbA85c12cFd601f3854
> balance: 0.475897763337938179
> gas used: 2068715 (0x1f90eb)
> gas price: 2.778371289 gwei
> value sent: 0 ETH
> total cost: 0.005747658361123635 ETH

---

> Total cost: 0.005747658361123635 ETH

# Summary

> Total deployments: 1
> Final cost: 0.005747658361123635 ETH

# Starting migrations...

> Network name: 'goerli'
> Network id: 5
> Block gas limit: 30000000 (0x1c9c380)

# 01_script.js

Deploying 'Voting'

---

> transaction hash: 0xe1d0b9c4741f2142f3aec5c15e5c3c7180aff351e24a1e392975399b37ee9bc6
> Blocks: 1 Seconds: 16
> contract address: 0xA3e859f3A10e585d170739c631ed9B3b89d9674C
> block number: 9237947
> block timestamp: 1687693992
> account: 0xEC9dA52CCFb524264aec9EbA85c12cFd601f3854
> balance: 0.475772392737997659
> gas used: 2068715 (0x1f90eb)
> gas price: 2.838974417 gwei
> value sent: 0 ETH
> total cost: 0.005873028961064155 ETH

> Saving artifacts

---

> Total cost: 0.005873028961064155 ETH

# Summary

> Total deployments: 1
> Final cost: 0.005873028961064155 ETH
```

## Pour démarrer

```bash
npm i
npm start
```
