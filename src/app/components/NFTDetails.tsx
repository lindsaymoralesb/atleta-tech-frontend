"use client";
import React, { useEffect, useState } from 'react';
import rarible from '../api/rarible';

interface NFTData {
  meta: {
    name: string;
    description: string;
    content?: {
      url: string;
      mimeType: string;
    }[];
  };
}

interface NFTDetailsProps {
  itemId: string;
}

const NFTDetails: React.FC<NFTDetailsProps> = ({ itemId }) => {
  const [nftData, setNftData] = useState<NFTData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_RARIBLE_TESNET_API_KEY || '';

    // Authenticate with the Rarible API
    rarible.auth(apiKey);

    // Fetch item by ID
    const fetchItem = async () => {
      try {
        const data = await rarible.getItemById({ itemId });
        setNftData(data); // Assuming the data structure contains meta with name and description
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchItem();
  }, [itemId]);

  if (error) {
    return <div>Error loading NFT data: {error}</div>;
  }

  if (!nftData) {
    return <div>Loading...</div>;
  }

  // Extract image URL if available
  const imageUrl = nftData.meta.content?.find(item => item.mimeType === 'image/jpeg')?.url;

  return (
    <div>
      <h2>{nftData.meta.name}</h2>
      <p>{nftData.meta.description}</p>
      {imageUrl && <img src={imageUrl} alt={nftData.meta.name} style={{ maxWidth: '100%', height: 'auto' }} />}
    </div>
  );
};

export default NFTDetails;
