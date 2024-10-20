"use client";

import React from "react";
import { useReadContract } from "thirdweb/react";
import { useContract } from "../hooks/useContract";
import AthleteNFTs from "../components/AthleteNFTs";
import Navbar from "../components/Navbar";
import NavbarNFT from "../components/NavbarNFT";

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

  const handleSearch = () => {};

  return isLoading ? (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] flex flex-col">
      <Navbar />
      <div className="relative px-2 py-10 w-full flex items-center justify-center h-full text-bold text-2xl flex-1">
        Cargando...
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] flex flex-col">
      <NavbarNFT onSearch={handleSearch} /> {/* Pass onSearch to NavbarNFT */}
      {/* New Menu Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img
          src="/images/atletas_img.jpg"
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-top shadow-lg"
        />
        <div
          className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div
          className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
          aria-hidden="true"
        >
          <div
            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              ATLETA.TECH
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Conecta con tus atletas favoritos, apoya sus sueños y sé parte de
              sus historias únicas a través de colecciones NFT exclusivas.
            </p>
          </div>
        </div>
      </div>
      {/* End of New Menu Section */}
      {renderAthletes()}
    </div>
  );
};

export default ExplorePage;
