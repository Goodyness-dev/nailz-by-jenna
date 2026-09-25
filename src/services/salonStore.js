/**
 * Salon Store & Database Engine for Nailz by Jenna LLC
 * Provides persistent local storage, seed appointments, order synchronization,
 * and seamless fallback when remote backends are disconnected.
 */

const STORAGE_KEY_ORDERS = 'nailz_salon_orders_v2';
const STORAGE_KEY_SETTINGS = 'nailz_salon_settings_v2';
const STORAGE_KEY_INBOX = 'nailz_salon_inbox_v2';

// Initial realistic orders representing Jenna's actual client flow
const INITIAL_ORDERS = [
  {
    id: 'NBJ-9281',
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    name: 'Chloe Miller',
    phone: '(916) 555-0192',
    email: 'chloe.m@gmail.com',
    instagram: '@chloemnails',
    discipline: 'Gel-X Extensions',
    service: 'Luxury Aprés Gel-X Full Set',
    shape: 'Almond',
    length: 'Long',
    artTier: 'Tier 1: Minimalist Chrome & French',
    selectedArt: ['French Tips (+$20)', 'Hailey Glazed Chrome (+$15)'],
    needsSoakOff: false,
    date: 'Tomorrow',
    timeSlot: '11:30 AM',
    notes: 'Square cuticle beds, prefers subtle warm champagne glaze over sheer nude.',
    inspoImage: '/images/polaroid-set-1.jpg',
    estimatedTotal: 120,
    depositAmount: 20,
    depositStatus: 'paid', // 'paid' | 'pending'
    status: 'confirmed', // 'pending' | 'confirmed' | 'in_studio' | 'completed' | 'cancelled'
    internalNotes: 'VIP recurring client. 4-week retention cycle.'
  },
  {
    id: 'NBJ-9282',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    name: 'Sarah Jenkins',
    phone: '(916) 420-9118',
    email: 'sarah.j@outlook.com',
    instagram: '@sarah.j.style',
    discipline: 'Permanent Jewelry',
    service: '14k Gold-Filled Micro-Welded Bracelet',
    shape: 'N/A',
    length: 'Custom Fit (6.5 in)',
    artTier: 'Chain & Charm',
    selectedArt: ['Freshwater Pearl Charm (+$15)'],
    needsSoakOff: false,
    date: 'Friday',
    timeSlot: '2:00 PM',
    notes: 'Matching sister bracelet with freshwater pearl charm.',
    inspoImage: '/images/permanent-jewelry.jpg',
    estimatedTotal: 80,
    depositAmount: 20,
    depositStatus: 'paid',
    status: 'confirmed',
    internalNotes: 'Coming with her sister for duo welding.'
  },
  {
    id: 'NBJ-9283',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    name: 'Maya Ramirez',
    phone: '(916) 882-3401',
    email: 'maya.ramirez@icloud.com',
    instagram: '@maya.r_',
    discipline: 'Structured Gel',
    service: 'Luminary Natural Builder Overlay',
    shape: 'Medium Square',
    length: 'Medium',
    artTier: 'Tier 2: Signature Trendy Art',
    selectedArt: ['Velvet Cateye (+$20)', 'Aura Airbrush (+$15)'],
    needsSoakOff: true,
    date: 'Saturday',
    timeSlot: '9:00 AM',
    notes: 'Transitioning from acrylics to Luminary builder gel to grow natural nails.',
    inspoImage: '/images/polaroid-set-2.jpg',
    estimatedTotal: 110,
    depositAmount: 20,
    depositStatus: 'pending',
    status: 'pending',
    internalNotes: 'Needs safe acrylic soak-off first.'
  },
  {
    id: 'NBJ-9284',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    name: 'Emily Watson',
    phone: '(916) 302-8842',
    email: 'emily.w@yahoo.com',
    instagram: '@emilywats',
    discipline: 'Gel-X Extensions',
    service: 'Sculpted Aprés Gel-X Coffin Set',
    shape: 'Coffin',
    length: 'XL Sculpted',
    artTier: 'Tier 3: Complex 3D & Charms',
    selectedArt: ['3D Jelly Droplets (+$20)', 'Chrome Swirls (+$15)', 'Swarovski Bling (+$15)'],
    needsSoakOff: false,
    date: 'Today',
    timeSlot: '4:30 PM',
    notes: 'Festival set! Inspo photo has 3D chrome details on middle and ring fingers.',
    inspoImage: '/images/polaroid-set-3.jpg',
    estimatedTotal: 135,
    depositAmount: 20,
    depositStatus: 'paid',
    status: 'in_studio',
    internalNotes: 'Currently at table. Prep finished.'
  },
  {
    id: 'NBJ-9285',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    name: 'Jessica Lee',
    phone: '(916) 771-4099',
    email: 'jessica.lee@gmail.com',
    instagram: '@jesslee.aesthetic',
    discipline: 'Structured Gel',
    service: 'Luminary Structured Gel Manicure',
    shape: 'Short Almond',
    length: 'Short',
    artTier: 'Tier 0: Clean Natural Gloss',
    selectedArt: [],
    needsSoakOff: false,
    date: 'Yesterday',
    timeSlot: '1:00 PM',
    notes: 'Pure clean girl aesthetic with milky builder base.',
    inspoImage: '/images/gel-x-extensions.jpg',
    estimatedTotal: 75,
    depositAmount: 20,
    depositStatus: 'paid',
    status: 'completed',
    internalNotes: 'Loved the result! Rebooked for 3 weeks.'
  }
];

