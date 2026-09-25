import React from 'react';
import { MessageSquare, Instagram, Heart, Sparkles, Send } from '../common/Icons';
import { salonStore } from '../../services/salonStore';

export default function InboxView() {
  const messages = salonStore.getInbox();

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="font-serif text-2xl font-bold text-obsidian dark:text-linen-50">
          Client Inspo & Consultation Messages
        </h2>
        <p className="text-xs text-obsidian/60 dark:text-linen-400 mt-0.5">
          Inquiries sent from clients regarding custom nail art, chrome powders, and jewelry chains.
        </p>
      </div>

      <div className="space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className="p-5 rounded-2xl bg-white dark:bg-obsidian-card border border-linen-200 dark:border-obsidian-border shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-obsidian dark:text-linen-100">{msg.clientName}</span>
                <span className="text-[11px] text-blushGold-dark dark:text-blushGold font-mono">{msg.instagram}</span>
                {msg.unread && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-white">NEW</span>
                )}
              </div>
              <span className="text-[11px] text-obsidian/40 font-mono">{msg.time}</span>
            </div>

            <p className="text-xs text-obsidian/80 dark:text-linen-200 bg-linen-50 dark:bg-obsidian-pure p-3.5 rounded-xl border border-linen-200 dark:border-obsidian-border">
              "{msg.lastMessage}"
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-obsidian/50">Order ref: {msg.orderId}</span>
              <a
                href={`https://instagram.com/${msg.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-blushGold-dark dark:text-blushGold hover:underline flex items-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Reply on Instagram →</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
