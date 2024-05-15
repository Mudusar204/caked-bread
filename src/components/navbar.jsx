"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Inter, Exo } from "next/font/google";
const inter = Inter({ subsets: ["latin"], weight: "600" });
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { address, isConnected } = useAccount();
  const { open, close } = useWeb3Modal();
  const [isSignUp, setIsSignUp] = useState(false);
  const signup = async () => {
    try {
      if (isConnected && isSignUp) {
        toast.loading("Signing up...");
        let res = await axios.post(`/api/auth/signup`, {
          walletAddress: address,
        });
        console.log(res, "response");
        if (res.data.status === true) {
          toast.dismiss();
          toast.success(res.data.message);
          console.log(res, "response");
        } else {
          throw new Error(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error);
      console.error("Signup failed:", error);
    }
  };
  useEffect(() => {
    signup();
  }, [isConnected, address]);

  return (
    <div className="flex justify-between items-center 2xl:px-[5%]   max-2xl:px-[100px] py-[5px] max-lg:px-[50px] max-md:px-[20px] ">
      <button className="bg-[#DF8B24] hover:bg-[#DF8B24]/90 text-[#f9eba7] font-[600px] invisible max-sm:hidden text-[14px] py-[10px] px-[20px] rounded-[50px]">
        Connect
      </button>
      <Image
        height={145}
        width={145}
        className="max-sm:w-[68px] max-sm:h-[68px] max-lg:w-[100px] max-lg:h-[100px]"
        src={"/logo.svg"}
        alt="logo"
      ></Image>
      <button
        onClick={() => {
          open(), setIsSignUp(true);
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
