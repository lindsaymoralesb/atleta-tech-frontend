import React, { useState } from "react";
import { NFT } from "./NFTDetails";

interface NFTCardProps {
  nft: NFT;
  collectionUrl: string;
  athleteAddress: string;
}

const NFTCard: React.FC<NFTCardProps> = ({
  nft,
  collectionUrl,
  athleteAddress,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const imageUrl = nft.meta.content?.find(
    (item: { mimeType: string; url: string }) =>
      item.mimeType === "image/jpeg" || item.mimeType === "image/png"
  )?.url;

  const price = nft.bestSellOrder?.makePrice;
  const priceUsd = nft.bestSellOrder?.makePriceUsd;

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden w-[300px] h-[400px] p-4 border perspective"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="aspect-square max-w-full rounded-lg">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={nft.meta.name}
                className="w-full h-full object-top object-cover rounded-lg"
              />
            )}
          </div>
          <div className="mt-4">
            <h3 className="text-white font-semibold truncate">
              {nft.meta.name}
            </h3>
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
        </div>

        {/* Back side */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-800 rounded-lg p-4 overflow-y-auto flex flex-col justify-between">
          <div>
            <h3 className="text-white font-semibold mb-2">{nft.meta.name}</h3>
            <div className="max-h-[185px] overflow-scroll relative">
              <p className="text-gray-300 text-sm">{nft.meta.description}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {athleteAddress !== "" && (
              <a
                href={`/athlete/view/${athleteAddress}`}
                type="button"
                className="bg-white text-blue-800 rounded-md px-6 py-2 hover:bg-blue-800 hover:text-white transition duration-300 flex justify-center"
              >
                Conocer historia
              </a>
            )}
            <a
              href={collectionUrl}
              target="_blank"
              type="button"
              className="bg-white text-blue-800 rounded-md px-6 py-2 hover:bg-blue-800 hover:text-white transition duration-300 flex justify-center"
            >
              Quiero este coleccionable
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
