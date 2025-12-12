import React from 'react';
import { Bell, User, Settings } from 'lucide-react';

const Header: React.FC<{ title: string }> = ({ title }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">Enterprise Risk Management Platform</p>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg relative">
          <Bell size={20} className="text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings size={20} className="text-slate-600" />
        </button>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
          <User size={20} className="text-slate-600" />
          <span className="text-sm font-medium text-slate-700">Admin</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
