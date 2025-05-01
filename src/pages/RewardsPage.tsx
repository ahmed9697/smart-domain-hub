
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMockData } from '@/context/MockDataContext';
import RewardCard from '@/components/ui/reward-card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { PlusCircle, Search } from 'lucide-react';

const RewardsPage: React.FC = () => {
  const { t } = useLanguage();
  const { rewards, userRewards, currentUser, addReward, claimReward } = useMockData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Form state
  const [newReward, setNewReward] = useState({
    name: '',
    pointsCost: 100,
    description: '',
    imageSrc: 'https://via.placeholder.com/100?text=New+Reward'
  });
  
  // Filter rewards based on search query
  const filteredRewards = rewards.filter(reward => 
    reward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Check if user has claimed a reward
  const isRewardClaimed = (rewardId: number) => {
    return userRewards.some(ur => ur.rewardId === rewardId);
  };
  
  // Handlers
  const handleClaimReward = (id: number) => {
    const reward = rewards.find(r => r.id === id);
    if (reward && currentUser.points >= reward.pointsCost) {
      claimReward(id);
      toast.success(`${t('successCreated')} ${reward.name}`);
    } else {
      toast.error(t('insufficientFunds'));
    }
  };
  
  const handleCreateReward = () => {
    addReward(newReward);
    setIsCreateModalOpen(false);
    setNewReward({
      name: '',
      pointsCost: 100,
      description: '',
      imageSrc: 'https://via.placeholder.com/100?text=New+Reward'
    });
    toast.success(t('successCreated'));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">{t('rewards')}</h1>
          <p className="text-muted-foreground">
            {t('yourPoints')}: <span className="font-semibold">{currentUser.points}</span>
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle size={16} className="mr-2" />
          {t('createReward')}
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
      
      {/* Rewards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredRewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            userPoints={currentUser.points}
            claimed={isRewardClaimed(reward.id)}
            onClaim={handleClaimReward}
          />
        ))}
      </div>
      
      {/* Create Reward Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('createReward')}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('rewardName')}</Label>
              <Input 
                id="name" 
                value={newReward.name}
                onChange={(e) => setNewReward({...newReward, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">{t('rewardDescription')}</Label>
              <Input 
                id="description" 
                value={newReward.description}
                onChange={(e) => setNewReward({...newReward, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="pointsCost">{t('pointsCost')}</Label>
              <Input 
                id="pointsCost" 
                type="number"
                min="1"
                value={newReward.pointsCost}
                onChange={(e) => setNewReward({...newReward, pointsCost: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleCreateReward}>{t('createReward')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RewardsPage;
