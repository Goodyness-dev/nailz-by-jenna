import { salonStore } from './salonStore';

const TOKEN_STORAGE_KEY = 'nailz_admin_token';

export function getStoredToken() {
  try {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredToken(token) {
  try {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  } catch (e) {
    console.warn('Storage warning:', e);
  }
}

export const authApi = {
  async login(password) {
    const trimmed = (password || '').trim();
    const valid = ['nail2025', 'admin2025', 'jenna2025', import.meta.env.VITE_ADMIN_PASSWORD].filter(Boolean);

    if (valid.includes(trimmed)) {
      const demoToken = `nailz_token_${Date.now()}`;
      setStoredToken(demoToken);
      return {
        authenticated: true,
        success: true,
        token: demoToken,
        user: {
          name: 'Jenna Soule',
          shop: 'Nailz by Jenna LLC',
          role: 'Master Nail Artist & Owner'
        }
      };
    }
    throw new Error('Invalid salon access key');
  },

  async verify() {
    const token = getStoredToken();
    if (!token) return { authenticated: false };
    return {
      authenticated: true,
      user: {
        name: 'Jenna Soule',
        shop: 'Nailz by Jenna LLC',
        role: 'Master Nail Artist & Owner'
      }
    };
  },

  async logout() {
    setStoredToken(null);
    return { success: true };
  }
};

export const quotesApi = {
  async getStats() {
    return salonStore.getStats();
  },

  async getQuotes({ status = 'all', search = '', limit = 100, offset = 0 } = {}) {
    const orders = salonStore.getOrders({ status, search });
    return {
      quotes: orders,
      total: orders.length
    };
  },

  async getQuote(id) {
    return salonStore.getOrder(id);
  },

  async updateStatus(id, status) {
    return salonStore.updateOrderStatus(id, status);
  },

  async updateQuote(id, patch) {
    return salonStore.updateOrder(id, patch);
  },

  async deleteQuote(id) {
    salonStore.deleteOrder(id);
    return { success: true };
  },

  async submitPublicQuote(orderData) {
    const order = salonStore.createOrder(orderData);
    return { success: true, order, id: order.id };
  },

  async getInbox() {
    return salonStore.getInbox();
  }
};
