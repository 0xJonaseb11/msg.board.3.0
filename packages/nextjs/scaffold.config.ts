import * as chains from "viem/chains";

const MessageBoardABI = [
  {
    inputs: [{ internalType: "string", name: "_newMessage", type: "string" }],
    name: "updateMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMessage",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "clearMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "string", name: "newMessage", type: "string" }],
    name: "MessageUpdated",
    type: "event",
  },
] as const;

const scaffoldConfig = {
  targetNetworks: [chains.baseSepolia],

  pollingInterval: 30000,

  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  onlyLocalBurnerWallet: false,

  contracts: {
    MessageBoard: {
      address: "0x13dd1DF1be859169e94b89B17C067a26d8b6Cc80",
      abi: MessageBoardABI,
    },
  },
} as const satisfies ScaffoldConfig;

export default scaffoldConfig;
