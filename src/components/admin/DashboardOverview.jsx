import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Heart, CheckCircle2, Clock, 
  Calendar, Plus, ChevronRight, Phone, Mail, 
  User, Instagram, Tag, Camera, Gem
} from '../common/Icons';
import { salonStore } from '../../services/salonStore';

export default function DashboardOverview({ onNavigateTab, onSelectQuote, onOpenNewOrder }) {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, completed: 0, totalRevenue: 0, depositsCollected: 0 });

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 8000);
    return () => clearInterval(interval);
  }, []);

  const loadData = () => {
    const list = salonStore.getOrders();
    setOrders(list);
    setStats(salonStore.getStats());
  };

  const handleQuickStatus = (id, newStatus) => {
    salonStore.updateOrderStatus(id, newStatus);
    loadData();
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* TOP HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-obsidian dark:text-linen-50">
            Welcome back, Jenna
          </h1>
          <p className="text-xs text-obsidian/60 dark:text-linen-400 mt-0.5">
            Here is your studio schedule, custom set requests, and client deposits for this week.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenNewOrder}
            className="py-2.5 px-4 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Log Walk-In Client</span>
          </button>
          <button
            onClick={() => onNavigateTab('orders')}
            className="py-2.5 px-4 rounded-xl bg-white dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border text-xs font-semibold text-obsidian dark:text-linen-200 hover:bg-linen-100 transition"
          >
            All Appointments Table →
          </button>
        </div>
      </div>

      {/* 4 KPI METRIC CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pending Approvals */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="p-5 rounded-2xl bg-gradient-to-br from-blushGold to-blushGold-dark text-white shadow-lg shadow-blushGold/20 cursor-pointer hover:scale-[1.02] transition flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/80 font-bold">New Requests</span>
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="mt-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold block">{stats.pending}</span>
            <span className="text-[11px] text-white/90">Awaiting deposit check</span>
          </div>
        </div>

        {/* Card 2: Confirmed Slots */}
        <div className="p-5 rounded-2xl bg-white dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-obsidian/50 dark:text-linen-400 font-bold">Confirmed Slots</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="mt-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-obsidian dark:text-linen-50 block">{stats.confirmed}</span>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Ready on schedule</span>
          </div>
        </div>

        {/* Card 3: Est. Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-obsidian/50 dark:text-linen-400 font-bold">Booking Value</span>
            <Tag className="w-4 h-4 text-blushGold" />
          </div>
          <div className="mt-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-obsidian dark:text-linen-50 block">${stats.totalRevenue}</span>
            <span className="text-[11px] text-obsidian/50 dark:text-linen-400">Total pipeline</span>
          </div>
        </div>

        {/* Card 4: Deposits Collected */}
        <div className="p-5 rounded-2xl bg-white dark:bg-obsidian-card border border-linen-300 dark:border-obsidian-border shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-obsidian/50 dark:text-linen-400 font-bold">Deposits Held</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-3">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-obsidian dark:text-linen-50 block">${stats.depositsCollected}</span>
            <span className="text-[11px] text-obsidian/50 dark:text-linen-400">$20 non-refundable holds</span>
          </div>
        </div>
      </div>

      {/* MAIN TWO-COLUMN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMN 1 & 2: LIVE APPOINTMENT TIMELINE */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blushGold" />
              <h3 className="font-serif text-base font-bold text-obsidian dark:text-linen-50">
                Upcoming Studio Schedule
              </h3>
            </div>
            <span className="text-xs text-obsidian/50 dark:text-linen-400 font-mono">Real-time sync</span>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 5).map(order => (
              <div
                key={order.id}
                onClick={() => onSelectQuote(order)}
                className="p-4 rounded-2xl bg-white dark:bg-obsidian-card border border-linen-200 dark:border-obsidian-border hover:border-blushGold/50 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0">
                  <img
                    src={order.inspoImage || '/images/polaroid-set-1.jpg'}
                    alt="Inspo"
                    className="w-12 h-12 rounded-xl object-cover border border-linen-300 dark:border-obsidian-border shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-obsidian dark:text-linen-50 truncate">{order.name}</span>
                      <span className="text-[11px] text-blushGold-dark dark:text-blushGold font-mono">{order.instagram}</span>
                    </div>
                    <span className="text-xs text-obsidian/70 dark:text-linen-300 block truncate">{order.service}</span>
                    <span className="text-[11px] text-obsidian/50 dark:text-linen-400 block font-mono">
                      {order.date} at {order.timeSlot} • {order.shape} ({order.length})
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-linen-100 dark:border-obsidian-border/50">
                  <div className="text-right">
                    <span className="font-serif font-bold text-sm text-obsidian dark:text-linen-50 block">${order.estimatedTotal}.00</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${
                      order.status === 'confirmed'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : order.status === 'in_studio'
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        : order.status === 'completed'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}>
                      {order.status === 'in_studio' ? 'At Table' : order.status}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-obsidian/40" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLUMN 3: RECENT INSPO & CLIENT INQUIRIES */}
        <div className="lg:col-span-1 space-y-4">
          <div className="flex items-center justify-between border-b border-linen-200 dark:border-obsidian-border pb-3">
            <h3 className="font-serif text-base font-bold text-obsidian dark:text-linen-50">
              Client Inspo Board
            </h3>
            <span className="text-xs text-blushGold-dark dark:text-blushGold font-semibold">Latest uploads</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {orders.filter(o => o.inspoImage).slice(0, 4).map(o => (
              <div 
                key={o.id}
                onClick={() => onSelectQuote(o)}
                className="group relative rounded-2xl overflow-hidden border border-linen-200 dark:border-obsidian-border cursor-pointer shadow-xs aspect-square"
              >
                <img
                  src={o.inspoImage}
                  alt={o.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2.5 flex flex-col justify-end text-white">
                  <span className="font-bold text-[11px] truncate">{o.name}</span>
                  <span className="text-[10px] text-white/80 font-mono truncate">{o.service.split('(')[0]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* STUDIO GUIDELINES QUICK WIDGET */}
          <div className="p-4 rounded-2xl bg-linen-100/70 dark:bg-obsidian-card border border-linen-200 dark:border-obsidian-border space-y-2 text-xs">
            <span className="font-bold text-obsidian dark:text-linen-100 block">// TODAY'S STUDIO PROTOCOL</span>
            <ul className="space-y-1 text-obsidian/70 dark:text-linen-300 text-[11px]">
              <li>✓ Solo client policy active (no guests/kids)</li>
              <li>✓ Sanitation buffer: 15 mins between sets</li>
              <li>✓ Aprés Natural Square & Almond restocked</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
