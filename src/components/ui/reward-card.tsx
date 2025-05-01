
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/context/LanguageContext';
import { Reward } from '@/context/MockDataContext';

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  claimed: boolean;
  onClaim: (id: number) => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, userPoints, claimed, onClaim }) => {
  const { t } = useLanguage();
  const canClaim = userPoints >= reward.pointsCost && !claimed;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{reward.name}</CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 pb-3">
        {/* Reward image */}
        <div className="h-32 bg-muted rounded-md flex items-center justify-center overflow-hidden">
          <img 
            src={reward.imageSrc} 
            alt={reward.name} 
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground">{reward.description}</p>
        
        {/* Point cost */}
        <div className="flex justify-between items-center">
          <span className="text-sm">{t('pointsCost')}</span>
          <span className="font-semibold">{reward.pointsCost}</span>
        </div>
      </CardContent>
      
      <CardFooter>
        {claimed ? (
          <Button variant="secondary" className="w-full" disabled>
            {t('claimed')}
          </Button>
        ) : (
          <Button 
            onClick={() => onClaim(reward.id)} 
            disabled={!canClaim}
            className="w-full"
          >
            {t('claim')}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default RewardCard;
