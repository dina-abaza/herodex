/**
 * Google Analytics (gtag.js) Utility
 *
 * SSR-safe, centralized Google Analytics tracking.
 * Measurement ID is read from NEXT_PUBLIC_GA_ID env variable.
 *
 * All payloads follow GA4 Ecommerce Spec exactly:
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// ─── Guard ───────────────────────────────────────────────────────────
function canTrack(): boolean {
  if (typeof window === 'undefined') return false;
  if (!window.gtag) return false;
  if (!GA_ID) return false;
  return true;
}

/**
 * Get the GA Measurement ID (for use in layout Script component).
 */
export function getGaId(): string {
  return GA_ID;
}

/**
 * Send a custom event to Google Analytics.
 */
export function gtagEvent(action: string, params?: Record<string, any>): void {
  if (!canTrack()) return;
  window.gtag('event', action, params);
}

/**
 * Track e-commerce: view_item
 * GA4 spec: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#view_item
 */
export function trackGaViewItem(product: { id: string; name: string; price: number; category?: string }): void {
  if (!canTrack()) return;
  window.gtag('event', 'view_item', {
    currency: 'EGP',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || '',
      price: product.price,
      quantity: 1,
    }],
  });
}

/**
 * Track e-commerce: add_to_cart
 * GA4 spec: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#add_to_cart
 */
export function trackGaAddToCart(product: { id: string; name: string; price: number; category?: string }): void {
  if (!canTrack()) return;
  window.gtag('event', 'add_to_cart', {
    currency: 'EGP',
    value: product.price,
    items: [{
      item_id: product.id,
      item_name: product.name,
      item_category: product.category || '',
      price: product.price,
      quantity: 1,
    }],
  });
}

/**
 * Track e-commerce: begin_checkout
 * GA4 spec: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#begin_checkout
 */
export function trackGaBeginCheckout(params: { contentIds: string[]; value: number; numItems: number }): void {
  if (!canTrack()) return;
  window.gtag('event', 'begin_checkout', {
    currency: 'EGP',
    value: params.value,
    items: params.contentIds.map((id) => ({
      item_id: id,
      quantity: 1,
    })),
  });
}

/**
 * Track e-commerce: purchase
 * GA4 spec: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase
 */
export function trackGaPurchase(params: { contentIds: string[]; value: number; orderId: string; numItems?: number }): void {
  if (!canTrack()) return;
  window.gtag('event', 'purchase', {
    transaction_id: params.orderId,
    currency: 'EGP',
    value: params.value,
    items: params.contentIds.map((id) => ({
      item_id: id,
      quantity: 1,
    })),
  });
}
