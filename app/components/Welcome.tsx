"use client";
import React, { useEffect } from "react";
import { Box, Text, Input, Select, Button } from "@chakra-ui/react";

export function Welcome() {
    const [croUsd, setCroUsd] = React.useState(0);
    const [ethUsd, setEthUsd] = React.useState(0);
    const [daiUsd, setDaiUsd] = React.useState(0);
    const [lcroUsd, setLcroUsd] = React.useState(0);
    const [zkCroUsd, setZkCroUsd] = React.useState(0);
    const [ybEthUsd, setYbEthUsd] = React.useState(0);
    const [ybUsdUsd, setYbUsdUsd] = React.useState(0);
    const [vEthUsd, setVEthUsd] = React.useState(0);
    const [vUSD, setVUSD] = React.useState(0);
    const [amountText, setAmountText] = React.useState("");
    const [amount, setAmount] = React.useState(0);
    const [currency, setCurrency] = React.useState("");
    const [amountUsd, setAmountUsd] = React.useState(0);
    const [amountCro, setAmountCro] = React.useState(0);
    const [amountEth, setAmountEth] = React.useState(0);
    const [amountDai, setAmountDai] = React.useState(0);
    const [amountLcro, setAmountLcro] = React.useState(0);
    const [amountZkCro, setAmountZkCro] = React.useState(0);
    const [amountYbEth, setAmountYbEth] = React.useState(0);
    const [amountYbUsd, setAmountYbUsd] = React.useState(0);
    const [amountVEth, setAmountVEth] = React.useState(0);
    const [amountVUSD, setAmountVUSD] = React.useState(0);
    const [conversionReady, setConversionReady] = React.useState(false);

    useEffect(() => {
        const getRates = async () => {
            const response = await fetch("/api/rates");
            const result = await response.json();
            setCroUsd(result.payload.croUsd);
            setEthUsd(result.payload.ethUsd);
            setDaiUsd(result.payload.daiUsd);
            setLcroUsd(result.payload.lcroUsd);
            setZkCroUsd(result.payload.zkCroUsd);
            setYbEthUsd(result.payload.ybEthUsd);
            setYbUsdUsd(result.payload.ybUsdUsd);
            setVEthUsd(result.payload.vEthUsd);
            setVUSD(result.payload.vUsdUsd);
        };
        setConversionReady(false);
        getRates();
    }, []);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmountText(e.target.value);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
    };

    const handleSubmit = () => {
        setConversionReady(false);
        console.log("Amount:", amount);
        console.log("Currency:", currency);
        // Add your submission logic here
        // Test to see if the amount text can be converted to a floating point number
        try {
            let amount = parseFloat(amountText);
            console.log("Amount Float:", amount);
            if (currency === "") {
                console.log("No currency selected");
                return;
            }
            // Convert to USD
            let amountUsd = 0;
            if (currency === "USD") {
                amountUsd = amount;
            }
            if (currency === "CRO") {
                amountUsd = amount * croUsd;
            }
            if (currency === "ETH") {
                amountUsd = amount * ethUsd;
            }
            if (currency === "DAI") {
                amountUsd = amount * daiUsd;
            }
            if (currency === "LCRO") {
                amountUsd = amount * lcroUsd;
            }
            if (currency === "ZK_CRO") {
                amountUsd = amount * zkCroUsd;
            }
            if (currency === "V_ETH") {
                amountUsd = amount * vEthUsd;
            }
            if (currency === "V_USD") {
                amountUsd = amount * vUSD;
            }
            if (currency === "YB_ETH") {
                amountUsd = amount * ybEthUsd;
            }
            if (currency === "YB_USD") {
                amountUsd = amount * ybUsdUsd;
            }
            console.log("Converted Amount in USD:", amountUsd);
            setAmountUsd(amountUsd);
            setAmountCro(amountUsd / croUsd);
            setAmountEth(amountUsd / ethUsd);
            setAmountDai(amountUsd / daiUsd);
            setAmountLcro(amountUsd / lcroUsd);
            setAmountZkCro(amountUsd / zkCroUsd);
            setAmountYbEth(amountUsd / ybEthUsd);
            setAmountYbUsd(amountUsd / ybUsdUsd);
            setAmountVEth(amountUsd / vEthUsd);
            setAmountVUSD(amountUsd / vUSD);
            setConversionReady(true);
        } catch (error) {
            console.log("Error converting amount to float:", error);
        }
    };

    const renderCroValue = () => {
        if (!croUsd) {
            return null;
        }
        return (
            <Box fontSize="lg" color="white">
                <Text fontSize="lg" color="white">
                    1 CRO = {croUsd} USD
                </Text>
            </Box>
        );
    };

    const renderConversion = () => {
        if (!conversionReady) {
            return null;
        }
        return (
            <Box>
                <Text fontSize="lg" color="white">
                    Amount in USD: {amountUsd}
                </Text>
                <Text fontSize="lg" color="white">
                    In CRO: {amountCro}
                </Text>
                <Text fontSize="lg" color="white">
                    In ETH: {amountEth}
                </Text>
                <Text fontSize="lg" color="white">
                    In DAI: {amountDai}
                </Text>
                <Text fontSize="lg" color="white">
                    In LCRO: {amountLcro}
                </Text>
                <Text fontSize="lg" color="white">
                    In zkCRO: {amountZkCro}
                </Text>
                <Text fontSize="lg" color="white">
                    In vETH: {amountVEth}
                </Text>
                <Text fontSize="lg" color="white">
                    In ybETH: {amountYbEth}
                </Text>
                <Text fontSize="lg" color="white">
                    In vUSD: {amountVUSD}
                </Text>
                <Text fontSize="lg" color="white">
                    In ybUSD: {amountYbUsd}
                </Text>
            </Box>
        );
    };

    return (
        <>
            <Box
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                minHeight="1500px"
                width="100%"
                backgroundColor="#09090b"
                position="relative"
                display="flex"
                flexDirection="column"
                padding="1rem"
            >
                <Text fontSize="lg" color="white">
                    Welcome to the Crypto Converter!
                </Text>
                {renderCroValue()}
                <Text fontSize="lg" color="white" marginY="15px">
                    {" "}
                    Type the amount and currency that you wish to convert:
                </Text>
                <Input
                    placeholder="Amount"
                    marginY="15px"
                    color="white"
                    value={amountText}
                    onChange={handleAmountChange}
                    maxWidth="500px"
                />
                <Select
                    placeholder="Select option"
                    color="white"
                    value={currency}
                    onChange={handleCurrencyChange}
                    maxWidth="500px"
                >
                    <option value="USD">USD</option>
                    <option value="CRO">CRO</option>
                    <option value="ZK_CRO">zkCRO</option>
                    <option value="LCRO">LCRO</option>
                    <option value="ETH">ETH</option>
                    <option value="V_ETH">vETH</option>
                    <option value="YB_ETH">ybETH</option>
                    <option value="DAI">DAI</option>
                    <option value="V_USD">vUSD</option>
                    <option value="YB_USD">ybUSD</option>
                </Select>
                <Button onClick={handleSubmit} marginY="15px" maxWidth="500px">
                    Convert
                </Button>
                {renderConversion()}
            </Box>
        </>
    );
}
