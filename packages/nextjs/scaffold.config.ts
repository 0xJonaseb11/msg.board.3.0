import MessageBoard from "../hardhat/artifacts/contracts/MessageBoard.sol/MessageBoard.json";
import { Abi } from "abitype";
import * as chains from "viem/chains";

export type ScaffoldConfig = {
  targetNetworks: readonly chains.Chain[];
  pollingInterval: number;
  alchemyApiKey: string;
  rpcOverrides?: Record<number, string>;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  contracts: {
    MessageBoard: {
      address: Record<number, string>;
      abi: Abi;
    };
  };
};

export const DEFAULT_ALCHEMY_API_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

const scaffoldConfig = {
  targetNetworks: [chains.hardhat],

  pollingInterval: 30000,

  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || DEFAULT_ALCHEMY_API_KEY,

  rpcOverrides: {},

  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  onlyLocalBurnerWallet: true,

  contracts: {
    MessageBoard: {
      // Address mapping for different chains
      address: {
        [chains.hardhat.id]: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      },
      abi: MessageBoard.abi as Abi,
    },
  },
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
