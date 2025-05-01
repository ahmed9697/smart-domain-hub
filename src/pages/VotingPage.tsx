
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMockData } from '@/context/MockDataContext';
import { ProposalCard } from '@/components/ui/vote';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { PlusCircle, Search } from 'lucide-react';

const VotingPage: React.FC = () => {
  const { t } = useLanguage();
  const { domains, proposals, addProposal, voteOnProposal } = useMockData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Form state
  const [newProposal, setNewProposal] = useState({
    domainId: '',
    title: '',
    description: '',
    votingPeriod: 7,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  });
  
  // Filter proposals based on search query and active state
  const activeProposals = proposals.filter(proposal => 
    proposal.isActive && 
    (proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const completedProposals = proposals.filter(proposal => 
    !proposal.isActive && 
    (proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Handlers
  const handleCreateProposal = () => {
    addProposal(newProposal);
    setIsCreateModalOpen(false);
    setNewProposal({
      domainId: '',
      title: '',
      description: '',
      votingPeriod: 7,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
    toast.success(t('successCreated'));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('voting')}</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle size={16} className="mr-2" />
          {t('createProposal')}
        </Button>
      </div>
      
      {/* Search and filter */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          className="pl-10"
          placeholder={t('search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Tabs for active and completed proposals */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="active" className="flex-1">
            {t('activeProposals')}
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex-1">
            {t('completedProposals')}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeProposals.map(proposal => (
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
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedProposals.map(proposal => (
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
        </TabsContent>
      </Tabs>
      
      {/* Create Proposal Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('createProposal')}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="domain">{t('domains')}</Label>
              <Select 
                value={newProposal.domainId} 
                onValueChange={(value) => setNewProposal({...newProposal, domainId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('domains')} />
                </SelectTrigger>
                <SelectContent>
                  {domains.map(domain => (
                    <SelectItem key={domain.id} value={domain.id}>
                      {domain.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">{t('proposalTitle')}</Label>
              <Input 
                id="title" 
                value={newProposal.title}
                onChange={(e) => setNewProposal({...newProposal, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">{t('proposalDescription')}</Label>
              <Input 
                id="description" 
                value={newProposal.description}
                onChange={(e) => setNewProposal({...newProposal, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="votingPeriod">{t('votingPeriod')} (days)</Label>
              <Input 
                id="votingPeriod" 
                type="number"
                min="1"
                max="30"
                value={newProposal.votingPeriod}
                onChange={(e) => setNewProposal({...newProposal, votingPeriod: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleCreateProposal}>{t('createProposal')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VotingPage;
