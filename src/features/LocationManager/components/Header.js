import React from 'react';
import { MapPin } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-gray-900">Location Manager</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;