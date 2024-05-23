"use client";
import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: "600" });
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const router = useRouter();
  return (
    <div className="flex justify-between items-center 2xl:px-[5%]   max-2xl:px-[100px] py-[5px] max-lg:px-[50px] max-md:px-[20px] ">
      <button className="bg-[#DF8B24] hover:bg-[#DF8B24]/90 text-[#f9eba7] font-[600px] invisible max-sm:hidden text-[14px] py-[10px] px-[20px] rounded-[50px]">
        Connect
      </button>
      <Image
        onClick={() => router.push("/")}
        height={145}
        width={145}
        className="max-sm:w-[68px] cursor-pointer max-sm:h-[68px] max-lg:w-[100px] max-lg:h-[100px]"
        src={"/logo.png"}
        alt="logo"
      ></Image>
      <button
        onClick={() => {
          open();
        }}
        className={
          "bg-[#DF8B24] hover:bg-[#DF8B24]/90 text-[#f9eba7] font-sans font-[600px] text-[14px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] px-[20px] rounded-[50px]"
        }
      >
        {isConnected
          ? address.slice(0, 4) + "..." + address.slice(-4)
          : "Connect"}
      </button>
      {/* <w3m-button /> */}
    </div>
  );
};

export default Navbar;
