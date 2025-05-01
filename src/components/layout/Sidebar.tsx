
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Vote, Award, ChartPie, Settings } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { t, language } = useLanguage();
  
  const isRtl = language === 'ar';
  
  const menuItems = [
    { 
      path: '/', 
      label: t('dashboard'), 
      icon: <LayoutDashboard size={20} />,
      iconRtl: <LayoutDashboard size={20} />
    },
    { 
      path: '/domains', 
      label: t('domains'), 
      icon: <FileText size={20} />,
      iconRtl: <FileText size={20} />
    },
    { 
      path: '/voting', 
      label: t('voting'), 
      icon: <Vote size={20} />,
      iconRtl: <Vote size={20} />
    },
    { 
      path: '/rewards', 
      label: t('rewards'), 
      icon: <Award size={20} />,
      iconRtl: <Award size={20} />
    },
    { 
      path: '/statistics', 
      label: t('statistics'), 
      icon: <ChartPie size={20} />,
      iconRtl: <ChartPie size={20} />
    },
    { 
      path: '/settings', 
      label: t('settings'), 
      icon: <Settings size={20} />,
      iconRtl: <Settings size={20} />
    }
  ];
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <aside className="h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-border">
      <div className="p-4 h-full flex flex-col">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              to={item.path}
              key={item.path}
              className={cn(
                "flex items-center py-2 px-3 rounded-md transition-colors",
                isActive(item.path) ? 
                  "bg-sidebar-primary text-sidebar-primary-foreground" : 
                  "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <div className={`${isRtl ? 'ml-3' : 'mr-3'}`}>
                {isRtl ? item.iconRtl : item.icon}
              </div>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="mt-auto p-4 bg-accent rounded-md">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-brand text-white flex items-center justify-center">
              JS
            </div>
            <div className={`${isRtl ? 'mr-3' : 'ml-3'}`}>
              <div className="font-medium text-sm">John Smith</div>
              <div className="text-xs text-muted-foreground">Domain Manager</div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted-foreground">{t('yourPoints')}</div>
              <div className="font-medium">620</div>
            </div>
            <div className="bg-brand text-white px-2 py-1 rounded text-xs font-medium">
              {t('manage')}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
