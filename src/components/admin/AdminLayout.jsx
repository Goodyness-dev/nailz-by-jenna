import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ClipboardList, MessageSquare, 
  Settings, LogOut, ExternalLink, Search, 
  Bell, Mail, Heart, Menu, X, Plus, Calendar, ShieldCheck, Sparkles, Gem
} from '../common/Icons';
import DashboardOverview from './DashboardOverview';
import OrdersView from './OrdersView';
import InboxView from './InboxView';
import AdminSettings from './AdminSettings';
import QuoteDetailModal from './QuoteDetailModal';
import NewOrderModal from './NewOrderModal';
import { authApi } from '../../services/api';
import { salonStore } from '../../services/salonStore';
import { BUSINESS_INFO } from '../../data/businessData';

export default function AdminLayout({ user, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'orders' | 'inbox' | 'settings'
  const [modalQuote, setModalQuote] = useState(null);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [stats, setStats] = useState(() => salonStore.getStats());

  const refreshStats = () => {
    setStats(salonStore.getStats());
  };

  useEffect(() => {
    refreshStats();
    const interval = setInterval(refreshStats, 8000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleLogout = async () => {
    await authApi.logout();
    onLogout();
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Appointments & Orders', icon: ClipboardList, badge: stats.pending > 0 ? stats.pending : null },
    { id: 'inbox', label: 'Client Inspo Inbox', icon: MessageSquare, badge: 1 },
    { id: 'settings', label: 'Studio Policies & Hours', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#fcfaf7] dark:bg-obsidian-pure text-obsidian dark:text-linen-50 font-sans flex antialiased">
      {/* Backdrop for mobile drawer */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-obsidian-card border-r border-linen-300 dark:border-obsidian-border flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0">
              <img
                src="/images/logo-heart.jpg"
                alt="Nailz by Jenna"
                className="w-10 h-10 rounded-2xl object-cover border border-blushGold/50 shadow-md shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="font-serif font-bold text-base tracking-tight text-obsidian dark:text-linen-50 block leading-tight truncate">
                  Nailz by Jenna
                </span>
                <span className="text-[10px] text-blushGold-dark dark:text-blushGold font-mono uppercase tracking-wider block">
                  Studio Portal
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-obsidian/40 hover:text-obsidian shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => setIsNewOrderOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider shadow-md hover:scale-[1.02] transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log Walk-In / Set</span>
          </button>

          {/* Navigation Items */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-widest text-obsidian/40 dark:text-linen-500 px-3 block">
              Management
            </span>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? 'bg-blushGold/15 text-blushGold-dark dark:text-blushGold font-bold shadow-xs'
                        : 'text-obsidian/70 dark:text-linen-300 hover:bg-linen-100 dark:hover:bg-obsidian-subtle'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-blushGold-dark dark:text-blushGold' : 'text-obsidian/50 dark:text-linen-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* ARTIST PROFILE & FOOTER */}
        <div className="p-4 border-t border-linen-200 dark:border-obsidian-border space-y-3">
          <div className="flex items-center space-x-3 p-2 rounded-xl bg-linen-100 dark:bg-obsidian-pure">
            <img
              src="/images/jenna-portrait.jpg"
              alt="Jenna Soule"
              className="w-9 h-9 rounded-full object-cover border border-blushGold shrink-0"
            />
            <div className="min-w-0 flex-1">
              <span className="text-xs font-bold text-obsidian dark:text-linen-100 block truncate">
                Jenna Soule
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium block">
                ● Studio Open
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <button
              onClick={onBackToSite}
              className="text-[11px] font-semibold text-blushGold-dark dark:text-blushGold hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Site</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-[11px] font-semibold text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/90 dark:bg-obsidian-card/90 backdrop-blur-md border-b border-linen-300 dark:border-obsidian-border px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-obsidian/60 hover:bg-linen-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="font-serif font-bold text-base text-obsidian dark:text-linen-50">
                {activeTab === 'dashboard' && 'Studio Dashboard'}
                {activeTab === 'orders' && 'Client Appointments & Custom Orders'}
                {activeTab === 'inbox' && 'Client Inspo Consultations'}
                {activeTab === 'settings' && 'Studio Settings & Operating Policies'}
              </span>
              <span className="hidden sm:inline-block text-[11px] text-obsidian/40 dark:text-linen-400 ml-2 font-mono">
                // 973 Pleasant Grove Blvd, Roseville CA
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToSite}
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-linen-300 dark:border-obsidian-border text-xs font-semibold text-obsidian/70 dark:text-linen-300 hover:bg-linen-100"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blushGold" />
              <span>Preview Live Site</span>
            </button>
          </div>
        </header>

        {/* Tab Views */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              onNavigateTab={setActiveTab}
              onSelectQuote={setModalQuote}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersView
              onSelectQuote={setModalQuote}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
            />
          )}

          {activeTab === 'inbox' && (
            <InboxView />
          )}

          {activeTab === 'settings' && (
            <AdminSettings />
          )}
        </main>
      </div>

      {/* DETAIL MODAL */}
      {modalQuote && (
        <QuoteDetailModal
          quote={modalQuote}
          isOpen={Boolean(modalQuote)}
          onClose={() => {
            setModalQuote(null);
            refreshStats();
          }}
          onUpdated={() => {
            refreshStats();
          }}
        />
      )}

      {/* NEW ORDER MODAL */}
      {isNewOrderOpen && (
        <NewOrderModal
          isOpen={isNewOrderOpen}
          onClose={() => {
            setIsNewOrderOpen(false);
            refreshStats();
          }}
          onCreated={() => {
            refreshStats();
          }}
        />
      )}
    </div>
  );
}
