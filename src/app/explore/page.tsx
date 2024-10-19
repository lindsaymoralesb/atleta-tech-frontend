"use client";

import React from "react";
import { useReadContract } from "thirdweb/react";
import { useContract } from "../hooks/useContract";
import AthleteNFTs from "../components/AthleteNFTs";
import Navbar from "../components/Navbar";

const ExplorePage = () => {
  const { contract } = useContract();

  const { data: athleteCount, isLoading } = useReadContract({
    contract,
    method: "function getAthleteCount() view returns (uint256)",
    params: [],
  });

  const renderAthletes = () => {
    if (!athleteCount) return null;

    return Array.from({ length: Number(athleteCount) }, (_, index) => (
      <AthleteNFTs athleteIndex={BigInt(index)} key={index} />
    ));
  };

  return isLoading ? (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] flex flex-col">
      <Navbar />
      <div className="relative px-2 py-10 w-full flex items-center justify-center h-full text-bold text-2xl flex-1">
        Cargando...
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] flex flex-col">
      {renderAthletes()}
    </div>
  );
};

export default ExplorePage;
