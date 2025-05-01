
import React, { useState, useEffect } from 'react';
import { Bell, Settings, Sun, Moon, Languages, Search } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  // مركز الإشعارات المحسن
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New proposal created', time: '2 minutes ago', read: false },
    { id: 2, title: 'Your reward was claimed', time: '1 hour ago', read: false },
    { id: 3, title: 'Domain updated', time: '3 hours ago', read: true },
  ]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // إضافة تأثير الظهور التدريجي للبحث
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };
  
  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery) {
      // يمكننا إضافة وظيفة بحث حقيقية هنا
      console.log('Searching for:', searchQuery);
      toast.success(t('searchStarted') + ': ' + searchQuery);
      setSearchQuery('');
      setShowSearch(false);
    }
  };
  
  // قراءة الإشعارات
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
    toast.info(t('notificationRead'));
  };
  
  // قراءة كل الإشعارات
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
    toast.success(t('allNotificationsRead'));
  };
  
  return (
    <nav className={`bg-background border-b border-border py-4 px-6 sticky top-0 z-50 ${theme === 'dark' ? 'shadow-md' : ''}`}>
      <div className="flex justify-between items-center">
        {/* Logo and App Title */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-brand flex items-center justify-center text-white font-bold mr-3 animate-pulse">
            SC
          </div>
          <h1 className="text-xl font-semibold text-foreground">{t('appName')}</h1>
        </div>
        
        {/* Search Bar */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${showSearch ? 'w-1/3 opacity-100' : 'w-0 opacity-0'}`}>
          {showSearch && (
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                id="search-input"
                className="pl-10 pr-4 py-1 h-9"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
              />
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSearch} 
            className="hover:bg-accent relative"
          >
            <Search size={20} />
            <span className="sr-only">{t('search')}</span>
          </Button>

          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="hover:bg-accent transition-colors duration-300"
          >
            {theme === 'light' ? 
              <Sun size={20} className="transition-transform duration-500 hover:rotate-45" /> : 
              <Moon size={20} className="transition-transform duration-500 hover:rotate-12" />
            }
            <span className="sr-only">{t('toggleTheme')}</span>
          </Button>
          
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Languages size={20} className="transition-transform duration-300 hover:rotate-180" />
                <span className="sr-only">{t('changeLanguage')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-scale-in">
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
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
                <span className="sr-only">{t('notifications')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 animate-scale-in">
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm">{t('notifications')}</h3>
                  {unreadCount > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs h-auto py-1"
                    >
                      {t('markAllAsRead')}
                    </Button>
                  )}
                </div>
                
                <div className="mt-2 space-y-2 max-h-64 overflow-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`p-2 hover:bg-accent rounded-md cursor-pointer transition-colors ${
                          !notification.read ? 'border-l-2 border-primary' : ''
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">{t('noNotifications')}</p>
                    </div>
                  )}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <Settings size={20} className="transition-transform duration-500 hover:rotate-90" />
                <span className="sr-only">{t('settings')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-scale-in">
              <DropdownMenuItem>{t('accountSettings')}</DropdownMenuItem>
              <DropdownMenuItem>{t('securitySettings')}</DropdownMenuItem>
              <DropdownMenuItem>{t('notificationSettings')}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Profile */}
          <div className="flex items-center">
            <div 
              className="h-8 w-8 rounded-full bg-brand-light text-white flex items-center justify-center cursor-pointer hover:bg-brand transition-colors hover:scale-110 duration-300"
              onClick={() => toast.success(t('profileAction'))}
            >
              JS
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
