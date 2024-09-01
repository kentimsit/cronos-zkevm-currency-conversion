import { Box } from "@chakra-ui/react";
import { Navbar } from "./components/Navbar";
import { Welcome } from "./components/Welcome";

export default function Home() {
    return (
        <main>
            <Box minHeight="100vh" position="relative">
                <Navbar />
                <Welcome />
            </Box>
        </main>
    );
}
