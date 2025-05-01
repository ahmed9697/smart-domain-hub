
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useMockData } from '@/context/MockDataContext';
import StatsGrid from '@/components/dashboard/StatsGrid';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import QuickActions from '@/components/dashboard/QuickActions';
import DomainCard from '@/components/ui/domain-card';
import { ProposalCard } from '@/components/ui/vote';
import { toast } from 'sonner';

const Dashboard: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { 
    domains, 
    proposals, 
    activities,
    voteOnProposal
  } = useMockData();
  
  // Get active domains and proposals
  const activeDomains = domains.filter(d => d.isActive).slice(0, 2);
  const activeProposals = proposals.filter(p => p.isActive).slice(0, 2);
  
  // Handlers
  const handleCreateDomain = () => {
    navigate('/domains/create');
  };
  
  const handleCreateProposal = () => {
    navigate('/voting/create');
  };
  
  const handleCreateReward = () => {
    navigate('/rewards/create');
  };
  
  const handleViewDomain = (id: string) => {
    navigate(`/domains/${id}`);
  };
  
  const handleEditDomain = (id: string) => {
    navigate(`/domains/edit/${id}`);
  };
  
  const handleDeleteDomain = (id: string) => {
    toast.info(t('confirmDelete'), {
      action: {
        label: t('confirm'),
        onClick: () => {
          // Would normally call a delete function here
          toast.success(t('successDeleted'));
        },
      },
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{t('dashboard')}</h1>
        <p className="text-muted-foreground">{t('welcome')}</p>
      </div>
      
      {/* Stats Grid */}
      <StatsGrid domains={domains} />
      
      {/* Main Content - 2 column layout on larger screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Domains */}
          <div>
            <h2 className="text-xl font-semibold mb-4">{t('domains')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeDomains.map((domain) => (
                <DomainCard 
                  key={domain.id}
                  domain={domain}
                  onView={handleViewDomain}
                  onEdit={handleEditDomain}
                  onDelete={handleDeleteDomain}
                />
              ))}
            </div>
          </div>
          
          {/* Active Proposals */}
          <div>
            <h2 className="text-xl font-semibold mb-4">{t('activeProposals')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProposals.map((proposal) => (
                <ProposalCard 
                  key={proposal.id}
                  id={proposal.id}
                  title={proposal.title}
                  description={proposal.description}
                  votesFor={proposal.votesFor}
                  votesAgainst={proposal.votesAgainst}
                  isActive={proposal.isActive}
                  onVote={voteOnProposal}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions 
            onCreateDomain={handleCreateDomain}
            onCreateProposal={handleCreateProposal}
            onCreateReward={handleCreateReward}
          />
          
          {/* Activity Feed */}
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
