import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from "./providers/WagmiProvider";
import { XmtpProvider } from "./providers/XmtpProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DeFi Messenger",
  description: "Decentralized encrypted messaging app with Ethereum accounts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider>
          <XmtpProvider>{children}</XmtpProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
