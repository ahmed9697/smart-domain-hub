
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useMockData } from '@/context/MockDataContext';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar } from 'recharts';

const StatisticsPage: React.FC = () => {
  const { t } = useLanguage();
  const { domains, proposals } = useMockData();
  
  // Generate domain stage data for chart
  const domainStageData = domains.map(domain => ({
    name: domain.name,
    current: domain.currentStage,
    max: domain.maxStage,
  }));
  
  // Generate voting data for chart
  const votingData = proposals.map(proposal => ({
    name: proposal.title.substring(0, 15) + (proposal.title.length > 15 ? '...' : ''),
    for: proposal.votesFor,
    against: proposal.votesAgainst,
  }));
  
  // Generate activity data for chart (mocked)
  const activityData = [
    { name: 'Jan', domains: 2, proposals: 5, votes: 12 },
    { name: 'Feb', domains: 3, proposals: 7, votes: 19 },
    { name: 'Mar', domains: 2, proposals: 8, votes: 22 },
    { name: 'Apr', domains: 4, proposals: 10, votes: 25 },
    { name: 'May', domains: 3, proposals: 12, votes: 30 },
    { name: 'Jun', domains: 5, proposals: 15, votes: 40 },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('statistics')}</h1>
        <p className="text-muted-foreground">{t('overview')}</p>
      </div>
      
      <Tabs defaultValue="domains">
        <TabsList className="w-full">
          <TabsTrigger value="domains" className="flex-1">{t('domains')}</TabsTrigger>
          <TabsTrigger value="voting" className="flex-1">{t('voting')}</TabsTrigger>
          <TabsTrigger value="activity" className="flex-1">{t('recentActivity')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="domains" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('domains')} - {t('stage')} {t('progress')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={domainStageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="current" name={t('currentStage')} fill="#8884d8" />
                    <Bar dataKey="max" name={t('maxStage')} fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="voting" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('voting')} {t('results')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={votingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="for" name={t('votesFor')} fill="#4ade80" />
                    <Bar dataKey="against" name={t('votesAgainst')} fill="#f87171" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('recentActivity')} {t('trends')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="domains" name={t('domains')} stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="proposals" name={t('proposals')} stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="votes" name={t('vote')} stroke="#ffc658" fill="#ffc658" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatisticsPage;
