
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Types for our data models
export interface Domain {
  id: string;
  name: string;
  description: string;
  maxStage: number;
  currentStage: number;
  startTime: string;
  endTime: string;
  isActive: boolean;
  manager: string;
}

export interface Proposal {
  id: number;
  domainId: string;
  title: string;
  description: string;
  votingPeriod: number;
  startTime: string;
  endTime: string;
  votesFor: number;
  votesAgainst: number;
  isActive: boolean;
}

export interface Reward {
  id: number;
  name: string;
  pointsCost: number;
  description: string;
  imageSrc: string;
}

export interface UserReward {
  id: number;
  userId: string;
  rewardId: number;
  claimDate: string;
}

export interface Activity {
  id: number;
  type: 'domain' | 'proposal' | 'vote' | 'reward';
  action: string;
  timestamp: string;
  details: string;
}

interface User {
  id: string;
  name: string;
  points: number;
  role: 'admin' | 'manager' | 'user';
}

interface MockDataContextType {
  domains: Domain[];
  proposals: Proposal[];
  rewards: Reward[];
  userRewards: UserReward[];
  activities: Activity[];
  currentUser: User;
  addDomain: (domain: Omit<Domain, 'id'>) => void;
  updateDomain: (id: string, domain: Partial<Domain>) => void;
  deleteDomain: (id: string) => void;
  addProposal: (proposal: Omit<Proposal, 'id'>) => void;
  voteOnProposal: (proposalId: number, vote: boolean) => void;
  addReward: (reward: Omit<Reward, 'id'>) => void;
  claimReward: (rewardId: number) => void;
}

interface MockDataProviderProps {
  children: ReactNode;
}

// Create the context
const MockDataContext = createContext<MockDataContextType | undefined>(undefined);

// Sample mock data
const mockDomains: Domain[] = [
  {
    id: '0x1234567890',
    name: 'Healthcare System',
    description: 'Management of healthcare facilities and patient records',
    maxStage: 5,
    currentStage: 3,
    startTime: '2023-01-01T00:00:00Z',
    endTime: '2023-12-31T23:59:59Z',
    isActive: true,
    manager: '0xabc123'
  },
  {
    id: '0x2345678901',
    name: 'Education Platform',
    description: 'Online learning and course management system',
    maxStage: 4,
    currentStage: 2,
    startTime: '2023-03-15T00:00:00Z',
    endTime: '2024-03-14T23:59:59Z',
    isActive: true,
    manager: '0xabc123'
  },
  {
    id: '0x3456789012',
    name: 'Community Governance',
    description: 'Decentralized community decision making',
    maxStage: 3,
    currentStage: 1,
    startTime: '2023-06-01T00:00:00Z',
    endTime: '2023-11-30T23:59:59Z',
    isActive: false,
    manager: '0xdef456'
  }
];

const mockProposals: Proposal[] = [
  {
    id: 1,
    domainId: '0x1234567890',
    title: 'Implement Electronic Health Records',
    description: 'Proposal to integrate blockchain-based electronic health records across all facilities',
    votingPeriod: 14,
    startTime: '2023-06-01T00:00:00Z',
    endTime: '2023-06-15T23:59:59Z',
    votesFor: 24,
    votesAgainst: 8,
    isActive: true
  },
  {
    id: 2,
    domainId: '0x2345678901',
    title: 'New Course Certification System',
    description: 'Implement a blockchain certificate verification system for completed courses',
    votingPeriod: 7,
    startTime: '2023-07-10T00:00:00Z',
    endTime: '2023-07-17T23:59:59Z',
    votesFor: 35,
    votesAgainst: 12,
    isActive: true
  },
  {
    id: 3,
    domainId: '0x3456789012',
    title: 'Community Fund Allocation',
    description: 'Proposal for allocating community funds to local development projects',
    votingPeriod: 21,
    startTime: '2023-05-01T00:00:00Z',
    endTime: '2023-05-22T23:59:59Z',
    votesFor: 56,
    votesAgainst: 23,
    isActive: false
  }
];

const mockRewards: Reward[] = [
  {
    id: 1,
    name: 'Premium Access',
    pointsCost: 500,
    description: 'Get premium access to all platform features for 3 months',
    imageSrc: 'https://via.placeholder.com/100?text=Premium'
  },
  {
    id: 2,
    name: 'Certificate of Excellence',
    pointsCost: 300,
    description: 'Receive an official certificate recognizing your contributions',
    imageSrc: 'https://via.placeholder.com/100?text=Certificate'
  },
  {
    id: 3,
    name: 'Exclusive Workshop',
    pointsCost: 750,
    description: 'Access to an exclusive workshop with industry experts',
    imageSrc: 'https://via.placeholder.com/100?text=Workshop'
  }
];

const mockUserRewards: UserReward[] = [
  {
    id: 1,
    userId: '0xuser123',
    rewardId: 2,
    claimDate: '2023-05-15T14:30:00Z'
  }
];

const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'domain',
    action: 'create',
    timestamp: '2023-06-10T09:15:00Z',
    details: 'Created new Healthcare System domain'
  },
  {
    id: 2,
    type: 'proposal',
    action: 'create',
    timestamp: '2023-06-12T11:30:00Z',
    details: 'Created proposal: Implement Electronic Health Records'
  },
  {
    id: 3,
    type: 'vote',
    action: 'cast',
    timestamp: '2023-06-14T16:45:00Z',
    details: 'Voted on proposal: Implement Electronic Health Records'
  },
  {
    id: 4,
    type: 'reward',
    action: 'claim',
    timestamp: '2023-05-15T14:30:00Z',
    details: 'Claimed reward: Certificate of Excellence'
  }
];

