"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Exo, Monomaniac_One } from "next/font/google";
const monomaniacOne = Monomaniac_One({ subsets: ["latin"], weight: "400" });

const Home = () => {
  const [previousGames, setPreviousGames] = useState([
    { PredictedOutcome: true, Winner: false, GameCompleted: false },
    { PredictedOutcome: true, Winner: false, GameCompleted: false },
    { PredictedOutcome: true, Winner: false, GameCompleted: false },
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
      <button className="mt-[30px] text-center font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
        FAQS
      </button>
      <button className="mt-[15px] text-center font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
        MERCH SHOP
      </button>
      <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
        <div className="flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Max Wager</p>
          <p>0 BNB</p>
        </div>
        <div className=" mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Win Chance</p>
          <p>50%</p>
        </div>
        <div className=" flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Payout</p>
          <Image height={94} width={94} src={"/coin.svg"} alt="coinImg" />
          <p>1.95X</p>
        </div>
        <div className="mt-5 flex justify-between items-center">
          <button className="bg-[#DF8B24] hover:bg-[#DF8B24]/90  font-[700px] text-[#FDF8DF] text-[20px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] max-lg:px-[30px] px-[50px] rounded-[50px]">
            HEADS
          </button>
          <button className="bg-[#523129B5]/90 hover:bg-[#523129B5]/70 text-[#FDF8DF] font-[700px] text-[20px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] max-lg:px-[30px] px-[50px] rounded-[50px]">
            TAILS
          </button>
        </div>
        <p className="text-[#FDF8DF] font-[700px] text-[20px] leading-[23px] mt-[50px] text-center">
          PLACE YOUR BET HEADS OR TAILS
        </p>
        <input
          placeholder="0 BNB"
          type="number"
          className="p-[10px] mt-[30px] text-right font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border-[3px] border-[#DF8B24] py-[10px] bg-[#FDF8DF] "
        />
        <button className="mt-[30px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
          FLIP COIN
        </button>
        <p className="w-[100%] border-t-[1px] border-[#DF8B24] mt-7"></p>
        <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Your Winnings</p>
          <p>0 BNB</p>
        </div>
        <button className="mt-[20px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
          CLAIM WINNING
        </button>
      </div>
      <button className="mt-[10px] text-center font-[700px] text-[20px] text-[#FDF8DF] w-[100%] 2xl:w-[70%]  py-[10px] rounded-md bg-[#DF8B24] ">
        SHOW CAKED BREAD
      </button>
      <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
        <p className="text-[#FDF8DF] font-[700px] text-[20px] leading-[23px] text-center">
          Previous Games
        </p>

        {previousGames.map((item, i) => {
          return (
            <>
              <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
                <p>Game Number</p>
                <p></p>
              </div>
              <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
                <p>Predicted Outcome</p>
                <p>True</p>
              </div>
              <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
                <p>Winner</p>
                <p>False</p>
              </div>
              <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
                <p>Game Completed</p>
                <p>True</p>
              </div>
              <p className="w-[100%] border-t-[1px] border-[#DF8B24] mt-7"></p>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
