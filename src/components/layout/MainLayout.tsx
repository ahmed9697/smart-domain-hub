
import React, { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLanguage } from '@/context/LanguageContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  
  // تطبيق تأثير التلاشي على المحتوى عند التحميل
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.add('animate-fade-in');
    }
  }, []);
  
  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'font-arabic rtl' : 'font-sans ltr'}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main id="main-content" className="flex-1 p-6 overflow-auto transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
