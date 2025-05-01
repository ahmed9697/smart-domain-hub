
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMockData } from '@/context/MockDataContext';
import DomainCard from '@/components/ui/domain-card';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { PlusCircle, Search } from 'lucide-react';

const DomainsPage: React.FC = () => {
  const { t } = useLanguage();
  const { domains, addDomain, deleteDomain } = useMockData();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Form state
  const [newDomain, setNewDomain] = useState({
    name: '',
    description: '',
    maxStage: 5,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });
  
  // Filter domains based on search query
  const filteredDomains = domains.filter(domain => 
    domain.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    domain.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handlers
  const handleViewDomain = (id: string) => {
    // Navigate to domain details
    toast.info(`Viewing domain ${id}`);
  };
  
  const handleEditDomain = (id: string) => {
    // Navigate to edit page
    toast.info(`Editing domain ${id}`);
  };
  
  const handleDeleteDomain = (id: string) => {
    toast.info(t('confirmDelete'), {
      action: {
        label: t('confirm'),
        onClick: () => {
          deleteDomain(id);
          toast.success(t('successDeleted'));
        },
      },
    });
  };
  
  const handleCreateDomain = () => {
    addDomain({
      ...newDomain,
      currentStage: 1,
      isActive: true,
      manager: '0xuser123'
    });
    setIsCreateModalOpen(false);
    setNewDomain({
      name: '',
      description: '',
      maxStage: 5,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });
    toast.success(t('successCreated'));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('domains')}</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <PlusCircle size={16} className="mr-2" />
          {t('createDomain')}
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
      
      {/* Domains grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDomains.map((domain) => (
          <DomainCard
            key={domain.id}
            domain={domain}
            onView={handleViewDomain}
            onEdit={handleEditDomain}
            onDelete={handleDeleteDomain}
          />
        ))}
      </div>
      
      {/* Create Domain Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('createDomain')}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('domainName')}</Label>
              <Input 
                id="name" 
                value={newDomain.name}
                onChange={(e) => setNewDomain({...newDomain, name: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">{t('domainDescription')}</Label>
              <Input 
                id="description" 
                value={newDomain.description}
                onChange={(e) => setNewDomain({...newDomain, description: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maxStage">{t('maxStage')}</Label>
              <Input 
                id="maxStage" 
                type="number"
                min="1"
                max="10"
                value={newDomain.maxStage}
                onChange={(e) => setNewDomain({...newDomain, maxStage: parseInt(e.target.value)})}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              {t('cancel')}
            </Button>
            <Button onClick={handleCreateDomain}>{t('createDomain')}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainsPage;
