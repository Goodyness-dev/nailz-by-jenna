import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import ServicesSection from './components/home/ServicesSection';
import AboutSection from './components/home/AboutSection';
import ClientCamGallery from './components/home/ClientCamGallery';
import AmenitiesSection from './components/home/AmenitiesSection';
import Footer from './components/layout/Footer';
import AllServicesPage from './components/services/AllServicesPage';
import QuoteWizardModal from './components/wizard/QuoteWizardModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import { Phone, Calendar } from './components/common/Icons';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'treatments' | 'admin'
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardCategory, setWizardCategory] = useState(null);
  const [wizardService, setWizardService] = useState(null);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('nailz_theme');
      if (saved) return saved === 'dark';
      return false; // Warm minimalist linen light mode
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const token = getStoredToken();
    if (token) {
      authApi.verify()
        .then(res => {
          if (res.authenticated) {
            setIsAdminAuthenticated(true);
            setAdminUser(res.user);
          }
        })
        .catch(() => setIsAdminAuthenticated(false));
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode || currentPage === 'admin') {
      root.classList.add('dark');
      document.body.classList.add('dark');
      if (currentPage !== 'admin') localStorage.setItem('nailz_theme', 'dark');
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('nailz_theme', 'light');
    }
  }, [darkMode, currentPage]);

  const toggleDarkMode = () => setDarkMode(p => !p);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (hash === '#/treatments' || hash === '#/services' || hash === '#treatments') {
        setCurrentPage('treatments');
      } else {
        setCurrentPage('home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    if (page === 'treatments') {
      window.location.hash = '#/treatments';
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenWizard = (category = null, service = null) => {
    setWizardCategory(category);
    setWizardService(service);
    setWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setWizardOpen(false);
    setWizardCategory(null);
    setWizardService(null);
  };

  if (currentPage === 'admin') {
    return isAdminAuthenticated ? (
      <AdminLayout
        user={adminUser}
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setAdminUser(null);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    ) : (
      <AdminLogin
        onLoginSuccess={(user) => {
          setIsAdminAuthenticated(true);
          setAdminUser(user);
        }}
        onBackToSite={() => handleNavigate('home')}
      />
    );
  }

  // DEDICATED TREATMENT MENU PAGE
  if (currentPage === 'treatments') {
    return (
      <div className="min-h-screen bg-linen-50 dark:bg-obsidian text-obsidian dark:text-linen-50">
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onNavigateHome={() => handleNavigate('home')}
          onNavigateTreatments={() => handleNavigate('treatments')}
        />
        <main className="pt-24 pb-16">
          <AllServicesPage
            onOpenWizard={handleOpenWizard}
            onBackToHome={() => handleNavigate('home')}
          />
        </main>
        <Footer onNavigateTreatments={() => handleNavigate('treatments')} />
        <QuoteWizardModal
          isOpen={wizardOpen}
          onClose={handleCloseWizard}
          initialCategory={wizardCategory}
          initialService={wizardService}
        />
      </div>
    );
  }

  // MINIMALIST SHORT HOMEPAGE WITH STACKING CARDS
  return (
    <div className="min-h-screen bg-linen-50 dark:bg-obsidian text-obsidian dark:text-linen-50 selection:bg-blushGold selection:text-obsidian">
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onNavigateHome={() => handleNavigate('home')}
        onNavigateTreatments={() => handleNavigate('treatments')}
      />

      <main id="main">
        {/* 1. Hero with Background Image */}
        <Hero
          onOpenWizard={handleOpenWizard}
          onNavigateTreatments={() => handleNavigate('treatments')}
        />

        {/* 2. Stacking Cards for Core Pillars */}
        <ServicesSection
          onNavigateTreatments={() => handleNavigate('treatments')}
        />

        {/* 3. Concise Meet Jenna */}
        <AboutSection />

        {/* 4. Client Cam Polaroids */}
        <ClientCamGallery />

        {/* 5. Quick Guidelines & Hours */}
        <AmenitiesSection />
      </main>

      <Footer onNavigateTreatments={() => handleNavigate('treatments')} />

      <QuoteWizardModal
        isOpen={wizardOpen}
        onClose={handleCloseWizard}
        initialCategory={wizardCategory}
        initialService={wizardService}
      />

      {/* Minimal Mobile Floating CTA */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <a
          href={BUSINESS_INFO.acuityBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-3 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold shadow-2xl flex items-center gap-2 border border-white/20"
        >
          <Calendar className="w-4 h-4 text-blushGold dark:text-obsidian" />
          <span>Book on Acuity ↗</span>
        </a>
      </div>
    </div>
  );
}