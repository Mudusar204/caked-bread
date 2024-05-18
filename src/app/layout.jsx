import "./globals.css";
// import type { Metadata } from "next";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "../config/wagmiConfig";
import ContextAPI from "../config/ContextApiFile";
import Web3ModalProvider from "../config/web3ModalProvider";

import { Inter, Exo } from "next/font/google";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/navbar";
const inter = Inter({ subsets: ["latin"] });
const exo = Exo({ subsets: ["latin"], weight: "700" });
export const metadata = {
  title: "Caked Bread",
  description: "THE BNB REWARD POOL WITH THE TASTIEST DAILY REWARDS!",
};

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));
  return (
    <html lang="en">
      <body className={exo.className} style={{ background: "#f0e8ca" }}>
        <main className="home">
          <Web3ModalProvider initialState={initialState}>
            <ContextAPI>
              <Toaster />
              <Navbar />
              {children}
            </ContextAPI>
          </Web3ModalProvider>
        </main>
      </body>
    </html>
  );
}
