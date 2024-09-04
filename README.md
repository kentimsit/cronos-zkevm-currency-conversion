# Cronos zkEVM Currency Conversions (Demo)

The goal of this repository is to demonstrate how to collect the prices of various cryptocurrencies used on the Cronos zkEVM network. Due to rate limits, prices may not be up to date. Please use this as a developer tutorial only.

The prices of CRO, LCRO, ETH, DAI can be obtained from Coingecko.

The prices of zkCRO, ybETH, ybUSD must be collected from the wrapping contracts on Ethereum mainnet.

The prices of vUSD, vETH are collected from an off-chain oracle.

This demo includes a front-end interface to peform currency conversions.

## Run locally

```bash
npm run dev
```

## Run in production

```bash
# Build command
npm run build
# Run command
npm run start
```

## With docker

```bash
docker build -t frontend_image .
docker rm -f frontend_container
docker run -p 3000:3000 --name frontend_container frontend_image
docker logs -f frontend_container
```
