import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";

export const metadata: Metadata = {
    title: "Cronos zkEVM Currency Conversion",
    description: "Get latest rates for CRO, zkCRO, and other currencies",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
