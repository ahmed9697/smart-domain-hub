
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { MockDataProvider } from '@/context/MockDataContext';
import MainLayout from "@/components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import DomainsPage from "./pages/DomainsPage";
import VotingPage from "./pages/VotingPage";
import RewardsPage from "./pages/RewardsPage";
import StatisticsPage from "./pages/StatisticsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <MockDataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                } />
                <Route path="/domains" element={
                  <MainLayout>
                    <DomainsPage />
                  </MainLayout>
                } />
                <Route path="/voting" element={
                  <MainLayout>
                    <VotingPage />
                  </MainLayout>
                } />
                <Route path="/rewards" element={
                  <MainLayout>
                    <RewardsPage />
                  </MainLayout>
                } />
                <Route path="/statistics" element={
                  <MainLayout>
                    <StatisticsPage />
                  </MainLayout>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </MockDataProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
