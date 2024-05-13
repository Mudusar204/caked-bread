"use client";
import React, { useState } from "react";
import { Monomaniac_One, Exo, Montserrat } from "next/font/google";
const monomaniacOne = Monomaniac_One({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "500" });
const exo = Exo({ subsets: ["latin"], weight: "700" });
const Page = () => {
  const [performance, setPerformance] = useState([
    "25%",
    "50%",
    "75%",
    "100%",
    "MAX",
  ]);
  return (
    <div className="container max-sm:w-[90%] max-lg:w-[50%] max-md:w-[60%] w-[40%] mx-auto">
      <p
        className={
          monomaniacOne.className +
          " text-center font-[400px] text-[24px] leading-[32px] mt-[30px]"
        }
      >
        THE BNB REWARD POOL WITH THE TASTIEST <br /> DAILY REWARDS! <br /> 8%
        VARIABLE RETURNS DAILY
      </p>
      <button className="mt-[30px] text-center font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border border-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] py-[10px] rounded-md bg-white/1 0 ">
        FAQS
      </button>
      <button className="mt-[15px] text-center font-[700px] text-[20px] text-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
        MERCH SHOP
      </button>
      <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
        <div className="uppercase flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Contract</p>
          <p>0 BNB</p>
        </div>
        <div className="uppercase mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Wallet</p>
          <p>0 BNB</p>
        </div>
        <div className="uppercase mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Your Beans</p>
          <p>0 BEANS</p>
        </div>

        <input
          placeholder="0 BNB"
          type="number"
          className="p-[10px] mt-[30px] text-right font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border-[3px] border-[#DF8B24] py-[10px] bg-[#FDF8DF] "
        />
        <div className="flex justify-between items-center mt-5">
          {performance.map((item, index) => {
            return (
              <p
                key={index}
                className="text-[#FDF8DF] font-[700px] text-[20px] leading-[23px] bg-[#DF8B24] rounded-[50px] px-[10px] py-[18px]"
              >
                {item}
              </p>
            );
          })}
        </div>
        <button className="uppercase mt-[30px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
          Caked Bread
        </button>
        <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">RE-BAKE</p>
          <p>Your rewards</p>
        </div>
        <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">0 BEANS</p>
          <p>0.00000 BNB</p>
        </div>
        <button className="uppercase mt-[20px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
          Re-bake
        </button>
        <button className="uppercase mt-[20px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
          eat bread
        </button>
      </div>
      <button className="uppercase mt-[10px] text-center font-[700px] text-[20px] text-[#FDF8DF] w-[100%] 2xl:w-[70%]  py-[10px] rounded-md bg-[#DF8B24] ">
        Show coin flip
      </button>
      <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#DF8B24]/70 ">
        <div>
          <p className="uppercase text-center font-[700px] text-[20px] text-[#FDF8DF]">
            Referral Link
          </p>
        </div>

        <input
          placeholder=""
          type="text"
          className="p-[10px] mt-[30px] text-right font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border-[3px] border-black py-[10px] bg-[#FDF8DF] "
        />

        <button className="uppercase mt-[30px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
          Copy Link
        </button>
        <p
          className={
            montserrat.className +
            "text-center mt-[20px] uppercase px-4 leading-6  text-[16px] text-[#523129]"
          }
        >
          Invite your friends using your link and earn ~10% of any Beans they
          BAKE and 1% of Re-BAKES. Referral Rewards are additional and are not
          deducted from your friends beans.
        </p>
      </div>
    </div>
  );
};

export default Page;
