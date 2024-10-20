"use client";

import React from "react";
import { Edit, Link as LinkIcon } from "lucide-react";
import Navbar from "./Navbar";
import { useReadContract } from "thirdweb/react";
import { useContract } from "../hooks/useContract";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function AthleteView({ address }: { address: string }) {
  const { address: smartAddress, contract } = useContract();
  const router = useRouter();

  const { data, isLoading } = useReadContract({
    contract,
    method:
      "function getProfile(address _athlete) view returns (string name, string sport, string country, string bio, string[] nftCollections, uint256 createdAt)",
    params: [address],
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] text-2xl flex flex-col">
      <Navbar />
      <div className="flex justify-center items-center h-full flex-1">
        {isLoading ? (
          <>Cargando...</>
        ) : (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden mt-10 relative flex-1">
            {smartAddress === address && (
              <Button
                className="!absolute top-5 right-0"
                onClick={() => {
                  router.push("/athlete/edit");
                }}
              >
                <Edit className="mr-2" size={20} />
              </Button>
            )}
            <div className="md:flex items-center px-8">
              <div className="md:flex-shrink-0">
                <img
                  className="h-[100px] w-full object-cover md:w-[100px]"
                  src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${data?.[0]}${data?.[1]}${data?.[2]}`}
                  alt={data?.[0]}
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                  {data?.[1]}
                </div>
                <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {data?.[0]}
                </h1>
                <p className="mt-2 text-xl text-gray-500">{data?.[2]}</p>
              </div>
            </div>
            <div className="px-8 py-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Historia
              </h2>
              <p className="text-gray-600 mb-6">{data?.[3]}</p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Colecciones compartidas
              </h2>
              <div className="space-y-3">
                {data?.[4].map((collection, index) => (
                  <a
                    key={index}
                    href={collection}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    <LinkIcon className="mr-2" size={20} />
                    <span>Ver colección {index + 1}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
