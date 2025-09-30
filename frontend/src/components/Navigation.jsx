import { Link } from 'react-router-dom';
import { Bell, Search, User, Menu, LogOut, Settings } from 'lucide-react';

export default function Navigation() {
  return (
    <header className="px-6 py-4 bg-white">
      <div className="flex py-4 items-center justify-between">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="font-bold text-sm bg-blue-500 text-white p-2 rounded-sm">OW</span>
            </div>
            <span className="text-xl font-bold text-black">Oneworld Energy</span>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/dashboard">
            <button className="px-2 py-1 hover:bg-blue-500  hover:rounded-2xl hover:text-white">
              Dashboard
            </button>
          </Link>
          <Link to="/browse">
            <button className="px-2 py-1 hover:bg-blue-500  hover:rounded-2xl hover:text-white">
              Market
            </button>
          </Link>
          <Link to="/browse">
            <button className="px-2 py-1 hover:bg-blue-500  hover:rounded-2xl hover:text-white">
              Listings
            </button>
          </Link>
          <Link to="/messages">
            <button className="px-2 py-1 hover:bg-blue-500  hover:rounded-2xl hover:text-white">
              Messages
            </button>
          </Link>
          <Link to="/news">
            <button className="px-2 py-1 hover:bg-blue-500  hover:rounded-2xl hover:text-white">
              News
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
