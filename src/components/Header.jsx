import { Menu, Home, Clapperboard, Phone, } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <header className="bg-plum-500 text-white py-4 shadow-md fixed top-0 left-0 w-full z-10">
            <div className="container mx-auto px-4 flex justify-between items-center">
                {/* Brand */}
                <div className="flex items-center space-x-2">
                    <Menu size={24} className="text-white sm:hidden" />
                    <h1 className="text-2xl font-bold">NayastaBioskop</h1>
                </div>

                {/* Navigation Links */}
                <nav className="hidden sm:flex space-x-8">
                    <Link
                        to="/"
                        className={`flex items-center gap-2 hover:underline transition-colors duration-300 ${location.pathname === '/' ? 'text-pink-900' : ''}`}
                    >
                        <Home size={24} />
                        <span>Home</span>
                    </Link>
                    <Link
                        to="/film"
                        className={`flex items-center gap-2 hover:underline transition-colors duration-300 ${location.pathname === '/film' ? 'text-pink-900' : ''}`}
                    >
                        <Clapperboard  size={24} />
                        <span>Film</span>
                    </Link>
                    <Link
                        to="/contact"
                        className={`flex items-center gap-2 hover:underline transition-colors duration-300 ${location.pathname === '/contact' ? 'text-pink-900' : ''}`}
                    >
                        <Phone size={24} />
                        <span>Contact</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
}
