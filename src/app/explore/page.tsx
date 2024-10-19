"use client";

import React from 'react';
import NFTDetails from '../components/NFTDetails';
import Navbar from '../components/Navbar';

const ExplorePage = () => {
  const collectionId = 'BASE:0x7498fbc9295aaae8c886d35e850161e62e11768e';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] flex flex-col">
      <Navbar />
      <NFTDetails collectionId={collectionId} /> {/* Change itemId to collectionId */}
    </div>
  );
};

export default ExplorePage;
