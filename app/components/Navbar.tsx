"use client";
import React from "react";
import { Box, Text } from "@chakra-ui/react";

export function Navbar() {
    return (
        <>
            <Box backgroundColor="#0d1a2d" minHeight="100px" padding="1rem">
                <Text fontSize="2xl" color="white">
                    Cronos zkEVM Currency Conversions
                </Text>
            </Box>
        </>
    );
}
