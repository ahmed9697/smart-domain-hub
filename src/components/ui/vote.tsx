
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
        className="border-green-400 hover:bg-green-50 hover:text-green-600 flex-1 transition-all duration-200"
        disabled={disabled}
      >
        <CheckIcon className="mr-1 h-4 w-4" />
        {t('approve')}
      </Button>
      <Button 
        onClick={() => onVote(proposalId, false)} 
        variant="outline" 
        className="border-red-400 hover:bg-red-50 hover:text-red-600 flex-1 transition-all duration-200"
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
        <span className="font-medium">{totalVotes} {t('votes')}</span>
      </div>
      <Progress value={forPercentage} className="h-2 transition-all duration-300" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="text-green-600">{t('votesFor')}: {votesFor}</span>
        <span className="text-red-600">{t('votesAgainst')}: {votesAgainst}</span>
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
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 animate-scale-in">
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          {isActive ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              {t('active')}
            </span>
          ) : (
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
              {t('completed')}
            </span>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="space-y-4">
          <VotingProgress votesFor={votesFor} votesAgainst={votesAgainst} />
          
          {isActive ? (
            <VoteButtons proposalId={id} onVote={onVote} />
          ) : (
            <div className={`p-2 text-center rounded-md text-sm font-medium ${votesFor > votesAgainst ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {t('votingResults')}: {votesFor > votesAgainst ? t('approved') : t('rejected')}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