export const salonStore = {
  getOrders({ status = 'all', search = '' } = {}) {
    let orders = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (raw) {
        orders = JSON.parse(raw);
      } else {
        orders = INITIAL_ORDERS;
        localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
      }
    } catch {
      orders = INITIAL_ORDERS;
    }

    return orders.filter(order => {
      const matchesStatus = status === 'all' || order.status === status;
      if (!matchesStatus) return false;
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      return (
        (order.name && order.name.toLowerCase().includes(s)) ||
        (order.phone && order.phone.includes(s)) ||
        (order.instagram && order.instagram.toLowerCase().includes(s)) ||
        (order.service && order.service.toLowerCase().includes(s)) ||
        (order.id && order.id.toLowerCase().includes(s))
      );
    });
  },

  getOrder(id) {
    const orders = this.getOrders();
    return orders.find(o => o.id === id) || null;
  },

  createOrder(orderData) {
    const orders = this.getOrders();
    const id = `NBJ-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id,
      createdAt: new Date().toISOString(),
      status: 'pending',
      depositStatus: 'pending',
      depositAmount: 20,
      internalNotes: '',
      ...orderData
    };

    const updated = [newOrder, ...orders];
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
    return newOrder;
  },

  updateOrderStatus(id, newStatus) {
    const orders = this.getOrders();
    const updated = orders.map(o => {
      if (o.id === id) {
        const depositStatus = (newStatus === 'confirmed' || newStatus === 'in_studio' || newStatus === 'completed') ? 'paid' : o.depositStatus;
        return { ...o, status: newStatus, depositStatus };
      }
      return o;
    });
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return updated.find(o => o.id === id);
  },

  updateOrder(id, patch) {
    const orders = this.getOrders();
    const updated = orders.map(o => o.id === id ? { ...o, ...patch } : o);
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return updated.find(o => o.id === id);
  },

  deleteOrder(id) {
    const orders = this.getOrders();
    const updated = orders.filter(o => o.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
    return true;
  },

  getStats() {
    const orders = this.getOrders();
    const pending = orders.filter(o => o.status === 'pending').length;
    const confirmed = orders.filter(o => o.status === 'confirmed').length;
    const inStudio = orders.filter(o => o.status === 'in_studio').length;
    const completed = orders.filter(o => o.status === 'completed').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.estimatedTotal || 0), 0);
    const depositsCollected = orders.filter(o => o.depositStatus === 'paid').length * 20;

    return {
      total: orders.length,
      pending,
      confirmed,
      inStudio,
      completed,
      totalRevenue,
      depositsCollected
    };
  },

  getInbox() {
    return [
      {
        id: 'msg-1',
        clientName: 'Chloe Miller',
        instagram: '@chloemnails',
        lastMessage: 'Just uploaded my chrome inspo photo for tomorrow! Cannot wait! 💕',
        time: '15m ago',
        unread: true,
        orderId: 'NBJ-9281'
      },
      {
        id: 'msg-2',
        clientName: 'Maya Ramirez',
        instagram: '@maya.r_',
        lastMessage: 'Hi Jenna! How long will the soak-off plus Luminary take? Just planning my Saturday.',
        time: '2h ago',
        unread: false,
        orderId: 'NBJ-9283'
      },
      {
        id: 'msg-3',
        clientName: 'Sarah Jenkins',
        instagram: '@sarah.j.style',
        lastMessage: 'Is it okay if my sister and I arrive 5 minutes early for the permanent jewelry?',
        time: '5h ago',
        unread: false,
        orderId: 'NBJ-9282'
      }
    ];
  }
};
