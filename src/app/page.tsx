"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Monomaniac_One } from "next/font/google";
import { useRouter } from "next/navigation";
const monomaniacOne = Monomaniac_One({ subsets: ["latin"], weight: "400" });
import toast from "react-hot-toast";
const Home = () => {
  const router = useRouter();
  const [previousGames, setPreviousGames] = useState<any>([]);
  const [maxWager, setMaxWager] = useState(10);
  const [winChance, setWinChance] = useState(50);
  const [payout, setPayout] = useState(1.95);
  const [predictedOutcome, setPredictedOutcome] = useState(1);
  const [gameResult, setGameResult] = useState<any>(null);
  const [betAmount, setBetAmount] = useState<any>(0);
  const [yourWinnings, setYourWinnings] = useState(0);
  const [coinFlipped, setCoinFlipped] = useState(false);
  const flipCoin = () => {
    if (betAmount === 0) {
      toast.error("Please enter bet amount");
      return;
    }
    if (betAmount > maxWager) {
      toast.error("Max bet amount is " + maxWager);
      return;
    }
    const randomOutcome = Math.random() < 0.5 ? 0 : 1;

    const isWinner = randomOutcome === predictedOutcome;

    setGameResult(isWinner ? "Win" : "Loss");
    setYourWinnings(isWinner ? betAmount * payout : 0);
    setBetAmount(0);
    // setPreviousGames((prevGames: any) => [
    //   ...prevGames,
    //   { predictedOutcome, winner: isWinner, gameCompleted: true },
    // ]);
    setCoinFlipped(true); // Trigger animation

    setTimeout(() => {
      setCoinFlipped(false); // Reset animation after some time
      setPreviousGames((prevGames: any) => [
        ...prevGames,
        { predictedOutcome, winner: isWinner, gameCompleted: true },
      ]);
    }, 1000); // Duration of the animation
  };

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
      <button className="mt-[30px] text-center font-[700px] text-[20px] text-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
        FAQS
      </button>
      <button className="mt-[15px] text-center font-[700px] text-[20px] text-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
        MERCH SHOP
      </button>
      <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
        <div className="flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Max Wager</p>
          <p>{maxWager} BNB</p>
        </div>
        <div className=" mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Win Chance</p>
          <p>50%</p>
        </div>
        <div className=" flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Payout</p>
          <div className={`coin ${coinFlipped ? "flip" : ""}`}>
            <Image height={94} width={94} src={"/coin.svg"} alt="coinImg" />
          </div>
          <p>{payout}X</p>
        </div>
        <div className="mt-5 flex justify-between items-center gap-10">
          <button
            onClick={() => setPredictedOutcome(1)}
            className={`${
              predictedOutcome === 1 ? "bg-[#DF8B24]" : "bg-[#523129B5]/90"
            }   font-[700px] text-[#FDF8DF] flex-1 text-[20px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] max-lg:px-[30px] px-[50px] rounded-[50px]`}
          >
            HEADS
          </button>
          <button
            onClick={() => setPredictedOutcome(0)}
            className={`${
              predictedOutcome === 0 ? "bg-[#DF8B24]" : "bg-[#523129B5]/90"
            } text-[#FDF8DF] flex-1 font-[700px] text-[20px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] max-lg:px-[30px] px-[50px] rounded-[50px]`}
          >
            TAILS
          </button>
        </div>
        <p className="text-[#FDF8DF] font-[700px] text-[20px] leading-[23px] mt-[50px] text-center">
          PLACE YOUR BET HEADS OR TAILS
        </p>
        <input
          type="number"
          value={betAmount}
          min={0}
          onChange={(e) => setBetAmount(e.target.value)}
          placeholder="0 BNB"
          className="p-[10px] mt-[30px] text-right font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border-[3px] border-[#DF8B24] py-[10px] bg-[#FDF8DF] "
        />
        <button
          onClick={flipCoin}
          className="mt-[30px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
        >
          FLIP COIN
        </button>
        <p className="w-[100%] border-t-[1px] border-[#DF8B24] mt-7"></p>
        <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Game Result</p>
          <p>{gameResult}</p>
        </div>
        <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
          <p className="">Your Winnings</p>
          <p>{yourWinnings} BNB</p>
        </div>
        <button className="mt-[20px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
          CLAIM WINNING
        </button>
      </div>
      <button
        onClick={() => router.push("/home")}
        className="mt-[10px] text-center font-[700px] text-[20px] text-[#FDF8DF] w-[100%] 2xl:w-[70%]  py-[10px] rounded-md bg-[#DF8B24] "
      >
        SHOW CAKED BREAD
      </button>
      <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
        <p className="text-[#FDF8DF] font-[700px] text-[20px] leading-[23px] text-center">
          Previous Games
        </p>

        {previousGames.map((game: any, index: any) => (
          <div key={index}>
            <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
              <p>Game Number</p>
              <p> {index + 1}</p>
            </div>
            <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
              <p>Predicted Outcome</p>
              <p>{game.predictedOutcome}</p>
            </div>
            <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
              <p>Winner</p>
              <p>{game?.winner ? "Yes" : "No"}</p>
            </div>
            <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
              <p>Game Completed</p>
              <p>{game.gameCompleted ? "Yes" : "No"}</p>
            </div>
            <p className="w-[100%] border-t-[1px] border-[#DF8B24] mt-7"></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
