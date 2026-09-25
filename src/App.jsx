import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import ServicesSection from './components/home/ServicesSection';
import AboutSection from './components/home/AboutSection';
import ClientCamGallery from './components/home/ClientCamGallery';
import AmenitiesSection from './components/home/AmenitiesSection';
import LocationHoursSection from './components/home/LocationHoursSection';
import ReviewsSection from './components/home/ReviewsSection';
import Footer from './components/layout/Footer';
import AllServicesPage from './components/services/AllServicesPage';
import QuoteWizardModal from './components/wizard/QuoteWizardModal';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import { Phone, Calendar } from './components/common/Icons';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'services' | 'admin'
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardCategory, setWizardCategory] = useState(null);
  const [wizardService, setWizardService] = useState(null);

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  // Dark Mode state
  const [darkMode, setDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('nailz_theme');
      if (saved) return saved === 'dark';
      return false; // Default to clean luxury linen light mode
    } catch {
      return false;
    }
  });

  // Check stored auth token on mount
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
        .catch(() => {
          setIsAdminAuthenticated(false);
        });
    }
  }, []);

  // Apply dark class to <html> and <body>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode || currentPage === 'admin') {
      root.classList.add('dark');
      document.body.classList.add('dark');
      if (currentPage !== 'admin') {
        localStorage.setItem('nailz_theme', 'dark');
      }
    } else {
      root.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('nailz_theme', 'light');
    }
  }, [darkMode, currentPage]);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      return next;
    });
  };

  // Sync with browser URL hash for routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/admin' || hash === '#admin') {
        setCurrentPage('admin');
      } else if (hash === '#/services' || hash === '#services-all') {
        setCurrentPage('services');
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
    if (page === 'services') {
      window.location.hash = '#/services';
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    } else {
      if (window.location.hash.startsWith('#/services') || window.location.hash.startsWith('#/admin')) {
        window.history.pushState(null, '', window.location.pathname);
      }
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

  // If on Admin route, render full-screen Admin portal
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

  // If on Full Services Page
  if (currentPage === 'services') {
    return (
      <div className="min-h-screen bg-linen-50 dark:bg-obsidian text-obsidian dark:text-linen-50 transition-colors">
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onOpenWizard={handleOpenWizard}
        />
        <main className="pt-24">
          <AllServicesPage
            onOpenWizard={handleOpenWizard}
            onBackToHome={() => handleNavigate('home')}
          />
        </main>
        <Footer />
        <QuoteWizardModal
          isOpen={wizardOpen}
          onClose={handleCloseWizard}
          initialCategory={wizardCategory}
          initialService={wizardService}
        />
      </div>
    );
  }

  // Main Homepage
  return (
    <div className="min-h-screen bg-linen-50 dark:bg-obsidian text-obsidian dark:text-linen-50 transition-colors selection:bg-blushGold selection:text-obsidian">
      {/* Sticky Top Navbar */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenWizard={handleOpenWizard}
      />

      {/* Main Content */}
      <main id="main">
        <Hero onOpenWizard={handleOpenWizard} />
        <ServicesSection onOpenWizard={handleOpenWizard} />
        <AboutSection />
        <ClientCamGallery />
        <AmenitiesSection />
        <ReviewsSection />
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Beauty Quote & Consult Modal */}
      <QuoteWizardModal
        isOpen={wizardOpen}
        onClose={handleCloseWizard}
        initialCategory={wizardCategory}
        initialService={wizardService}
      />

      {/* Mobile Sticky Floating CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-linen-50/95 dark:bg-obsidian/95 backdrop-blur-md border-t border-linen-300 dark:border-obsidian-border p-3 flex items-center gap-3">
        <a
          href={"tel:" + BUSINESS_INFO.phoneRaw}
          className="flex-1 py-3 px-3 rounded-xl border border-linen-300 dark:border-obsidian-border text-obsidian dark:text-linen-100 text-xs font-semibold text-center flex items-center justify-center gap-1.5"
        >
          <Phone className="w-4 h-4 text-blushGold" />
          <span>Call Studio</span>
        </a>
        <a
          href={BUSINESS_INFO.acuityBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[1.5] py-3 px-3 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold text-center shadow-lg flex items-center justify-center gap-1.5"
        >
          <Calendar className="w-4 h-4 text-blushGold dark:text-obsidian" />
          <span>Book on Acuity ↗</span>
        </a>
      </div>
    </div>
  );
}