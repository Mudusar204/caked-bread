"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Monomaniac_One, Exo } from "next/font/google";
const monomaniacOne = Monomaniac_One({ subsets: ["latin"], weight: "400" });
const Page = () => {
  const [linkTitle, setLinkTitle] = useState([
    "Dapp website",
    "Telegram portal",
    "whitepaper",
    "audit",
    "X",
    "Instagram",
    "facebook",
    "medium",
    "marketing proposal",
  ]);
  return (
    <div className="container flex flex-col item-center max-sm:w-[90%] max-lg:w-[50%] max-md:w-[60%] w-[578px] mx-auto">
      <p
        className={
          monomaniacOne.className +
          " text-center font-[400px] text-[24px] leading-[32px] mt-[30px]"
        }
      >
        CAKED BREAD <br /> THE TASTIEST REWARDS POOL 8% <br /> DAILY VARIABLE
        RETURNS
      </p>
      <div className="flex justify-center items-center gap-3 my-[20px]">
        <Image height={36} width={36} src={"/telegram.svg"} alt="telegram" />
        <Image height={25} width={25} src={"/twitter.svg"} alt="twitter" />
        <Image height={34} width={34} src={"/youtube.svg"} alt="youtube" />
        <Image height={30} width={30} src={"/instagram.svg"} alt="instagram" />
        <Image height={36} width={36} src={"/facebook.svg"} alt="facebook" />
        <Image height={32} width={32} src={"/gmail.svg"} alt="gmail" />
      </div>
      {linkTitle.map((title, index) => (
        <div
          key={index}
          className="flex justify-between items-center px-4 mt-[10px] uppercase text-center font-[700px] text-[20px] text-[#FDF8DF] w-[100%] 2xl:w-[100%]  py-[10px] rounded-md bg-[#DF8B24] hover:bg-[#523129] cursor-pointer"
        >
          <Image
            height={48}
            width={48}
            className="max-sm:w-[31px] max-sm:h-[31px] max-lg:w-[40px] max-lg:h-[40px]"
            src={"/logo.svg"}
            alt="logo"
          ></Image>
          <button
            key={index}
            className="uppercase"
            // className="mt-[10px] uppercase text-center font-[700px] text-[20px] text-[#FDF8DF] w-[100%] 2xl:w-[70%] border border-[#FDF8DF] py-[10px] rounded-md bg-[#DF8B24] "
          >
            {title}
          </button>
          <div className="max-sm:w-[31px] max-sm:h-[31px] max-lg:w-[40px] max-lg:h-[40px] h-[48px] w-[48px] "></div>
        </div>
      ))}
      <div className="flex justify-center">
        <button className="flex justify-center gap-10 items-center mt-[20px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] xl:w-[80%]  py-[10px] rounded-[50px] bg-[#523129B5]/90 hover:bg-[#523129B5]/70 ">
          <Image height={29} width={29} src={"/linktree.svg"} alt="linktree" />
          <p className=""> Create your Linktree </p>
        </button>
      </div>
    </div>
  );
};

export default Page;
