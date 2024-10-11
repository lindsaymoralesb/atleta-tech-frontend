import React from 'react';
import { Search, Bell, Home } from 'lucide-react';

const Explore = () => {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-16 bg-gray-100 flex flex-col items-center py-4 space-y-8">
        {/* todo: add actions */}
        <Home className="w-6 h-6 text-gray-600" />
        <Bell className="w-6 h-6 text-gray-600" />
        <Search className="w-6 h-6 text-gray-600" />
      </div>

      <div className="flex-1 overflow-y-auto">
        <header className="flex justify-between items-center p-4 border-b">
          <div className="w-1/3">
            <input type="text" placeholder="Search" className="w-full p-2 bg-gray-100 rounded-md" />
          </div>
          <div>
            {/* todo: replace with connect button */}
            <button className="bg-black text-white px-4 py-2 rounded-md">Iniciar sesión</button>
          </div>
        </header>

        <div className="max-w-2xl mx-auto mt-8">
          <div className="flex items-center mb-4">
            {/* todo: display nfts/athlete history */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;