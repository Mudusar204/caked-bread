"use client";
// @ts-ignore
// @ts-nocheck
import React, { useState, useEffect, useContext } from "react";
import { Monomaniac_One, Exo, Montserrat } from "next/font/google";
const monomaniacOne = Monomaniac_One({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["cyrillic"], weight: "500" });
const exo = Exo({ subsets: ["latin"], weight: "700" });
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useAccount, useChainId, useSwitchChain } from "wagmi";
import {
  gasEstimationForAll,
  gasEstimationPayable,
  useBreadContract,
  contractAddress,
} from "../config/Hooks";
import { DataContext } from "../config/ContextAPI";
import { useEthersProvider, useEthersSigner } from "../config/ethersAdapter";
import { formatEther, parseEther, parseUnits } from "ethers/lib/utils";
import abi from "../config/abi.json";

const Home = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");
  const { isConnected, address } = useAccount();
  const { loader, setLoader } = useContext(DataContext);
  const [contractBalance, setContractBalance] = useState("");
  const [myBeans, setMyBeans] = useState("");
  const [balance, setBalance] = useState("");
  const [reBake, setReBake] = useState("");
  const [rewards, setRewards] = useState("");
  const [reBakeTime, setReBakeTime] = useState("");
  const [disReBake, setDisReBake] = useState(false);

  //@ts-ignore

  // -==========================================================================
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const Contract = useBreadContract();
  const Contract1 = useBreadContract(signer);

  useEffect(() => {
    async function FetchData() {
      let CBalance = await Contract.getBalance();
      setContractBalance((+formatEther(CBalance.toString())).toFixed(5));
      let MyMiners = await Contract.getMyMiners(address);
      setMyBeans((+formatEther(MyMiners.toString())).toFixed(5));
      let balance = await provider.getBalance(address);
      setBalance((+formatEther(balance.toString())).toFixed(5));
      // rebake
      let myCakes = await Contract.getMyCakes(address);

      let myCakesValue = Math.floor(+myCakes.toString() / 1080000);
      setReBake(myCakesValue.toString());
      // rewards
      let formatValue = myCakes.toString();
      console.log(formatValue, "formatValue-=--=-=--=");
      let rewardBreads = await Contract.calculateCakesSell(+formatValue);
      setRewards(formatEther(rewardBreads));
      reBakeTime;
      let lastHatch = await Contract.lastHatch(address);
      setReBakeTime(lastHatch.toString());
      console.log(lastHatch, "lastHatch=-=--==-");
    }
    FetchData();
  }, [isConnected]);

  // CakedBread
  const CakedBreadHandler = async () => {
    if (!isConnected) {
      toast.error("Please connect Wallet");
    } else if (value.trim() === "") {
      toast.error("Please Enter Amount");
    } else if (value === "0") {
      toast.error("Please Enter Valid Amount");
    } else {
      try {
        setLoader(true);
        let referral;
        const referralParams = searchParams.get("referral");
        if (!referralParams) {
          referral = await Contract.referrals(address);
          if (referral === "0x0000000000000000000000000000000000000000") {
            let owner = await Contract.owner();
            referral = owner;
          }
        } else {
          referral = referralParams;
        }
        let fn = Contract1.estimateGas.buyCakes;
        let data = [referral];

        const tx = await Contract1.buyCakes(...data, {
          value: parseUnits(value),
          gasLimit: gasEstimationPayable(address, fn, data, value),
        });
        await tx.wait();
        toast.success("Cake Baked Successfully");
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error, "error in CakedBaked -=-==-=-=--=--");
        if (error?.data?.message) {
          toast.error(error?.data?.message);
        } else if (error?.reason) {
          toast.error(error?.reason);
        } else {
          toast.error(error?.message);
        }
      }
    }
  };

  const ReBakeHandler = async () => {
    try {
      if (!isConnected) {
        toast.error("Please connect Wallet");
      } else {
        setLoader(true);
        let referral = await Contract.referrals(address);
        let fn = Contract1.estimateGas.hatchCakes;
        let data = [referral];
        const tx = await Contract1.hatchCakes(...data, {
          gasLimit: gasEstimationForAll(address, fn, data),
        });
        await tx.wait();
        toast.success("ReBaked Successfully");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error, "error in ReBaked -=-==-=-=--=--");
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else if (error?.reason) {
        toast.error(error?.reason);
      } else {
        toast.error(error?.message);
      }
    }
  };
  const EatBreadHandler = async () => {
    try {
      if (!isConnected) {
        toast.error("Please connect Wallet");
      } else {
        setLoader(true);
        let fn = Contract1.estimateGas.sellCakes;
        let data = [];
        const tx = await Contract1.sellCakes(...data, {
          gasLimit: gasEstimationForAll(address, fn, data),
        });
        await tx.wait();
        toast.success("EatBread Successfully");
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error, "error in EatBread -=-==-=-=--=--");
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else if (error?.reason) {
        toast.error(error?.reason);
      } else {
        toast.error(error?.message);
      }
    }
  };

  return (
    <>
      {loader && (
        <>
          <div className="w-5 h-5 animate-spin border-b-2 border-t-2 border-black"></div>
        </>
      )}
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
        <button
          onClick={() => router.push("/about")}
          className="mt-[15px] text-center font-[700px] text-[20px] text-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 "
        >
          MERCH SHOP
        </button>
        <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
          <div className="uppercase flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
            <p className="">Contract</p>
            <p>{contractBalance} BNB </p>
          </div>
          <div className="uppercase mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
            <p className="">Wallet</p>
            <p>{balance} BNB</p>
          </div>
          <div className="uppercase mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
            <p className="">Your Beans</p>
            <p>{myBeans} BEANS</p>
          </div>

          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0 BNB"
            type="number"
            className="p-[10px] mt-[30px] text-right font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border-[3px] border-[#DF8B24] py-[10px] bg-[#FDF8DF] "
          />
          <div className="flex justify-between items-center mt-5">
            {["25%", "50%", "75%", "100%"].map((item, index) => {
              return (
                <p
                  key={index}
                  className="text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px]  leading-[23px] bg-[#DF8B24] rounded-[50px] px-[10px] py-[18px] max-sm:py-[13px]"
                >
                  {item}
                </p>
              );
            })}
          </div>
          <button
            onClick={() => CakedBreadHandler()}
            className="uppercase mt-[30px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
          >
            Caked Bread
          </button>
          <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
            <p className="">RE-BAKE</p>
            <p>Your rewards</p>
          </div>
          <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
            <p className="">{reBake} BEANS</p>
            <p>{rewards} BNB</p>
          </div>
          <button
            onClick={() => ReBakeHandler()}
            className="uppercase mt-[20px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
          >
            Re-bake
          </button>
          <button
            onClick={() => EatBreadHandler()}
            className="uppercase mt-[20px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
          >
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
            readOnly
            id="referralInput"
            value={
              isConnected
                ? `${window.location.origin}?referral=${address}`
                : "Connect your wallet to copy"
            }
            placeholder=""
            type="text"
            className="p-[10px] mt-[30px]  font-[700px] text-[20px] text-black w-[100%] 2xl:w-[70%] border-[3px] border-black py-[10px] bg-[#FDF8DF] "
          />

          <button
            onClick={() => {
              isConnected
                ? (navigator.clipboard.writeText(
                    document.getElementById("referralInput").value
                  ),
                  toast.success("copied"))
                : null;
            }}
            className="uppercase mt-[30px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
          >
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
    </>
  );
};

