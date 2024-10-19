"use client";

import { ConnectButton } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";
import Link from "next/link";
import { Dumbbell } from "lucide-react";
import { client } from "../utils/client";
import React, { useState } from "react";

// Define the props type for NavbarNFT
interface NavbarNFTProps {
  onSearch: (searchTerm: string) => void; // Function type for onSearch prop
}

const NavbarNFT: React.FC<NavbarNFTProps> = ({ onSearch }) => {
  const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "email", "passkey", "apple"],
      },
    }),
    createWallet("com.coinbase.wallet"),
    createWallet("io.metamask"),
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); // Pass the search term to the parent component
  };

  return (
    <nav className="flex justify-between items-center p-6 bg-gray-800">
      <Link href={"/"} className="flex flex-row gap-5 text-2xl items-center font-extrabold text-white">
        <Dumbbell className="w-9 h-9 text-white" />
        ATLETA.TECH
      </Link>
      <div className="flex flex-row gap-8 items-center">
        <input
          type="text"
          placeholder="Search NFTs..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-64 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
        />
        <ConnectButton
          client={client}
          wallets={wallets}
          connectButton={{ label: "Iniciar Sesión" }}
          connectModal={{
            size: "wide",
            title: "Iniciar Sesión",
          }}
          accountAbstraction={{
            chain: baseSepolia,
            sponsorGas: true,
          }}
          locale={"es_ES"}
        />
      </div>
    </nav>
  );
};

export default NavbarNFT;
