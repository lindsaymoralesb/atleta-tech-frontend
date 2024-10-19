import React, { useState } from "react";
import { NFT } from "./NFTDetails";

interface NFTCardProps {
  nft: NFT;
  collectionUrl: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, collectionUrl }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const imageUrl = nft.meta.content?.find(
    (item: { mimeType: string; url: string }) =>
      item.mimeType === "image/jpeg" || item.mimeType === "image/png"
  )?.url;
  const price = nft.bestSellOrder?.makePrice;
  const priceUsd = nft.bestSellOrder?.makePriceUsd;

  return (
    <a
      className="bg-gray-800 rounded-lg overflow-hidden max-w-fit p-4 border"
      href={collectionUrl}
      target="_blank"
    >
      <div className="aspect-square max-w-[300px] rounded-lg">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={nft.meta.name}
            className="w-full h-full object-top object-cover rounded-lg"
          />
        )}
      </div>
      <div className="mt-4">
        <h3 className="text-white font-semibold truncate">{nft.meta.name}</h3>
        {price && priceUsd ? (
          <div className="mt-2 text-sm bg-slate-600 p-1.5 rounded-md">
            <p className="text-gray-400">Price</p>
            <p className="text-white">
              {Number(price).toFixed(3)} ETH{" "}
              <span className="text-gray-400">
                ~ ${parseFloat(priceUsd).toFixed(2)} USD
              </span>
            </p>
          </div>
        ) : (
          <p className="mt-2 text-sm text-gray-400">Not for sale</p>
        )}
      </div>
    </a>
  );
};

export default NFTCard;
