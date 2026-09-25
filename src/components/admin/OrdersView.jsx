import React, { useState, useEffect } from 'react';
import { 
  Search, RefreshCw, Plus, Clock, CheckCircle2, 
  Filter, ChevronRight, Phone, Mail, Instagram, 
  Camera, Check, X, Tag
} from '../common/Icons';
import { salonStore } from '../../services/salonStore';

export default function OrdersView({ onSelectQuote, onOpenNewOrder }) {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = () => {
    setOrders(salonStore.getOrders({ status: statusFilter, search: searchTerm }));
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, searchTerm]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* TITLE & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-obsidian dark:text-linen-50">
            Appointments & Custom Orders
          </h2>
          <p className="text-xs text-obsidian/60 dark:text-linen-400 mt-0.5">
            Manage your books, review customer nail inspo images, and update deposit statuses.
          </p>
        </div>

        <button
          onClick={onOpenNewOrder}
          className="py-2.5 px-4 rounded-xl bg-obsidian dark:bg-blushGold text-white dark:text-obsidian text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Log Walk-In</span>
        </button>
      </div>

      {/* FILTER TABS & SEARCH */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All' },
            { id: 'pending', label: 'Pending Review' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'in_studio', label: 'In Studio' },
            { id: 'completed', label: 'Completed' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === tab.id
                  ? 'bg-obsidian dark:bg-blushGold text-white dark:text-obsidian font-bold'
                  : 'bg-white dark:bg-obsidian-card text-obsidian/70 dark:text-linen-300 border border-linen-200 dark:border-obsidian-border hover:bg-linen-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-obsidian/40" />
          <input
            type="text"
            placeholder="Search client, IG, service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-linen-300 dark:border-obsidian-border bg-white dark:bg-obsidian-card text-xs text-obsidian dark:text-linen-100 focus:border-blushGold focus:ring-1 focus:ring-blushGold"
          />
        </div>
      </div>

      {/* ORDERS TABLE */}
      <div className="bg-white dark:bg-obsidian-card rounded-2xl border border-linen-200 dark:border-obsidian-border overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-linen-50 dark:bg-obsidian-pure border-b border-linen-200 dark:border-obsidian-border text-obsidian/60 dark:text-linen-400 font-mono text-[10px] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Ref & Date</th>
                <th className="py-3.5 px-4">Client & Contact</th>
                <th className="py-3.5 px-4">Treatment & Specs</th>
                <th className="py-3.5 px-4">Inspo Photo</th>
                <th className="py-3.5 px-4 text-right">Price / Deposit</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linen-100 dark:divide-obsidian-border/50">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-obsidian/50 dark:text-linen-400">
                    No orders found matching this filter.
                  </td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr
                    key={order.id}
                    onClick={() => onSelectQuote(order)}
                    className="hover:bg-linen-50/50 dark:hover:bg-obsidian-subtle/50 transition cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono">
                      <span className="font-bold text-obsidian dark:text-linen-100 block">{order.id}</span>
                      <span className="text-[11px] text-obsidian/50 dark:text-linen-400">{order.date} • {order.timeSlot}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-obsidian dark:text-linen-100 block">{order.name}</span>
                      <span className="text-[11px] text-blushGold-dark dark:text-blushGold font-mono">{order.instagram} • {order.phone}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-obsidian dark:text-linen-100 block">{order.service}</span>
                      <span className="text-[11px] text-obsidian/50 dark:text-linen-400 block">
                        {order.shape !== 'N/A' ? `${order.shape} • ${order.length}` : order.length}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {order.inspoImage ? (
                        <img
                          src={order.inspoImage}
                          alt="Nail Art Inspo"
                          className="w-10 h-10 rounded-lg object-cover border border-linen-300 dark:border-obsidian-border shadow-2xs"
                        />
                      ) : (
                        <span className="text-obsidian/30 italic">None</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="font-serif font-bold text-sm text-obsidian dark:text-linen-50 block">
                        ${order.estimatedTotal}.00
                      </span>
                      <span className={`text-[10px] font-mono ${
                        order.depositStatus === 'paid' ? 'text-emerald-600 font-bold' : 'text-amber-600'
                      }`}>
                        Deposit: {order.depositStatus === 'paid' ? '$20 Paid ✓' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block ${
                        order.status === 'confirmed'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : order.status === 'in_studio'
                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                          : order.status === 'completed'
                          ? 'bg-slate-200 text-slate-700'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-xs font-semibold text-blushGold-dark dark:text-blushGold hover:underline">
                        Details →
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