const mockUser: User = {
  id: '0xuser123',
  name: 'John Smith',
  points: 620,
  role: 'manager'
};

// Provider component
export const MockDataProvider: React.FC<MockDataProviderProps> = ({ children }) => {
  const [domains, setDomains] = useState<Domain[]>(mockDomains);
  const [proposals, setProposals] = useState<Proposal[]>(mockProposals);
  const [rewards, setRewards] = useState<Reward[]>(mockRewards);
  const [userRewards, setUserRewards] = useState<UserReward[]>(mockUserRewards);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [currentUser, setCurrentUser] = useState<User>(mockUser);

  // Domain operations
  const addDomain = (domain: Omit<Domain, 'id'>) => {
    const newDomain: Domain = {
      ...domain,
      id: `0x${Math.random().toString(16).substring(2, 12)}`,
    };
    
    setDomains([...domains, newDomain]);
    
    const newActivity: Activity = {
      id: activities.length + 1,
      type: 'domain',
      action: 'create',
      timestamp: new Date().toISOString(),
      details: `Created new ${domain.name} domain`
    };
    
    setActivities([newActivity, ...activities]);
  };

  const updateDomain = (id: string, domainUpdate: Partial<Domain>) => {
    setDomains(domains.map(domain => 
      domain.id === id ? { ...domain, ...domainUpdate } : domain
    ));
    
    const newActivity: Activity = {
      id: activities.length + 1,
      type: 'domain',
      action: 'update',
      timestamp: new Date().toISOString(),
      details: `Updated domain: ${domains.find(d => d.id === id)?.name}`
    };
    
    setActivities([newActivity, ...activities]);
  };

  const deleteDomain = (id: string) => {
    const domainName = domains.find(d => d.id === id)?.name;
    
    setDomains(domains.filter(domain => domain.id !== id));
    
    const newActivity: Activity = {
      id: activities.length + 1,
      type: 'domain',
      action: 'delete',
      timestamp: new Date().toISOString(),
      details: `Deleted domain: ${domainName}`
    };
    
    setActivities([newActivity, ...activities]);
  };

  // Proposal operations
  const addProposal = (proposal: Omit<Proposal, 'id'>) => {
    const newProposal: Proposal = {
      ...proposal,
      id: proposals.length + 1,
      votesFor: 0,
      votesAgainst: 0,
      isActive: true
    };
    
    setProposals([...proposals, newProposal]);
    
    const newActivity: Activity = {
      id: activities.length + 1,
      type: 'proposal',
      action: 'create',
      timestamp: new Date().toISOString(),
      details: `Created proposal: ${proposal.title}`
    };
    
    setActivities([newActivity, ...activities]);
  };

  const voteOnProposal = (proposalId: number, vote: boolean) => {
    setProposals(proposals.map(proposal => {
      if (proposal.id === proposalId) {
        return {
          ...proposal,
          votesFor: vote ? proposal.votesFor + 1 : proposal.votesFor,
          votesAgainst: vote ? proposal.votesAgainst : proposal.votesAgainst + 1
        };
      }
      return proposal;
    }));
    
    const proposalTitle = proposals.find(p => p.id === proposalId)?.title;
    
    const newActivity: Activity = {
      id: activities.length + 1,
      type: 'vote',
      action: 'cast',
      timestamp: new Date().toISOString(),
      details: `Voted ${vote ? 'for' : 'against'} on proposal: ${proposalTitle}`
    };
    
    setActivities([newActivity, ...activities]);
  };

  // Reward operations
  const addReward = (reward: Omit<Reward, 'id'>) => {
    const newReward: Reward = {
      ...reward,
      id: rewards.length + 1,
    };
    
    setRewards([...rewards, newReward]);
  };

  const claimReward = (rewardId: number) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward) return;
    
    if (currentUser.points >= reward.pointsCost) {
      const newUserReward: UserReward = {
        id: userRewards.length + 1,
        userId: currentUser.id,
        rewardId: rewardId,
        claimDate: new Date().toISOString()
      };
      
      setUserRewards([...userRewards, newUserReward]);
      
      setCurrentUser({
        ...currentUser,
        points: currentUser.points - reward.pointsCost
      });
      
      const newActivity: Activity = {
        id: activities.length + 1,
        type: 'reward',
        action: 'claim',
        timestamp: new Date().toISOString(),
        details: `Claimed reward: ${reward.name}`
      };
      
      setActivities([newActivity, ...activities]);
    }
  };

  return (
    <MockDataContext.Provider value={{
      domains,
      proposals,
      rewards,
      userRewards,
      activities,
      currentUser,
      addDomain,
      updateDomain,
      deleteDomain,
      addProposal,
      voteOnProposal,
      addReward,
      claimReward
    }}>
      {children}
    </MockDataContext.Provider>
  );
};

// Custom hook to use the mock data context
export const useMockData = (): MockDataContextType => {
  const context = useContext(MockDataContext);
  if (context === undefined) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
