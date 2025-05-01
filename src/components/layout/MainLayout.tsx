
import React, { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useLanguage } from '@/context/LanguageContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  
  // تطبيق تأثير التلاشي على المحتوى عند التحميل
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.add('animate-fade-in');
    }
    
    // تحسين تجربة التحميل الأولي
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // تأثير انتقالي عند تغيير اللغة
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent && !isLoading) {
      // إعادة تطبيق تأثير التلاشي عند تغيير اللغة
      mainContent.classList.remove('animate-fade-in');
      void mainContent.offsetWidth; // Trigger reflow
      mainContent.classList.add('animate-fade-in');
    }
  }, [language, isLoading]);
  
  return (
    <div className={`min-h-screen bg-background transition-all duration-500 ${language === 'ar' ? 'font-arabic rtl' : 'font-sans ltr'}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main 
          id="main-content" 
          className={`flex-1 p-6 overflow-auto transition-all duration-300 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
