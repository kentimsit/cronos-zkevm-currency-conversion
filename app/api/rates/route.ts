import { NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET() {
    // Get the rates from Coingecko
    const params = new URLSearchParams({
        ids: "crypto-com-chain,ethereum,dai,liquid-cro",
        vs_currencies: "usd",
    }).toString();
    const coingeckoApiResponse = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?" + params,
        {
            method: "GET",
            headers: { accept: "application/json" },
        }
    );
    const coingeckoApiResult = await coingeckoApiResponse.json();
    console.log("Coingecko API Result:", coingeckoApiResult);
    const croUsd = coingeckoApiResult["crypto-com-chain"].usd;
    const ethUsd = coingeckoApiResult["ethereum"].usd;
    const daiUsd = coingeckoApiResult["dai"].usd;
    const lcroUsd = coingeckoApiResult["liquid-cro"].usd;

    // These are just some hardcoded values for testing
    // const croUsd = 0.08;
    // const ethUsd = 2500;
    // const daiUsd = 1;
    // const lcroUsd = 0.09;

    // Call smart contracts on Ethereum
    const w3provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_URL);

    // Get zkCRO : CRO rate. Note that CRO has 8 decimals on Ethereum
    let contractAddress = "0x28Ff2E4dD1B58efEB0fC138602A28D5aE81e44e2";
    let abi = [
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_shareAmount",
                    type: "uint256",
                },
            ],
            name: "convertToAsset",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
    ];
    let methodSignature = "convertToAsset(uint256)";
    let contractParams = ["1000000000000000000"];
    let resultDecimals = 8;
    let contract = new ethers.Contract(contractAddress, abi, w3provider);
    let method = contract.getFunction(methodSignature);
    let chainCallRes = await method(...contractParams);
    let chainCallResString = ethers.formatUnits(chainCallRes, resultDecimals);
    let zkCroCro = parseFloat(chainCallResString);
    let zkCroUsd = zkCroCro * croUsd;

    // Get ybETH
    contractAddress = "0x76bf2D1e6dFda645c0c17440B17Eccc181dfC351";
    abi = [
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "shareAmount",
                    type: "uint256",
                },
            ],
            name: "convertToAsset",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
    ];
    contractParams = ["1000000000000000000"];
    resultDecimals = 18;
    contract = new ethers.Contract(contractAddress, abi, w3provider);
    method = contract.getFunction(methodSignature);
    chainCallRes = await method(...contractParams);
    chainCallResString = ethers.formatUnits(chainCallRes, resultDecimals);
    let ybEthEth = parseFloat(chainCallResString);
    let ybEthUsd = ybEthEth * ethUsd;

    // Get ybUSD
    contractAddress = "0xFA59075DfCE274E028b58BdDFcC3D709960F594a";
    abi = [
        {
            inputs: [
                {
                    internalType: "uint256",
                    name: "_sDaiAmount",
                    type: "uint256",
                },
            ],
            name: "convertToAssets",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
            stateMutability: "view",
            type: "function",
        },
    ];
    methodSignature = "convertToAssets(uint256)"; // Careful, this is plural
    contractParams = ["1000000000000000000"];
    resultDecimals = 18;
    contract = new ethers.Contract(contractAddress, abi, w3provider);
    method = contract.getFunction(methodSignature);
    chainCallRes = await method(...contractParams);
    chainCallResString = ethers.formatUnits(chainCallRes, resultDecimals);
    let ybUsdDai = parseFloat(chainCallResString);
    let ybUsdUsd = ybUsdDai * daiUsd;

    // Get vETH and vUSD from experimental Oracle
    let oracleResponse = await fetch(
        "https://oracle-zkevm.cronos.org/api/v1/query/vUSD-USD"
    );
    let oracleResult = await oracleResponse.json();
    const vUsdUsd = oracleResult.result.aggregatedPrice;
    const vUsdDai = vUsdUsd / daiUsd;
    oracleResponse = await fetch(
        "https://oracle-zkevm.cronos.org/api/v1/query/vETH-USD"
    );
    oracleResult = await oracleResponse.json();
    const vEthUsd = oracleResult.result.aggregatedPrice;
    const vEthEth = vEthUsd / ethUsd;
    // Send back response
    return NextResponse.json({
        success: true,
        payload: {
            croUsd,
            ethUsd,
            daiUsd,
            lcroUsd,
            zkCroCro,
            zkCroUsd,
            ybEthEth,
            ybEthUsd,
            ybUsdDai,
            ybUsdUsd,
            vEthEth,
            vEthUsd,
            vUsdDai,
            vUsdUsd,
        },
    });
}
