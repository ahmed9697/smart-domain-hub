
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Activity } from '@/context/MockDataContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ActivityFeedProps {
  activities: Activity[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const { t } = useLanguage();
  
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'domain':
        return <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">D</div>;
      case 'proposal':
        return <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">P</div>;
      case 'vote':
        return <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">V</div>;
      case 'reward':
        return <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">R</div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">?</div>;
    }
  };
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('recentActivity')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              {getActivityIcon(activity.type)}
              <div className="ml-3 flex-1">
                <p className="text-sm">{activity.details}</p>
                <p className="text-xs text-muted-foreground">
                  {formatTime(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
