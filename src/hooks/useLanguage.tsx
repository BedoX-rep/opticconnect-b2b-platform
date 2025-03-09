
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Define translations for both languages
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.name': 'Optical Shop',
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.distributors': 'Distributors',
    'nav.profile': 'Profile',
    'nav.manageProducts': 'Manage Products',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Product related
    'product.price': 'Price',
    'product.quantity': 'Quantity',
    'product.minQuantity': 'Min Quantity',
    'product.category': 'Category',
    'product.addToCart': 'Add to Cart',
    'product.details': 'Details',
    'product.distributor': 'Distributor',
    
    // Action buttons
    'action.save': 'Save',
    'action.cancel': 'Cancel',
    'action.delete': 'Delete',
    'action.edit': 'Edit',
    'action.create': 'Create',
    'action.add': 'Add',
    'action.remove': 'Remove',
    'action.search': 'Search',
    'action.filter': 'Filter',
    'action.sort': 'Sort',
    
    // Categories
    'category.frames': 'Frames',
    'category.sunglasses': 'Sunglasses',
    'category.lenses': 'Lenses',
    'category.contactLenses': 'Contact Lenses',
    'category.accessories': 'Accessories',
    'category.cleaningProducts': 'Cleaning Products',
    'category.cases': 'Cases',
    'category.other': 'Other',
  },
  ar: {
    // Common
    'app.name': 'متجر النظارات',
    'nav.home': 'الرئيسية',
    'nav.products': 'المنتجات',
    'nav.distributors': 'الموزعين',
    'nav.profile': 'الملف الشخصي',
    'nav.manageProducts': 'إدارة المنتجات',
    'nav.login': 'تسجيل الدخول',
    'nav.logout': 'تسجيل الخروج',
    
    // Product related
    'product.price': 'السعر',
    'product.quantity': 'الكمية',
    'product.minQuantity': 'الحد الأدنى للكمية',
    'product.category': 'الفئة',
    'product.addToCart': 'أضف إلى السلة',
    'product.details': 'التفاصيل',
    'product.distributor': 'الموزع',
    
    // Action buttons
    'action.save': 'حفظ',
    'action.cancel': 'إلغاء',
    'action.delete': 'حذف',
    'action.edit': 'تعديل',
    'action.create': 'إنشاء',
    'action.add': 'إضافة',
    'action.remove': 'إزالة',
    'action.search': 'بحث',
    'action.filter': 'تصفية',
    'action.sort': 'ترتيب',
    
    // Categories
    'category.frames': 'إطارات',
    'category.sunglasses': 'نظارات شمسية',
    'category.lenses': 'عدسات',
    'category.contactLenses': 'عدسات لاصقة',
    'category.accessories': 'إكسسوارات',
    'category.cleaningProducts': 'منتجات تنظيف',
    'category.cases': 'حافظات',
    'category.other': 'أخرى',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Default to browser language or English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.startsWith('ar') ? 'ar' : 'en';
    return savedLanguage || browserLanguage || 'en';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set the document dir attribute for RTL/LTR
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    // Optionally set a language-specific class for additional styling
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
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
