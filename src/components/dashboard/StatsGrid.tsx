
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/context/LanguageContext';
import { Domain } from '@/context/MockDataContext';

interface StatsGridProps {
  domains: Domain[];
}

const StatsGrid: React.FC<StatsGridProps> = ({ domains }) => {
  const { t } = useLanguage();
  
  // Calculate statistics
  const activeDomains = domains.filter(d => d.isActive).length;
  const totalStages = domains.reduce((sum, domain) => sum + domain.currentStage, 0);
  
  const stats = [
    {
      title: t('domains'),
      value: domains.length,
      change: "+2",
      changeType: "increase"
    },
    {
      title: t('active'),
      value: activeDomains,
      change: "+1",
      changeType: "increase"
    },
    {
      title: t('stage'),
      value: totalStages,
      change: "+3",
      changeType: "increase"
    },
    {
      title: t('proposals'),
      value: 5,
      change: "-1",
      changeType: "decrease"
    }
  ];
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs ${stat.changeType === 'increase' ? 'text-green-500' : 'text-red-500'} flex items-center mt-1`}>
              {stat.change}
              <span className="ml-1">{t('fromLastMonth')}</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsGrid;
