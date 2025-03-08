
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Distributors', path: '/distributors' },
    { name: 'Products', path: '/products' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 md:px-10 py-4',
        isScrolled
          ? 'glass shadow-sm border-b border-gray-200/20'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center text-2xl font-semibold tracking-tight"
          >
            OpticConnect
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  'py-2 text-sm font-medium transition-colors hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full',
                  location.pathname === link.path
                    ? 'text-primary after:w-full'
                    : 'text-muted-foreground'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search and Mobile Menu Buttons */}
          <div className="flex items-center">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <div className="ml-4 md:hidden">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        <div
          className={cn(
            'absolute top-full left-0 w-full p-4 glass border-t border-gray-200/20 shadow-sm transition-all duration-300 overflow-hidden',
            isSearchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for distributors, products..."
              className="w-full px-4 py-3 border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/80"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out md:hidden',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex flex-col h-full pt-20 px-6 overflow-y-auto">
            <div className="space-y-6 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    'block py-3 text-lg font-medium transition-colors',
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
