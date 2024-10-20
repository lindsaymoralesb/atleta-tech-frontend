"use client";

import React from "react";
import { useReadContract } from "thirdweb/react";
import { useContract } from "../hooks/useContract";
import NFTDetails from "./NFTDetails";

interface AthleteNFTsProps {
  athleteIndex: bigint;
}

const AthleteNFTs: React.FC<AthleteNFTsProps> = ({ athleteIndex }) => {
  const { contract } = useContract();

  // Fetch athlete's address
  const { data: athleteAddress, isLoading: isAddressLoading } = useReadContract(
    {
      contract,
      method:
        "function getAthleteAddressByIndex(uint256 _index) view returns (address)",
      params: [athleteIndex],
    }
  );

  // Fetch athlete's profile
  const { data: profile, isLoading: isProfileLoading } = useReadContract({
    contract,
    method:
      "function getProfile(address _athlete) view returns (string name, string sport, string country, string bio, string[] nftCollections, uint256 createdAt)",
    params: [athleteAddress ?? "0x0000000000000000000000000000000000000000"],
  });

  //   console.log(profile);

  if (isAddressLoading || isProfileLoading) {
    return <div>Cargando...</div>;
  }

  if (!profile) {
    return <div>No profile data found for this athlete.</div>;
  }

  return <NFTDetails collectionUrls={Array.from(profile[4])} athleteName={profile[0]} />;
};

export default AthleteNFTs;