export default Home;

////////////////////////////// FLOP COIN GAME CODE////////////////

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Monomaniac_One } from "next/font/google";
// import { useRouter } from "next/navigation";
// const monomaniacOne = Monomaniac_One({ subsets: ["latin"], weight: "400" });
// import toast from "react-hot-toast";
// const Home = () => {
//   const router = useRouter();
//   const [previousGames, setPreviousGames] = useState<any>([]);
//   const [maxWager, setMaxWager] = useState(10);
//   const [winChance, setWinChance] = useState(50);
//   const [payout, setPayout] = useState(1.95);
//   const [predictedOutcome, setPredictedOutcome] = useState(1);
//   const [gameResult, setGameResult] = useState<any>(null);
//   const [betAmount, setBetAmount] = useState<any>(0);
//   const [yourWinnings, setYourWinnings] = useState(0);
//   const [coinFlipped, setCoinFlipped] = useState(false);
//   const flipCoin = () => {
//     if (betAmount === 0) {
//       toast.error("Please enter bet amount");
//       return;
//     }
//     if (betAmount > maxWager) {
//       toast.error("Max bet amount is " + maxWager);
//       return;
//     }
//     const randomOutcome = Math.random() < 0.5 ? 0 : 1;

//     const isWinner = randomOutcome === predictedOutcome;

//     setGameResult(isWinner ? "Win" : "Loss");
//     setYourWinnings(isWinner ? betAmount * payout : 0);
//     setBetAmount(0);
//     // setPreviousGames((prevGames: any) => [
//     //   ...prevGames,
//     //   { predictedOutcome, winner: isWinner, gameCompleted: true },
//     // ]);
//     setCoinFlipped(true); // Trigger animation

