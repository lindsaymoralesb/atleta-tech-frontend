"use client";

import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";

import { inAppWallet, createWallet } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID ?? "",
});

const Navbar = () => {
  const wallets = [
    inAppWallet({
      auth: {
        options: ["google", "email", "passkey", "apple"],
      },
    }),
    createWallet("com.coinbase.wallet"),
    createWallet("io.metamask"),
  ];

  return (
    <nav className="flex justify-between items-center p-6">
      <Link href={"/"} className="flex flex-row gap-5 text-2xl items-center font-extrabold">
        <Dumbbell className="w-9 h-9 text-white" /> 
        ATLETA.TECH
      </Link>
      <div className="flex flex-row gap-8 items-center">
        <Link href="/explore" className="mx-4 hover:text-purple-300">
          Explorar
        </Link>
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

export default Navbar;
