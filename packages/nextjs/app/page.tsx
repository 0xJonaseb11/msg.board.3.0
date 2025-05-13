"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useScaffoldContract, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export default function MessageBoard() {
  const { address, isConnected } = useAccount();
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Contract interaction hooks
  const { data: messageBoardContract } = useScaffoldContract({
    contractName: "MessageBoard",
  });

  const { data: currentMessage, refetch: refetchMessage } = useScaffoldReadContract({
    contractName: "MessageBoard",
    functionName: "getMessage",
    watch: true,
  });

  const { writeContractAsync: updateMessage } = useScaffoldWriteContract({
    contractName: "MessageBoard",
    functionName: "updateMessage",
    args: [newMessage],
    onBlockConfirmation: () => {
      refetchMessage();
      setIsLoading(false);
      notification.success("Message updated!");
    },
  });

  const { writeContractAsync: clearMessage } = useScaffoldWriteContract({
    contractName: "MessageBoard",
    functionName: "clearMessage",
    onBlockConfirmation: () => {
      setNewMessage("");
      refetchMessage();
      setIsLoading(false);
      notification.success("Message cleared!");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setIsLoading(true);
    try {
      await updateMessage();
    } catch (error) {
      console.error("Error updating message:", error);
      notification.error("Failed to update message");
      setIsLoading(false);
    }
  };

  const handleClear = async () => {
    setIsLoading(true);
    try {
      await clearMessage();
    } catch (error) {
      console.error("Error clearing message:", error);
      notification.error("Failed to clear message");
      setIsLoading(false);
    }
  };

  // Debugging: Log contract and current message
  useEffect(() => {
    console.log("MessageBoard Contract:", messageBoardContract);
    console.log("Current Message:", currentMessage);
  }, [messageBoardContract, currentMessage]);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Message Board</h1>

      <div className="bg-base-200 p-4 rounded-lg mb-4 w-full max-w-md">
        <p className="font-semibold mb-2">Current Message:</p>
        <div className="p-2 bg-base-100 rounded break-words">
          {currentMessage || <span className="text-gray-500">No message set</span>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Enter your message"
            className="input input-bordered w-full"
            disabled={isLoading}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={!isConnected || !newMessage.trim() || isLoading}
            className="btn btn-primary flex-1"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={!isConnected || isLoading}
            className="btn btn-secondary flex-1"
          >
            {isLoading ? "Clearing..." : "Clear"}
          </button>
        </div>
      </form>

      {!isConnected && <div className="mt-4 text-warning">Connect your wallet to interact</div>}
    </div>
  );
}
