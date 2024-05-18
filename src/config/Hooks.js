import { ethers } from "ethers";
import abi from "../config/abi.json";
import { useMemo } from "react";
import { parseUnits } from "viem";
// const rpc = "https://bsc-dataseed.binance.org/";
const rpc = "https://data-seed-prebsc-1-s1.binance.org:8545";
const walletAdd = "0x4eCbf8722613809922E436B5FB666FfB864363CC";

export const contractAddress = "0xdaCe761e17F9512Aa19369b764B251A12aca7fA9";

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
// export const gasEstimationPayable = async (account, fn, data, amount) => {
//   if (account) {
//     const estimateGas = await fn(...data, ethers.constants.MaxUint256).catch(
//       () => {
//         return fn({ value: amount.toString() });
//       }
//     );
//     return calculateGasMargin(estimateGas);
//   }
// };

export const gasEstimationPayable = async (account, fn, data, amount) => {
  try {
    if (account) {
      const estimateGas = await fn(...data, ethers.constants.MaxUint256).catch(
        () => {
          return fn(...data, { value: parseUnits(amount.toString()) });
        }
      );
      return calculateGasMargin(estimateGas);
    }
  } catch (error) {
    return 210000;
  }
};
export const gasEstimationForAll = async (account, fn, data) => {
  if (account) {
    const estimateGas = await fn(...data, ethers.constants.MaxUint256).catch(
      () => {
        return fn(...data);
      }
    );
    return calculateGasMargin(estimateGas);
  }
};
