"use client";
import React, { useEffect, useState } from 'react';
import rarible from '../api/rarible';

interface NFTMeta {
  name: string;
  description: string;
  content?: {
    url: string;
    mimeType: string;
  }[];
}

interface NFT {
  id: string;
  meta: NFTMeta;
}

interface NFTDetailsProps {
  collectionId: string; // Change itemId to collectionId
}

const NFTDetails: React.FC<NFTDetailsProps> = ({ collectionId }) => {
  const [nftData, setNftData] = useState<NFT[]>([]); // Change type to NFT[]
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_RARIBLE_TESNET_API_KEY || '';

    // Authenticate with the Rarible API
    rarible.auth(apiKey);

    // Fetch items by collection
    const fetchItems = async () => {
      try {
        const data = await rarible.getItemsByCollection({ collectionId });
        setNftData(data.items); // Set the NFTs array
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchItems();
  }, [collectionId]);

  if (error) {
    return <div className="text-red-500">Error loading NFT data: {error}</div>;
  }

  if (nftData.length === 0) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nftData.map((nft) => {
        const imageUrl = nft.meta.content?.find(item => item.mimeType === 'image/jpeg')?.url;

        return (
          <div key={nft.id} className="max-w-xs mx-auto bg-white rounded-lg shadow-lg p-5 transition-transform transform hover:scale-105">
            <div className="mb-4">
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={nft.meta.name}
                  className="w-full h-auto rounded-lg object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{nft.meta.name}</h2>
              <p className="text-gray-700">{nft.meta.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NFTDetails;
