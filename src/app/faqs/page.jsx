"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Monomaniac_One, Exo } from "next/font/google";
import Accordion from "../../components/accordianItem";
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

  const items = [
    {
      title: "How do I deposit?",
      content:
        "Get BNB (Binance Smart Chain (BSC)) on your decentralized wallet and connect it with dApp. Enter the BNB you want to deposit in white box and click Caked Bread. Make sure to keep some BNB in your wallet for the gas fees.",
    },
    {
      title: "What is the minimum deposit?",
      content: " Minimum deposit is 0.01 BNB. ",
    },
    {
      title: "What is the maximum deposit?",
      content: "No Max Deposit limit.",
    },
    {
      title: "What are ‘Bread’?",
      content:
        "The BNB deposited by you get you Bread (miners) that generate your rewards. ",
    },

    {
      title: "Can I get my deposited BNB back all at once?",
      content:
        "No, you cannot get your deposited BNB all at once. BNB is locked in the TVL and BNB is received through rewards.",
    },
    {
      title: "How is the value of my bread determined?",
      content:
        "The value of bread fluctuates based on TVL and inflationary rates. Bread do not have a set price      ",
    },
    {
      title: "What happens when I press re-cake button?",
      content:
        "Re-caking compounds your rewards, increasing your breads over time. There is a 60-minute cool down for re-caking. As per the recommendation of Audit, we have used Front End to make sure that the user's ReCakes give them at least 1 Bread.",
    },
    {
      title: "What happens when I press eat breads?",
      content:
        "The BNB in your rewards is dispensed into your personal wallet minus fees. Ensure that your rewards accumulated will outweigh gas fees needed for the transaction. ",
    },
    {
      title: "What will my daily percentage be?",
      content:
        "The daily percentage is variable UP TO 5% based on factors like users eating habits on the platform, contract balance, market bread inflation and more.",
    },
    {
      title: "Do bread amount decrease when you eat?",
      content:
        "No, eating does not decrease users bread count. Only new deposits or re-cakes increase bread holdings.       ",
    },
    {
      title: "What is the teams suggested strategy?",
      content:
        "re-cake multiple times a week and eat once a week to maintain balance and maximize rewards. ",
    },
    {
      title: "What happens if I do not actively re-cake or eat?",
      content:
        "Keeping your breads idle will lead to inflation of bread prices, reducing your rewards over time. Active re-caking or eating is crucial to maintain value and rewards.",
    },
    {
      title: "Is it too late to participate in the project?",
      content:
        "The contract is written to provide an optimal entry for all users, new or old. This is the reason the breads per BNB amount changes with the fluctuation of the TVL. ",
    },
    {
      title: "Is this sustainable?",
      content:
        "Answered above in the external revenue question. If there is still BNB in the TVL rewards will always be distributed.  ",
    },
    {
      title: "What are the anti-whale mechanisms in place?",
      content:
        "Anti-whale mechanics include cool down on re-caking, reduced referral rewards and inflationary mechanics.",
    },
    {
      title: "How do I know Caked Bread is safe?",
      content:
        "The contract was launched as an immutable contract, meaning that no changes can be made by the dev or team. An audit will be provided within the first week of launch. The team is available 24/7 and, in most languages, to answer any questions regarding more information if needed. ",
    },
  ];

  return (
    <div className="container flex flex-col item-center max-sm:w-[90%] max-lg:w-[50%] max-md:w-[60%] w-[512px] mx-auto">
      <p
        className={
          monomaniacOne.className +
          " text-center font-[400px] text-[24px] leading-[32px] mb-[30px] mt-[30px]"
        }
      >
        Frequently Asked Questions
      </p>

      <Accordion items={items} />
      <p
        className={
          "  font-[400px] text-center text-[18px]  mt-[20px] mb-[10px] max-sm:text-[12px]"
        }
      >
        Feel free to reach out at any time.
      </p>
      <div className="bg-[#523129B5]/70  text-[#FDF8DF] rounded-lg p-5 my-8 max-sm:mt-5 max-sm:p-3">
        <p
          className={
            " text-center font-[400px] text-[24px] leading-[32px] mt-[10px] mb-[20px] max-sm:text-[18px]"
          }
        >
          Disclaimer
        </p>
        <p className={"  font-thin text-[11px] max-sm:text-[9px]"}>
          Please note that any Deposit in Caked Bread carries inherent risks.
          Before making any deposit decisions, please carefully consider the
          following points:
          <br /> <br />
          Risk of Loss: Depositing in Caked Bread involves the risk of losing
          some or all your deposits.
          <br /> <br />
          Regulatory Risks: Crypto currency assets may be subject to regulatory
          scrutiny and changes in laws and regulations.
          <br /> <br />
          Project Risks: Caked Bread is a new and emerging project, and as such,
          it may face various risks, including technological, operational, and
          execution risks. There is no guarantee of the projects success or
          continued operation.
          <br /> <br />
          No Financial Advice: The information provided in this disclaimer and
          related materials is for informational purposes only and should not be
          construed as financial, or legal advice. You should consult with a
          qualified professional advisor before making any investment decisions.
          <br /> <br />
          Personal Responsibility: It is your responsibility to conduct thorough
          research, assess your risk tolerance, and seek independent advice
          before investing in Caked Bread or any other crypto currency project.
          <br /> <br />
          By proceeding with any deposit in Caked Bread, you acknowledge and
          accept the risks outlined above. You also agree that neither Caked
          Bread nor any affiliated parties shall be held liable for any losses
          or damages arising from any of your decisions.
        </p>
      </div>
    </div>
  );
};

export default Page;
