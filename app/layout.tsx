import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nexus DeX | Next Gen Crypto Exchange",
    description: "Experience lightning-fast trading with institutional-grade liquidity and real-time execution.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
