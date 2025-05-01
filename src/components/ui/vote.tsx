
import React, { useState } from 'react';
import { CheckIcon, XIcon, EyeIcon, Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from '@/context/LanguageContext';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from 'sonner';

interface VoteButtonsProps {
  proposalId: number;
  onVote: (proposalId: number, vote: boolean) => void;
  disabled?: boolean;
}

export const VoteButtons: React.FC<VoteButtonsProps> = ({ proposalId, onVote, disabled = false }) => {
  const { t } = useLanguage();
  const [isVoting, setIsVoting] = useState(false);
  
  // تحسين تجربة التصويت مع إضافة تأثير التحميل
  const handleVote = async (vote: boolean) => {
    setIsVoting(true);
    
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 500));
    
    onVote(proposalId, vote);
    setIsVoting(false);
  };
  
  return (
    <div className="flex gap-3">
      <Button 
        onClick={() => handleVote(true)} 
        variant="outline"
        className="border-green-400 hover:bg-green-50 hover:text-green-600 flex-1 transition-all duration-200"
        disabled={disabled || isVoting}
      >
        {isVoting ? <Loader className="mr-1 h-4 w-4 animate-spin" /> : <CheckIcon className="mr-1 h-4 w-4" />}
        {t('approve')}
      </Button>
      <Button 
        onClick={() => handleVote(false)} 
        variant="outline" 
        className="border-red-400 hover:bg-red-50 hover:text-red-600 flex-1 transition-all duration-200"
        disabled={disabled || isVoting}
      >
        {isVoting ? <Loader className="mr-1 h-4 w-4 animate-spin" /> : <XIcon className="mr-1 h-4 w-4" />}
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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-medium cursor-help">{totalVotes} {t('votes')}</span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('totalVotesExplanation')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Progress 
        value={forPercentage} 
        className="h-2 transition-all duration-300"
        indicatorColor={forPercentage > 50 ? 'bg-green-500' : 'bg-red-500'} 
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="text-green-600">{t('votesFor')}: {votesFor} ({totalVotes > 0 ? Math.round(forPercentage) : 0}%)</span>
        <span className="text-red-600">{t('votesAgainst')}: {votesAgainst} ({totalVotes > 0 ? Math.round(100 - forPercentage) : 0}%)</span>
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
  const [expanded, setExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-all duration-300 animate-scale-in"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
        
        <div className={`relative ${expanded ? '' : 'cursor-pointer'}`} onClick={() => setExpanded(!expanded)}>
          <p className={`text-sm text-muted-foreground mb-4 ${expanded ? '' : 'line-clamp-2'}`}>
            {description}
          </p>
          
          {!expanded && description.length > 100 && isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent flex items-end justify-center pb-1">
              <EyeIcon size={16} className="text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <VotingProgress votesFor={votesFor} votesAgainst={votesAgainst} />
          
          {isActive ? (
            <VoteButtons proposalId={id} onVote={onVote} />
          ) : (
            <div 
              className={`p-2 text-center rounded-md text-sm font-medium ${
                votesFor > votesAgainst ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}
              onClick={() => toast.info(`${t('proposalDetails')}: ${id}`)}
            >
              {t('votingResults')}: {votesFor > votesAgainst ? t('approved') : t('rejected')}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
