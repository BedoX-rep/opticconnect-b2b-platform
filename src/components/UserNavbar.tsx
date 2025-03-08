// This solution adds a placeholder for the LanguageSwitcher component and translation functions. A complete solution would require these components.

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { 
  User, 
  ShoppingBag, 
  LogOut, 
  LogIn, 
  ChevronDown 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/hooks/useLanguage'; // Added import
import { LanguageSwitcher } from '@/components/LanguageSwitcher'; // Added import


const UserNavbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const { t } = useLanguage(); // Added language context

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="bg-white border-b border-border shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Left section with navigation links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/"
              className={cn(
                "text-sm font-medium transition-colors", 
                isActive('/') ? "text-primary" : "text-foreground hover:text-primary"
              )}
            >
              {t('nav.home')} {/* Translated text */}
            </Link>
            <Link 
              to="/distributors"
              className={cn(
                "text-sm font-medium transition-colors", 
                isActive('/distributors') ? "text-primary" : "text-foreground hover:text-primary"
              )}
            >
              {t('nav.distributors')} {/* Translated text */}
            </Link>
            <Link 
              to="/products"
              className={cn(
                "text-sm font-medium transition-colors", 
                isActive('/products') ? "text-primary" : "text-foreground hover:text-primary"
              )}
            >
              {t('nav.products')} {/* Translated text */}
            </Link>
          </div>

          {/* Right section with auth/profile */}
          <div className="flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <span className="hidden sm:inline-block">{user.email}</span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User size={16} />
                      <span>{t('nav.profile')}</span> {/* Translated text */}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/manage-products" className="flex items-center gap-2 cursor-pointer">
                      <ShoppingBag size={16} />
                      <span>{t('nav.manageProducts')}</span> {/* Translated text */}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="flex items-center gap-2 cursor-pointer text-destructive"
                  >
                    <LogOut size={16} />
                    <span>{t('nav.logout')}</span> {/* Translated text */}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <LogIn size={16} />
                  <span>{t('nav.login')}</span> {/* Translated text */}
                </Button>
              </Link>
            )}
            <LanguageSwitcher /> {/* Added language switcher */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;