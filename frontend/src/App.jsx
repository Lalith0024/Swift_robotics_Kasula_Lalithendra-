import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NewsFeed from './components/Dashboard/NewsFeed';
import SettingsPage from './components/Settings/SettingsPage';
import OnboardingModal from './components/Onboarding/OnboardingModal';

export default function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsOnboardingOpen(false);
  };

  const handleOpenHelp = () => {
    setIsOnboardingOpen(true);
  };

  return (
    <Router>
      <Layout onHelpClick={handleOpenHelp}>
        <Routes>
          <Route path="/" element={<NewsFeed />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
      <OnboardingModal isOpen={isOnboardingOpen} onClose={handleCloseOnboarding} />
    </Router>
  );
}
