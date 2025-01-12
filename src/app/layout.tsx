import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phi Protocol Cred Ideas",
  description:
    "Submit and explore ideas for Web3 credentials that verify on-chain achievements and actions",
  keywords: ["Web3", "Blockchain", "Credentials", "NFT", "Ethereum", "DeFi"],
  authors: [{ name: "Phi Protocol" }],
  openGraph: {
    title: "Phi Protocol Cred Ideas",
    description:
      "Submit and explore ideas for Web3 credentials that verify on-chain achievements and actions",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phi Protocol Cred Ideas",
    description:
      "Submit and explore ideas for Web3 credentials that verify on-chain achievements and actions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
