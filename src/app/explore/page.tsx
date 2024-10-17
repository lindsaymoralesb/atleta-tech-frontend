// src/app/explore/page.tsx
import React from 'react';
import NFTDetails from '../components/NFTDetails';

const ExplorePage = () => {
  const collectionId = 'BASE:0x7498fbc9295aaae8c886d35e850161e62e11768e';

  return (
    <div>
      <h1>Explore NFT Collection</h1>
      <NFTDetails collectionId={collectionId} /> {/* Change itemId to collectionId */}
    </div>
  );
};

export default ExplorePage;
