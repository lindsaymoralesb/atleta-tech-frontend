"use client";

import React, { useEffect, useState } from "react";
import rarible from "../api/rarible";
import extractAddressFromUrl from "../utils/addressExtractor";
import NFTCard from "./NFTCard";

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

export interface NFT {
  id: string;
  meta: NFTMeta;
  bestSellOrder?: NFTBestSellOrder;
  collectionUrl: string;
}

interface NFTDetailsProps {
  collectionUrls: string[];
}

const NFTDetails: React.FC<NFTDetailsProps> = ({ collectionUrls }) => {
  const [nftData, setNftData] = useState<NFT[]>([]);
  const [filteredNftData, setFilteredNftData] = useState<NFT[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hoveredNft, setHoveredNft] = useState<string>("");
  const [collectionContractAddresses, setCollectionContractAddresses] =
    useState<Array<{ address: string; collectionUrl: string }>>([]);

  useEffect(() => {
    // Authenticate with the Rarible API
    rarible.auth(process.env.NEXT_PUBLIC_RARIBLE_TESNET_API_KEY ?? "");
  }, []);

  useEffect(() => {
    const extractContractAddresses = async () => {
      try {
        let addressObjects = collectionUrls.map((collectionUrl) => {
          const address = extractAddressFromUrl(collectionUrl);
          let addressValue = "";
          if (address) {
            addressValue = `BASE:${address}`;
          }
          return {
            address: addressValue,
            collectionUrl: collectionUrl,
          };
        });
        addressObjects = addressObjects.filter(
          (obj): obj is { address: string; collectionUrl: string } =>
            obj !== null && obj.address !== ""
        );
        setCollectionContractAddresses(addressObjects);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    extractContractAddresses();
  }, [collectionUrls]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (collectionContractAddresses.length > 0) {
          // Fetch items for all collections
          const fetchPromises = collectionContractAddresses.map(
            ({ address, collectionUrl }) =>
              rarible
                .getItemsByCollection({ collectionId: address })
                .then((data) => ({
                  items: data.items,
                  collectionUrl,
                }))
          );

          const results = await Promise.all(fetchPromises);

          // Combine all fetched NFTs into one array, adding collectionUrl to each NFT
          const allNfts = results.flatMap(({ items, collectionUrl }) =>
            items.map((item: any) => ({
              ...item,
              collectionUrl,
            }))
          );

          setNftData(allNfts); // Set the NFTs array
          setFilteredNftData(allNfts); // Initialize filtered NFTs with all NFTs
        }
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchItems();
  }, [collectionContractAddresses]);

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {filteredNftData.map((nft) => {
        return (
          <NFTCard key={nft.id} nft={nft} collectionUrl={nft.collectionUrl} />
        );
      })}
    </div>
  );
};

export default NFTDetails;
