"use client";

import React, { useEffect, useState } from 'react';
import rarible from '../api/rarible';
import NavbarNFT from "./NavbarNFT";

interface NFTMeta {
  name: string;
  description: string;
  content?: {
    url: string;
    mimeType: string;
  }[];
}

interface NFTBestSellOrder {
  makePrice: string;
  makePriceUsd: string;
}

interface NFT {
  id: string;
  meta: NFTMeta;
  bestSellOrder?: NFTBestSellOrder;
}

interface NFTDetailsProps {
  collectionIds: string[]; // Changed from collectionId to collectionIds
}

const NFTDetails: React.FC<NFTDetailsProps> = ({ collectionIds }) => {
  const [nftData, setNftData] = useState<NFT[]>([]);
  const [filteredNftData, setFilteredNftData] = useState<NFT[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_RARIBLE_TESNET_API_KEY || '';

    // Authenticate with the Rarible API
    rarible.auth(apiKey);

    const fetchItems = async () => {
      try {
        // Fetch items for all collections
        const fetchPromises = collectionIds.map(collectionId =>
          rarible.getItemsByCollection({ collectionId })
        );

        const results = await Promise.all(fetchPromises);

        // Combine all fetched NFTs into one array
        const allNfts = results.flatMap(data => data.items);
        setNftData(allNfts); // Set the NFTs array
        setFilteredNftData(allNfts); // Initialize filtered NFTs with all NFTs
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchItems();
  }, [collectionIds]); // Changed to listen for collectionIds

  // Handle search
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm) {
      setFilteredNftData(nftData); // Reset to all NFTs if search term is empty
    } else {
      const filteredData = nftData.filter((nft) =>
        nft.meta.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredNftData(filteredData); // Update filtered NFTs
    }
  };

  if (error) {
    return <div className="text-red-500">Error loading NFT data: {error}</div>;
  }

  if (filteredNftData.length === 0) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div>
      <NavbarNFT onSearch={handleSearch} /> {/* Pass onSearch to NavbarNFT */}

      {/* New Menu Section */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <img src="/images/atletas_img.jpg" alt=""  className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center shadow-lg"/>
        <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
          <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">ATLETA.TECH</h2>
            <p className="mt-6 text-lg leading-8 text-gray-300">Conecta con tus atletas favoritos, apoya sus sueños y sé parte de sus historias únicas a través de colecciones NFT exclusivas.</p>
          </div>
        </div>
      </div>
      {/* End of New Menu Section */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredNftData.map((nft) => {
          const imageUrl = nft.meta.content?.find(item => item.mimeType === 'image/jpeg' || item.mimeType === 'image/png')?.url;
          const price = nft.bestSellOrder?.makePrice;
          const priceUsd = nft.bestSellOrder?.makePriceUsd;

          return (
            <div key={nft.id} className="max-w-xs mx-auto bg-white rounded-lg shadow-lg p-5 flex flex-col justify-between transition-transform transform hover:scale-105 my-1">
              <div>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={nft.meta.name}
                    className="w-full h-auto rounded-lg object-cover mb-2"
                  />
                )}
                <h2 className="text-xl font-bold text-gray-900 mb-1">{nft.meta.name}</h2>
                <p className="text-gray-700">{nft.meta.description}</p>
              </div>
              {price && priceUsd && (
                <div className="bg-blue-100 p-3 mt-4 rounded-lg text-left">
                  <p className="text-blue-600 font-bold">Price: {price} ETH</p>
                  <p className="text-gray-600">~ ${parseFloat(priceUsd).toFixed(2)} USD</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NFTDetails;
