import { ethers } from "ethers";
import abi from "../config/abi.json";
import { useMemo } from "react";
// const rpc = "https://bsc-dataseed.binance.org/";
const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545";
const walletAdd = "0x4eCbf8722613809922E436B5FB666FfB864363CC";

export const contractAddress = "0xaE76E666b61DBEE8d2C82439388E923aA77F9b7F";

const useContract = (address, ABI, signer) => {
  const provider = new ethers.providers.JsonRpcProvider(rpc);
  const voidSigner = new ethers.VoidSigner(walletAdd, provider);
  return useMemo(() => {
    if (signer) return new ethers.Contract(address, ABI, signer);
    else return new ethers.Contract(address, ABI, voidSigner);
  }, [address, ABI, signer]);
};

export function useBreadContract(signer) {
  const contract = contractAddress;

  return useContract(contract, abi, signer);
}
function calculateGasMargin(value) {
  return +(
    (value * BigNumber.from(10000).add(BigNumber.from(1000))) /
    BigNumber.from(10000)
  ).toFixed(0);
}
export const gasEstimationPayable = async (account, fn, data, amount) => {
  if (account) {
    const estimateGas = await fn(...data, MaxUint256).catch(() => {
      return fn({ value: amount.toString() });
    });
    return calculateGasMargin(estimateGas);
  }
};
export const gasEstimationForAll = async (account, fn, data) => {
  if (account) {
    const estimateGas = await fn(...data, MaxUint256).catch(() => {
      return fn(...data);
    });
    return calculateGasMargin(estimateGas);
  }
};
