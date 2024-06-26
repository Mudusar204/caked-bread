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
import Image from "next/image";
import {
  gasEstimationForAll,
  gasEstimationPayable,
  useBreadContract,
  contractAddress,
} from "../config/Hooks";
import { DataContext } from "../config/ContextApiFile";
import { useEthersProvider, useEthersSigner } from "../config/ethersAdapter";
import { formatEther, parseEther, parseUnits } from "ethers/lib/utils";
import abi from "../config/abi.json";
import Link from "next/link";

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
  // const [reBakeTime, setReBakeTime] = useState("");
  const [disReBake, setDisReBake] = useState(true);
  const [showCalculatedBeans, setShowCalculatedBeans] = useState(false);
  const [CalculatedBeans, setCalculatedBeans] = useState("");
  //@ts-ignore

  // -==========================================================================
  const signer = useEthersSigner();
  const provider = useEthersProvider();
  const Contract = useBreadContract();
  const Contract1 = useBreadContract(signer);

  useEffect(() => {
    if (+value > 0) {
      setTimeout(() => {
        calculateBeans(value);
      }, 1000);
    }
  }, [value]);

  useEffect(() => {
    async function FetchData() {
      let CBalance = await Contract.getBalance();
      setContractBalance((+formatEther(CBalance.toString())).toFixed(5));
      let MyMiners = await Contract.getMyMiners(address);
      setMyBeans(MyMiners.toString());
      let balance = await provider.getBalance(address);
      setBalance((+formatEther(balance.toString())).toFixed(5));
      // rebake
      let myCakes = await Contract.getMyCakes(address);

      let myCakesValue = Math.floor(+myCakes.toString() / 1080000);
      setReBake(myCakesValue.toString());
      // lastHatch
      let lastHatch = await Contract.lastHatch(address);
      // rewards
      let formatValue = myCakes.toString();
      console.log(formatValue, "formatValue for reward getting-=--=-=--=");
      let rewardBreads = await Contract.calculateCakesSell(+formatValue);
      setRewards((+formatEther(rewardBreads)).toFixed(5));

      // reBakeTime
      const milliseconds = 60 * 60 * 1000;
      const currentTimestamp = +lastHatch.toString();
      const futureTimestamp = currentTimestamp * 1000 + milliseconds;
      console.log(
        futureTimestamp < Date.now(),
        +formatEther(rewardBreads) > 0.0000001,
        "rebake check-=-=",
        futureTimestamp,
        "-",
        Date.now(),
        "value-=-",
        formatEther(rewardBreads)
      );
      if (
        futureTimestamp < Date.now() &&
        +formatEther(rewardBreads) > 0.0000001
      ) {
        //0.001 line Limit
        console.log("Button is active");
        setDisReBake(false);
      }
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
        toast.success("Cake Caked Successfully");
        setValue("");
        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error, "error in CakedCaked -=-==-=-=--=--");
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
        toast.success("ReCaked Successfully");
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

  const calculateBeans = async (value) => {
    try {
      console.log("funcion challa");
      let formatValue = parseUnits(value.toString());
      let beans = await Contract.calculateCakeBuySimple(formatValue.toString());
      let yourBeans = (+beans.toString() * 0.92) / 1080000;
      setCalculatedBeans(yourBeans.toFixed(6));
      setShowCalculatedBeans(true);
    } catch (error) {
      console.log(error, "-=-==========error in get cakes input");
    }
  };
  return (
    <>
      {loader && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="w-14 h-14 border-4 border-t-4 border-b-white border-gray-300 rounded-full animate-spin"></div>
          </div>
        </>
      )}
      <div className="container max-sm:w-[85%] max-lg:w-[50%] max-md:w-[60%] w-[512px] mx-auto">
        <p
          className={
            monomaniacOne.className +
            " text-center font-[400px] text-[24px] max-sm:text-[18px] max-sm:leading-[24px] leading-[32px] mt-[30px]"
          }
        >
          THE BNB REWARD POOL WITH THE TASTIEST <br className="max-sm:hidden" />
          DAILY REWARDS! <br /> 5% VARIABLE RETURNS DAILY
        </p>
        <button
          onClick={() => router.push("/faqs")}
          className="mt-[30px] text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#DF8B24] w-[100%] border border-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] py-[10px] rounded-md bg-white/1 0 "
        >
          FAQS
        </button>

        <div className="mt-[20px] w-[100%]  p-[40px] max-sm:p-[20px] rounded-md bg-[#523129B5]/70 ">
          <div className="uppercase flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
            <p className="">Contract</p>
            <p>{contractBalance} BNB </p>
          </div>
          <div className="uppercase mt-5 max-sm:mt-3 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
            <p className="">Wallet</p>
            <p>{balance} BNB</p>
          </div>
          <div className="uppercase mt-5 max-sm:mt-3 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
            <p className="">Your BREADS</p>
            <p>{myBeans} BREADS</p>
          </div>

          <input
            disabled={!isConnected}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            min={0.01}
            placeholder="Enter Min 0.01 BNB"
            type="number"
            className="p-[10px] mt-[30px] max-sm:mt-3 text-right font-[700px] text-[20px] max-sm:text-[14px] text-[#DF8B24] w-[100%]  border-[3px] border-[#DF8B24] py-[10px] bg-[#FDF8DF] "
          />
          <div
            className={`${
              showCalculatedBeans && +value >= 0.01 ? "" : "hidden"
            } uppercase mt-5 max-sm:mt-3  flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]`}
          >
            <p>You will Get</p>
            <p>{(+CalculatedBeans).toFixed(0)} Breads</p>
          </div>
          <div className="flex justify-between items-center mt-5 max-sm:mt-3">
            {["25%", "50%", "75%", "100%"].map((item, i) => {
              return (
                <p
                  onClick={() => {
                    if (+i === 0) {
                      let number = +balance * 0.25;
                      setValue(number);
                    } else if (+i === 1) {
                      let number = +balance * 0.5;
                      setValue(number);
                    } else if (+i === 2) {
                      let number = +balance * 0.75;
                      setValue(number);
                    } else if (+i === 3) {
                      let number = +balance;
                      setValue(number);
                    }
                  }}
                  key={i}
                  className="text-[#FDF8DF] cursor-pointer font-[700px] text-[20px]   max-sm:text-[12px]  leading-[23px] bg-[#DF8B24] rounded-[50px] px-[10px] max-sm:px-[7px] py-[18px] max-sm:py-[10px]  pointer"
                >
                  {item}
                </p>
              );
            })}
          </div>
          <button
            disabled={+value < 0.01}
            onClick={() => CakedBreadHandler()}
            className={`${
              +value < 0.01 ? "cursor-not-allowed" : "cursor-pointer"
            } uppercase mt-[30px] max-sm:mt-3 text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#FDF8DFBA] w-[100%]   py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 `}
          >
            Caked Bread
          </button>
          <div className="mt-5 max-sm:mt-3 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
            <p className="">RE-CAKE</p>
            <p>Your rewards</p>
          </div>
          <div className="mt-5 max-sm:mt-3 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
            <p className="">{reBake} BREADS</p>
            <p>{rewards} BNB</p>
          </div>
          <button
            disabled={disReBake}
            onClick={() => ReBakeHandler()}
            className="uppercase mt-[20px] max-sm:mt-3 text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#FDF8DFBA] w-[100%]   py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
          >
            Re-Cake
          </button>
          <button
            onClick={() => EatBreadHandler()}
            className="uppercase mt-[20px] max-sm:mt-3 text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#FDF8DFBA] w-[100%]   py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
          >
            eat bread
          </button>
        </div>

        <div className="mt-[20px] w-[100%]  px-[35px] max-sm:px-[15px] pt-[20px] pb-[30px] rounded-md bg-[#DF8B24]/70 ">
          <div>
            <p className="uppercase text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#FDF8DF]">
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
            className="p-[10px] mt-[30px] max-sm:mt-[10px]  font-[700px] text-[20px] max-sm:text-[14px] text-black w-[100%]  border-[3px] border-black py-[10px] bg-[#FDF8DF] "
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
            className="uppercase mt-[30px] max-sm:mt-[15px] text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#FDF8DFBA] w-[100%]   py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
          >
            Copy Link
          </button>
          <p
            className={
              // montserrat.className +
              "text-center mt-[20px] max-sm:mt-[10px] font-sans font-light uppercase px-5 max-sm:px-[5px] max-sm:leading-[16px] max-sm:text-[12px] leading-6  text-[16px] text-[#523129]"
            }
          >
            Invite your friends using your link and earn ~5% of any Breads they
            CAKE and 2% of Re-CAKES. Referral Rewards are additional and are not
            deducted from your friends Breads.
          </p>
        </div>
        <div className="flex justify-center items-center gap-3 my-[20px]">
          {/* <Link href={"https://t.me/cakedbreadminer"} target="_blank"> */}
          <Image
            className=" cursor-pointer"
            height={36}
            width={36}
            src={"/telegram.svg"}
            alt="telegram"
          />
          {/* </Link> */}
          {/* <Link
            href={"https://x.com/Cakedbread?t=dRBYfyKvcXkcdJ7yufWlJw&s=09"}
            target="_blank"
          > */}
          <Image
            className=" cursor-pointer"
            height={25}
            width={25}
            src={"/twitter.svg"}
            alt="twitter"
          />
          {/* </Link> */}
          {/* <Link
            href={
              "https://testnet.bscscan.com/address/0xdaAb436d2AfDEb4cE0eB40244CC0dDed0c619240#readContract"
            }
            target="_blank"
          > */}
          <Image
            className=" cursor-pointer"
            height={30}
            width={30}
            src={"/etherScan.svg"}
            alt="bsc"
          />
          {/* </Link> */}
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
//       <button className="mt-[30px] text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
//         FAQS
//       </button>
//       <button className="mt-[15px] text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#DF8B24] hover:bg-[#DF8B24]/90 hover:text-[#f9eba7] w-[100%] 2xl:w-[70%] border border-[#DF8B24] py-[10px] rounded-md bg-white/1 0 ">
//         MERCH SHOP
//       </button>
//       <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
//         <div className="flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
//           <p className="">Max Wager</p>
//           <p>{maxWager} BNB</p>
//         </div>
//         <div className=" mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
//           <p className="">Win Chance</p>
//           <p>50%</p>
//         </div>
//         <div className=" flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
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
//             }   font-[700px] text-[#FDF8DF] flex-1 text-[20px] max-sm:text-[14px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] max-lg:px-[30px] px-[50px] rounded-[50px]`}
//           >
//             HEADS
//           </button>
//           <button
//             onClick={() => setPredictedOutcome(0)}
//             className={`${
//               predictedOutcome === 0 ? "bg-[#DF8B24]" : "bg-[#523129B5]/90"
//             } text-[#FDF8DF] flex-1 font-[700px] text-[20px] max-sm:text-[14px] py-[10px] max-sm:py-[7px] max-sm:px-[15px] max-lg:px-[30px] px-[50px] rounded-[50px]`}
//           >
//             TAILS
//           </button>
//         </div>
//         <p className="text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px] mt-[50px] text-center">
//           PLACE YOUR BET HEADS OR TAILS
//         </p>
//         <input
//           type="number"
//           value={betAmount}
//           min={0}
//           onChange={(e) => setBetAmount(e.target.value)}
//           placeholder="0 BNB"
//           className="p-[10px] mt-[30px] text-right font-[700px] text-[20px] max-sm:text-[14px] text-[#DF8B24] w-[100%] 2xl:w-[70%] border-[3px] border-[#DF8B24] py-[10px] bg-[#FDF8DF] "
//         />
//         <button
//           onClick={flipCoin}
//           className="mt-[30px] text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 "
//         >
//           FLIP COIN
//         </button>
//         <p className="w-[100%] border-t-[1px] border-[#DF8B24] mt-7"></p>
//         <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
//           <p className="">Game Result</p>
//           <p>{gameResult}</p>
//         </div>
//         <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
//           <p className="">Your Winnings</p>
//           <p>{yourWinnings} BNB</p>
//         </div>
//         <button className="mt-[20px] text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#FDF8DFBA] w-[100%] 2xl:w-[70%]  py-[10px] rounded-[50px] bg-[#523129B5]/70 hover:bg-[#523129B5]/60 ">
//           CLAIM WINNING
//         </button>
//       </div>
//       <button
//         onClick={() => router.push("/home")}
//         className="mt-[10px] text-center font-[700px] text-[20px] max-sm:text-[14px] text-[#FDF8DF] w-[100%] 2xl:w-[70%]  py-[10px] rounded-md bg-[#DF8B24] "
//       >
//         SHOW CAKED BREAD
//       </button>
//       <div className="mt-[20px] w-[100%] 2xl:w-[70%]  p-[30px] rounded-md bg-[#523129B5]/70 ">
//         <p className="text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px] text-center">
//           Previous Games
//         </p>

//         {previousGames.map((game: any, index: any) => (
//           <div key={index}>
//             <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
//               <p>Game Number</p>
//               <p> {index + 1}</p>
//             </div>
//             <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
//               <p>Predicted Outcome</p>
//               <p>{game.predictedOutcome}</p>
//             </div>
//             <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
//               <p>Winner</p>
//               <p>{game?.winner ? "Yes" : "No"}</p>
//             </div>
//             <div className="mt-5 flex justify-between items-center text-[#FDF8DF] font-[700px] text-[20px] max-sm:text-[14px] leading-[23px]">
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
