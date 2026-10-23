import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { PortfolioView } from './components/views/PortfolioView';
import { ServicesView } from './components/views/ServicesView';
import { CommunityView } from './components/views/CommunityView';
import { LabView } from './components/views/LabView';
import { LearnView } from './components/views/LearnView';
import { AboutBrandView } from './components/views/AboutBrandView';
import { ReviewsReportsView } from './components/views/ReviewsReportsView';
import { AdminView } from './components/views/AdminView';
import { QuoteModal } from './components/modals/QuoteModal';
import { BrandGuideModal } from './components/modals/BrandGuideModal';
import { PolicyModal } from './components/modals/PolicyModal';
import { AuthProfileModal } from './components/modals/AuthProfileModal';

const AppContent: React.FC = () => {
  const { currentView, isQuoteModalOpen, setIsQuoteModalOpen } = useApp();

  const renderActiveView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'services':
        return <ServicesView />;
      case 'community':
        return <CommunityView />;
      case 'lab':
        return <LabView />;
      case 'learn':
        return <LearnView />;
      case 'about':
        return <AboutBrandView />;
      case 'reviews':
        return <ReviewsReportsView />;
      case 'admin':
        return <AdminView />;
      case 'contact':
        return <ServicesView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-violet-600/40 selection:text-white">
      {/* Top Bar */}
      <Navbar />

      {/* Main View Container */}
      <main className="flex-1 w-full">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      {isQuoteModalOpen && (
        <QuoteModal onClose={() => setIsQuoteModalOpen(false)} />
      )}
      <BrandGuideModal />
      <PolicyModal />
      <AuthProfileModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
