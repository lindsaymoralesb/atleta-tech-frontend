"use client";

import React from 'react';
import NFTDetails from '../components/NFTDetails';


const ExplorePage = () => {
  const collectionId = '';
  const collectionIds = [
    'BASE:0x7498fbc9295aaae8c886d35e850161e62e11768e',
    'BASE:0x35d9074491019012ee486c11d9c5fd51ffa21700', 
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001838] to-[#bcc6e9] flex flex-col">
      <NFTDetails collectionIds={collectionIds} /> 
    </div>
  );
};

export default ExplorePage;
