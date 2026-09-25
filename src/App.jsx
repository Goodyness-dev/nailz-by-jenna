import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import ServicesSection from './components/home/ServicesSection';
import AboutSection from './components/home/AboutSection';
import ClientCamGallery from './components/home/ClientCamGallery';
import AmenitiesSection from './components/home/AmenitiesSection';
import Footer from './components/layout/Footer';
import AllServicesPage from './components/services/AllServicesPage';
import CustomOrderMenu from './components/order/CustomOrderMenu';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './components/admin/AdminLogin';
import { Calendar, Sparkles } from './components/common/Icons';
import { BUSINESS_INFO } from './data/businessData';
import { authApi, getStoredToken } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'treatments' | 'order' | 'admin'
  const [orderInitialDiscipline, setOrderInitialDiscipline] = useState('gel_x');
  const [orderInitialService, setOrderInitialService] = useState(null);

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
      } else if (hash === '#/order' || hash === '#order' || hash === '#/book') {
        setCurrentPage('order');
      } else {
        setCurrentPage('home');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page, discipline = 'gel_x', service = null) => {
    setCurrentPage(page);
    setOrderInitialDiscipline(discipline);
    setOrderInitialService(service);

    if (page === 'treatments') {
      window.location.hash = '#/treatments';
    } else if (page === 'order') {
      window.location.hash = '#/order';
    } else if (page === 'admin') {
      window.location.hash = '#/admin';
    } else {
      window.history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ADMIN PORTAL
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

  // DEDICATED CUSTOM ORDER MENU PAGE
  if (currentPage === 'order') {
    return (
      <div className="min-h-screen bg-linen-50 dark:bg-obsidian text-obsidian dark:text-linen-50">
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onNavigateHome={() => handleNavigate('home')}
          onNavigateTreatments={() => handleNavigate('treatments')}
          onNavigateOrder={() => handleNavigate('order')}
        />
        <main className="pt-24 pb-16">
          <CustomOrderMenu
            initialDiscipline={orderInitialDiscipline}
            initialService={orderInitialService}
            onClose={() => handleNavigate('home')}
          />
        </main>
        <Footer 
          onNavigateTreatments={() => handleNavigate('treatments')} 
          onNavigateOrder={() => handleNavigate('order')} 
        />
      </div>
    );
  }

  // DEDICATED TREATMENT MENU CATALOG PAGE
  if (currentPage === 'treatments') {
    return (
      <div className="min-h-screen bg-linen-50 dark:bg-obsidian text-obsidian dark:text-linen-50">
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onNavigateHome={() => handleNavigate('home')}
          onNavigateTreatments={() => handleNavigate('treatments')}
          onNavigateOrder={() => handleNavigate('order')}
        />
        <main className="pt-24 pb-16">
          <AllServicesPage
            onOpenOrder={(discipline, service) => handleNavigate('order', discipline, service)}
            onBackToHome={() => handleNavigate('home')}
          />
        </main>
        <Footer 
          onNavigateTreatments={() => handleNavigate('treatments')} 
          onNavigateOrder={() => handleNavigate('order')} 
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
        onNavigateOrder={() => handleNavigate('order')}
      />

      <main id="main">
        {/* 1. Hero with Background Image & Direct Order Trigger */}
        <Hero
          onOpenOrder={(discipline) => handleNavigate('order', discipline)}
          onNavigateTreatments={() => handleNavigate('treatments')}
        />

        {/* 2. Stacking Cards for Core Pillars */}
        <ServicesSection
          onOpenOrder={(discipline) => handleNavigate('order', discipline)}
          onNavigateTreatments={() => handleNavigate('treatments')}
        />

        {/* 3. Concise Meet Jenna */}
        <AboutSection />

        {/* 4. Client Cam Polaroids */}
        <ClientCamGallery />

        {/* 5. Quick Guidelines & Hours */}
        <AmenitiesSection />
      </main>

      <Footer 
        onNavigateTreatments={() => handleNavigate('treatments')} 
        onNavigateOrder={() => handleNavigate('order')} 
      />

      {/* Direct In-App Floating CTA (NO EXTERNAL REDIRECT) */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => handleNavigate('order')}
          className="px-5 py-3 rounded-full bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 border border-white/20 active:scale-95"
        >
          <Sparkles className="w-4 h-4 text-blushGold dark:text-obsidian" />
          <span>Order Now ✦</span>
        </button>
      </div>
    </div>
  );
}
