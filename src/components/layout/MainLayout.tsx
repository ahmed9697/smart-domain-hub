
import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLanguage } from '@/context/LanguageContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  
  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'font-arabic rtl' : 'font-sans ltr'}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
