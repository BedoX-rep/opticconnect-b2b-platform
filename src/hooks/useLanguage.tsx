
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.distributors': 'Distributors',
    'nav.profile': 'Profile',
    'nav.manageProducts': 'Manage Products',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.price': 'Price',
    'common.more': 'More',
    'common.viewAll': 'View All',
    
    // Products
    'products.featured': 'Featured Products',
    'products.popular': 'Popular Products',
    'products.new': 'New Products',
    'products.minQuantity': 'Min Quantity',
    'products.distributor': 'Distributor',
    
    // Distributors
    'distributors.featured': 'Featured Distributors',
    'distributors.all': 'All Distributors',
    'distributors.location': 'Location',
    
    // Profile
    'profile.title': 'Profile',
    'profile.settings': 'Settings',
    'profile.orders': 'Orders',
    
    // Auth
    'auth.login': 'Login',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.signup': 'Sign up',
    
    // Buttons
    'button.addToCart': 'Add to Cart',
    'button.contactSupplier': 'Contact Supplier',
    'button.viewDetails': 'View Details',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.distributors': 'الموزعون',
    'nav.profile': 'الملف الشخصي',
    'nav.manageProducts': 'إدارة المنتجات',
    'nav.login': 'تسجيل الدخول',
    'nav.logout': 'تسجيل الخروج',
    
    // Common
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.price': 'السعر',
    'common.more': 'المزيد',
    'common.viewAll': 'عرض الكل',
    
    // Products
    'products.featured': 'منتجات مميزة',
    'products.popular': 'منتجات شائعة',
    'products.new': 'منتجات جديدة',
    'products.minQuantity': 'الحد الأدنى للكمية',
    'products.distributor': 'الموزع',
    
    // Distributors
    'distributors.featured': 'موزعون مميزون',
    'distributors.all': 'جميع الموزعين',
    'distributors.location': 'الموقع',
    
    // Profile
    'profile.title': 'الملف الشخصي',
    'profile.settings': 'الإعدادات',
    'profile.orders': 'الطلبات',
    
    // Auth
    'auth.login': 'تسجيل الدخول',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.signup': 'التسجيل',
    
    // Buttons
    'button.addToCart': 'أضف إلى السلة',
    'button.contactSupplier': 'تواصل مع المورد',
    'button.viewDetails': 'عرض التفاصيل',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update document direction
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage;
  };

  useEffect(() => {
    // Set initial direction
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, []);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
