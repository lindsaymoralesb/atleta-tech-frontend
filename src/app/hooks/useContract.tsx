"use client";

import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { prepareContractCall } from "thirdweb";
import {
  useConnectedWallets,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import { client } from "../utils/client";

export const useContract = () => {
  const connectedWallets = useConnectedWallets();
  const address = connectedWallets.find(wallet => wallet.id === "smart")?.getAccount()?.address ?? "";
  const { mutate: sendTransaction } = useSendTransaction();

  // contract connection
  const contract = getContract({
    client,
    chain: defineChain(84532),
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
  });

  //read contract

  const getAthleteCount = () => {
    return useReadContract({
      contract,
      method: "function getAthleteCount() view returns (uint256)",
      params: [],
    });
  };

  const getAthleteAddressByIndex = (_index: bigint) => {
    return useReadContract({
      contract,
      method:
        "function getAthleteAddressByIndex(uint256 _index) view returns (address)",
      params: [_index],
    });
  };

  const getAthleteProfile = (_athlete: string) => {
    return useReadContract({
      contract,
      method:
        "function getProfile(address _athlete) view returns (string name, string sport, string country, string bio, string[] nftCollections, uint256 createdAt)",
      params: [_athlete],
    });
  };

  //write contract

  const handleCreateProfile = async (
    _name: string,
    _sport: string,
    _country: string,
    _bio: string,
    _nftCollections: string[]
  ) => {
    try {
      const transaction = prepareContractCall({
        contract,
        method:
          "function createProfile(string _name, string _sport, string _country, string _bio, string[] _nftCollections)",
        params: [_name, _sport, _country, _bio, _nftCollections],
      });

      await new Promise<void>((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Transaction sent:", result);
            resolve();
          },
          onError: (error) => {
            reject(error);
          },
        });
      });

      return {
        success: true,
        message: "Profile creation transaction sent successfully",
      };
    } catch (error: any) {
      if (error.code === 4001) {
        return {
          success: false,
          error: "Transaction was cancelled by the user.",
        };
      }
      return {
        success: false,
        error: error.message || "An error occurred during the transaction.",
      };
    }
  };

  const handleLinkNFTCollection = async (_collectionAddress: string) => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function linkNFTCollection(string _collectionAddress)",
        params: [_collectionAddress],
      });

      await new Promise<void>((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Transaction sent:", result);
            resolve();
          },
          onError: (error) => {
            reject(error);
          },
        });
      });

      return {
        success: true,
        message: "Link NFT transaction sent successfully",
      };
    } catch (error: any) {
      if (error.code === 4001) {
        return {
          success: false,
          error: "Transaction was cancelled by the user.",
        };
      }
      return {
        success: false,
        error: error.message || "An error occurred during the transaction.",
      };
    }
  };

  const handleUpdateProfile = async (
    _name: string,
    _sport: string,
    _country: string,
    _bio: string
  ) => {
    try {
      const transaction = prepareContractCall({
        contract,
        method:
          "function updateProfile(string _name, string _sport, string _country, string _bio)",
        params: [_name, _sport, _country, _bio],
      });

      await new Promise<void>((resolve, reject) => {
        sendTransaction(transaction, {
          onSuccess: (result) => {
            console.log("Transaction sent:", result);
            resolve();
          },
          onError: (error) => {
            reject(error);
          },
        });
      });

      return {
        success: true,
        message: "Profile update transaction sent successfully",
      };
    } catch (error: any) {
      if (error.code === 4001) {
        return {
          success: false,
          error: "Transaction was cancelled by the user.",
        };
      }
      return {
        success: false,
        error: error.message || "An error occurred during the transaction.",
      };
    }
  };

  return {
    client,
    contract,
    address,
    getAthleteCount,
    getAthleteAddressByIndex,
    getAthleteProfile,
    handleCreateProfile,
    handleUpdateProfile,
    handleLinkNFTCollection,
  };
};
