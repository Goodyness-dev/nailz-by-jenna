import { salonStore } from './salonStore';

export async function submitQuoteRequest(orderData) {
  return salonStore.createOrder(orderData);
}

export function formatOrderSummary(order) {
  return {
    id: order.id,
    date: order.date,
    time: order.timeSlot,
    client: order.name,
    service: order.service,
    total: order.estimatedTotal,
    deposit: order.depositAmount
  };
}
