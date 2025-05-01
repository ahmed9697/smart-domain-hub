
import React from 'react';
import { Calendar, Users, BarChart } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from '@/context/LanguageContext';
import { Domain } from '@/context/MockDataContext';

interface DomainCardProps {
  domain: Domain;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const DomainCard: React.FC<DomainCardProps> = ({ domain, onView, onEdit, onDelete }) => {
  const { t } = useLanguage();
  const progress = (domain.currentStage / domain.maxStage) * 100;
  
  // Formatted dates
  const startDate = new Date(domain.startTime).toLocaleDateString();
  const endDate = new Date(domain.endTime).toLocaleDateString();
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{domain.name}</CardTitle>
          <Badge variant={domain.isActive ? "default" : "secondary"}>
            {domain.isActive ? t('active') : t('inactive')}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{domain.description}</p>
        
        <div className="space-y-4">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{t('stage')}</span>
              <span>{domain.currentStage}/{domain.maxStage}</span>
            </div>
            <Progress value={progress} />
          </div>
          
          {/* Domain stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Calendar size={16} className="mb-1" />
              <span className="text-xs">
                {startDate}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <Users size={16} className="mb-1" />
              <span className="text-xs">12</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <BarChart size={16} className="mb-1" />
              <span className="text-xs">5</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-2">
        <Button variant="secondary" size="sm" onClick={() => onView(domain.id)} className="flex-1">
          {t('view')}
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEdit(domain.id)} className="flex-1">
          {t('edit')}
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(domain.id)} className="flex-1">
          {t('delete')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DomainCard;
