
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, Vote, Award } from 'lucide-react';

interface QuickActionsProps {
  onCreateDomain: () => void;
  onCreateProposal: () => void;
  onCreateReward: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  onCreateDomain, onCreateProposal, onCreateReward 
}) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('quickActions')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={onCreateDomain}
          >
            <PlusCircle size={16} className="mr-2" />
            <FileText size={16} className="mr-2" />
            {t('createDomain')}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={onCreateProposal}
          >
            <PlusCircle size={16} className="mr-2" />
            <Vote size={16} className="mr-2" />
            {t('createProposal')}
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full justify-start" 
            onClick={onCreateReward}
          >
            <PlusCircle size={16} className="mr-2" />
            <Award size={16} className="mr-2" />
            {t('createReward')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