//     setTimeout(() => {
//       setCoinFlipped(false); // Reset animation after some time
//       setPreviousGames((prevGames: any) => [
//         ...prevGames,
//         { predictedOutcome, winner: isWinner, gameCompleted: true },
//       ]);
//     }, 2000); // Duration of the animation
//   };

//   return (
//     <div className="container max-sm:w-[90%] max-lg:w-[50%] max-md:w-[60%] w-[40%] mx-auto">
//       <p
//         className={
//           monomaniacOne.className +
//           " text-center font-[400px] text-[24px] leading-[32px] mt-[30px]"
//         }
//       >
//         THE BNB REWARD POOL WITH THE TASTIEST <br /> DAILY REWARDS! <br /> 8%
//         VARIABLE RETURNS DAILY
//       </p>
//       <button className="mt-[30px] text-center font-[700px] text-[20px] text-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
//         FAQS
//       </button>
//       <button className="mt-[15px] text-center font-[700px] text-[20px] text-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
//         MERCH SHOP
//       </button>
//       <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
//         <div className="flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//           <p className="">Max Wager</p>
//           <p>{maxWager} BNB</p>
//         </div>
//         <div className=" mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//           <p className="">Win Chance</p>
//           <p>50%</p>
//         </div>
//         <div className=" flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//           <p className="">Payout</p>
//           <div className={`coin ${coinFlipped ? "flip" : ""}`}>
//             <Image height={94} width={94} src={"/coin.svg"} alt="coinImg" />
//           </div>
//           <p>{payout}X</p>
//         </div>
//         <div className="mt-5 flex justify-between items-center gap-10">
//           <button
//             onClick={() => setPredictedOutcome(1)}
//             className={`${
//               predictedOutcome === 1 ? "bg-[#DF8B24]" : "bg-[#523129B5]/90"
//             }   font-[700px] text-[#FDF8DF] flex-1 text-[20px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] max-lg:px-[30px] px-[50px] rounded-[50px]`}
//           >
//             HEADS
//           </button>
//           <button
//             onClick={() => setPredictedOutcome(0)}
//             className={`${
//               predictedOutcome === 0 ? "bg-[#DF8B24]" : "bg-[#523129B5]/90"
//             } text-[#FDF8DF] flex-1 font-[700px] text-[20px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] max-lg:px-[30px] px-[50px] rounded-[50px]`}
//           >
//             TAILS
//           </button>
//         </div>
//         <p className="text-[#FDF8DF] font-[700px] text-[20px] leading-[23px] mt-[50px] text-center">
//           PLACE YOUR BET HEADS OR TAILS
//         </p>
//         <input
//           type="number"
//           value={betAmount}
//           min={0}
//           onChange={(e) => setBetAmount(e.target.value)}
//           placeholder="0 BNB"
//           className="p-[10px] mt-[30px] text-right font-[700px] text-[20px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border-[3px] border-[#DF8B24] py-[10px] bg-[#FDF8DF] "
//         />
//         <button
//           onClick={flipCoin}
//           className="mt-[30px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
//         >
//           FLIP COIN
//         </button>
//         <p className="w-[100%] border-t-[1px] border-[#DF8B24] mt-7"></p>
//         <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//           <p className="">Game Result</p>
//           <p>{gameResult}</p>
//         </div>
//         <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//           <p className="">Your Winnings</p>
//           <p>{yourWinnings} BNB</p>
//         </div>
//         <button className="mt-[20px] text-center font-[700px] text-[20px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
//           CLAIM WINNING
//         </button>
//       </div>
//       <button
//         onClick={() => router.push("/home")}
//         className="mt-[10px] text-center font-[700px] text-[20px] text-[#FDF8DF] w-[100%] 2xl:w-[70%]  py-[10px] rounded-md bg-[#DF8B24] "
//       >
//         SHOW CAKED BREAD
//       </button>
//       <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
//         <p className="text-[#FDF8DF] font-[700px] text-[20px] leading-[23px] text-center">
//           Previous Games
//         </p>

//         {previousGames.map((game: any, index: any) => (
//           <div key={index}>
//             <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//               <p>Game Number</p>
//               <p> {index + 1}</p>
//             </div>
//             <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//               <p>Predicted Outcome</p>
//               <p>{game.predictedOutcome}</p>
//             </div>
//             <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//               <p>Winner</p>
//               <p>{game?.winner ? "Yes" : "No"}</p>
//             </div>
//             <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] leading-[23px]">
//               <p>Game Completed</p>
//               <p>{game.gameCompleted ? "Yes" : "No"}</p>
//             </div>
//             <p className="w-[100%] border-t-[1px] border-[#DF8B24] mt-7"></p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Home;
