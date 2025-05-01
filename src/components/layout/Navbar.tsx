
import React, { useState } from 'react';
import { Bell, Settings, Sun, Moon, Languages } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <nav className="bg-background border-b border-border py-4 px-6 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo and App Title */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-brand flex items-center justify-center text-white font-bold mr-3">
            SC
          </div>
          <h1 className="text-xl font-semibold text-foreground">{t('appName')}</h1>
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="hover:bg-accent"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Languages size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                <span className={language === 'en' ? 'font-bold' : ''}>English</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('ar')}>
                <span className={language === 'ar' ? 'font-bold' : ''}>العربية</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4">
                <h3 className="font-medium text-sm">{t('notifications')}</h3>
                <div className="mt-2 space-y-2">
                  <div className="p-2 hover:bg-accent rounded-md">
                    <p className="text-sm font-medium">New proposal created</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                  <div className="p-2 hover:bg-accent rounded-md">
                    <p className="text-sm font-medium">Your reward was claimed</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Settings size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>{t('accountSettings')}</DropdownMenuItem>
              <DropdownMenuItem>{t('securitySettings')}</DropdownMenuItem>
              <DropdownMenuItem>{t('notificationSettings')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Profile */}
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-brand-light text-white flex items-center justify-center">
              JS
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
