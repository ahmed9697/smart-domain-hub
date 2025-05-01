
import React from 'react';
import { CheckIcon, XIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from '@/context/LanguageContext';

interface VoteButtonsProps {
  proposalId: number;
  onVote: (proposalId: number, vote: boolean) => void;
  disabled?: boolean;
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({ proposalId, onVote, disabled = false }) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex gap-3">
      <Button 
        onClick={() => onVote(proposalId, true)} 
        variant="outline"
        className="border-green-400 hover:bg-green-50 hover:text-green-600 flex-1"
        disabled={disabled}
      >
        <CheckIcon className="mr-1 h-4 w-4" />
        {t('approve')}
      </Button>
      <Button 
        onClick={() => onVote(proposalId, false)} 
        variant="outline" 
        className="border-red-400 hover:bg-red-50 hover:text-red-600 flex-1"
        disabled={disabled}
      >
        <XIcon className="mr-1 h-4 w-4" />
        {t('reject')}
      </Button>
    </div>
  );
};

interface VotingProgressProps {
  votesFor: number;
  votesAgainst: number;
}

export const VotingProgress: React.FC<VotingProgressProps> = ({ votesFor, votesAgainst }) => {
  const { t } = useLanguage();
  const totalVotes = votesFor + votesAgainst;
  const forPercentage = totalVotes > 0 ? (votesFor / totalVotes) * 100 : 0;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{t('votingProgress')}</span>
        <span>{totalVotes} votes</span>
      </div>
      <Progress value={forPercentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{t('votesFor')}: {votesFor}</span>
        <span>{t('votesAgainst')}: {votesAgainst}</span>
      </div>
    </div>
  );
};

interface ProposalCardProps {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  isActive: boolean;
  onVote: (proposalId: number, vote: boolean) => void;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({ 
  id, title, description, votesFor, votesAgainst, isActive, onVote 
}) => {
  const { t } = useLanguage();
  
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="space-y-4">
          <VotingProgress votesFor={votesFor} votesAgainst={votesAgainst} />
          
          {isActive ? (
            <VoteButtons proposalId={id} onVote={onVote} />
          ) : (
            <div className="bg-muted p-2 text-center rounded-md text-sm">
              {t('votingResults')}: {votesFor > votesAgainst ? t('approve') : t('reject')}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
