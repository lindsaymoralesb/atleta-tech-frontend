// src/app/explore/page.tsx
import React from 'react';
import NFTDetails from '../components/NFTDetails';

const ExplorePage = () => {
  const itemId = encodeURIComponent('BASE:0x7498fbc9295aaae8c886d35e850161e62e11768e:12219646659775029594187333627619021537149132694951852072563120863957787607042');

  return (
    <div>
      <h1>Explore NFT</h1>
      <NFTDetails itemId={itemId} />
    </div>
  );
};

export default ExplorePage;
