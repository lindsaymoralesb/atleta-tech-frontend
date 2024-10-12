"use client";

import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { prepareContractCall } from "thirdweb";
import { useReadContract, useSendTransaction } from "thirdweb/react";

export const useContract = () => {
  const { mutate: sendTransaction } = useSendTransaction();

  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? "",
  });

  // contract connection
  const contract = getContract({
    client,
    chain: defineChain(84532),
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? "",
  });

  //read contract

  const getAthleteCount = () => {
    const { data, isPending } = useReadContract({
      contract,
      method: "function getAthleteCount() view returns (uint256)",
      params: [],
    });
  };

  const getAthleteAddressByIndex = (_index: bigint) => {
    const { data, isPending } = useReadContract({
      contract,
      method:
        "function getAthleteAddressByIndex(uint256 _index) view returns (address)",
      params: [_index],
    });
  };

  const getAthleteProfile = (_athlete: string) => {
    const { data, isPending } = useReadContract({
      contract,
      method:
        "function getProfile(address _athlete) view returns (string name, string sport, string country, string bio, string[] nftCollections, uint256 createdAt)",
      params: [_athlete],
    });
  };

  //write contract

  const handleCreateProfile = (
    _name: string,
    _sport: string,
    _country: string,
    _bio: string
  ) => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function createProfile(string _name, string _sport, string _country, string _bio)",
      params: [_name, _sport, _country, _bio],
    });
    sendTransaction(transaction);
  };

  const handleLinkNFTCollection = (_collectionAddress: string) => {
    const transaction = prepareContractCall({
      contract,
      method: "function linkNFTCollection(string _collectionAddress)",
      params: [_collectionAddress],
    });
    sendTransaction(transaction);
  };

  const handleUpdateProfile = (
    _name: string,
    _sport: string,
    _country: string,
    _bio: string
  ) => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function updateProfile(string _name, string _sport, string _country, string _bio)",
      params: [_name, _sport, _country, _bio],
    });
    sendTransaction(transaction);
  };

  return { client, contract, getAthleteCount, getAthleteAddressByIndex, getAthleteProfile, handleCreateProfile, handleLinkNFTCollection };
}
