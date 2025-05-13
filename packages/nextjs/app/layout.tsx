import { Inter } from "next/font/google";
import "../styles/globals.css";
import type { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MessageBoard DApp",
  description: "Update and view messages on the blockchain",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
      </body>
    </html>
  );
}
