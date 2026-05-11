/**
 * TikTok Pixel — lightweight helpers aligned with Meta/GA patterns.
 * Pixel ID: NEXT_PUBLIC_TIKTOK_PIXEL_ID
 *
 * Do not call ttq directly from components; use @/lib/analytics.
 */

declare global {
  interface Window {
    ttq?: {
      track: (...args: any[]) => void;
      page: (...args: any[]) => void;
      identify?: (...args: any[]) => void;
      /** queued stub قبل تحميل السكربت */
      push?: (args: any[]) => void;
    };
  }
}

type Currency = 'EGP';

interface TikTokProductParams {
  id: string;
  name: string;
  price: number;
  category?: string;
}

interface TikTokCheckoutParams {
  contentIds: string[];
  value: number;
  numItems: number;
}

interface TikTokPurchaseParams {
  contentIds: string[];
  value: number;
  orderId: string;
  numItems?: number;
  contents?: { id: string; quantity: number; price: number }[];
}

const CURRENCY: Currency = 'EGP';
const PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '';

const firedEvents = new Set<string>();

function isDuplicate(key: string): boolean {
  if (firedEvents.has(key)) return true;
  firedEvents.add(key);
  return false;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function normalizePhone(phone: string): string {
  // TikTok expects phone number with country code, but usually just digits is fine.
  // We'll strip everything but digits.
  let p = phone.replace(/[^\d]/g, '');
  // If it starts with 0 and is Egyptian, add 2
  if (p.startsWith('01') && p.length === 11) {
    p = '2' + p;
  }
  return p;
}

async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function canTrack(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!PIXEL_ID &&
    typeof window.ttq?.track === 'function'
  );
}

function canIdentify(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!PIXEL_ID &&
    typeof window.ttq?.identify === 'function'
  );
}

function contentsFromIds(ids: string[], quantity = 1) {
  return ids.map((content_id) => ({
    content_id: content_id.toString(),
    content_type: 'product',
    quantity: quantity,
  }));
}

/**
 * TikTok Advanced Matching
 * Hashes email / phone_number (SHA-256) before sending.
 */
export async function identifyUser(params: { email?: string; phone?: string }): Promise<void> {
  if (!canIdentify()) return;

  const email = params.email ? normalizeEmail(params.email) : '';
  const phone = params.phone ? normalizePhone(params.phone) : '';
  if (!email && !phone) return;

  try {
    const payload: Record<string, string> = {};
    if (email) payload.email = await sha256Hex(email);
    if (phone) payload.phone_number = await sha256Hex(phone);

    window.ttq!.identify!(payload);
  } catch {
    // ignore identify failures (privacy tools / unavailable crypto)
  }
}

export function trackViewContent(product: TikTokProductParams): void {
  if (!canTrack()) return;
  const dedupeKey = `ttq_ViewContent_${product.id}`;
  if (isDuplicate(dedupeKey)) return;

  // Force number conversion for price/value to avoid TikTok string errors
  const price = Number(product.price);

  window.ttq!.track('ViewContent', {
    contents: [
      {
        content_id: product.id.toString(),
        content_type: 'product',
        content_name: product.name,
        price: price,
        quantity: 1,
      },
    ],
    value: price,
    currency: CURRENCY,
  });
}

export function trackAddToCart(product: TikTokProductParams): void {
  if (!canTrack()) return;
  const dedupeKey = `ttq_AddToCart_${product.id}`;
  if (isDuplicate(dedupeKey)) return;
  setTimeout(() => firedEvents.delete(dedupeKey), 2000);

  // Force number conversion
  const price = Number(product.price);

  window.ttq!.track('AddToCart', {
    contents: [
      {
        content_id: product.id.toString(),
        content_type: 'product',
        content_name: product.name,
        price: price,
        quantity: 1,
      },
    ],
    value: price,
    currency: CURRENCY,
  });
}

export function trackInitiateCheckout(params: TikTokCheckoutParams): void {
  if (!canTrack()) return;
  const dedupeKey = 'ttq_InitiateCheckout';
  if (isDuplicate(dedupeKey)) return;

  window.ttq!.track('InitiateCheckout', {
    contents: contentsFromIds(params.contentIds),
    value: Number(params.value),
    currency: CURRENCY,
  });
}

export function trackAddPaymentInfo(params: TikTokCheckoutParams): void {
  if (!canTrack()) return;
  const dedupeKey = 'ttq_AddPaymentInfo';
  if (isDuplicate(dedupeKey)) return;

  window.ttq!.track('AddPaymentInfo', {
    contents: contentsFromIds(params.contentIds),
    value: Number(params.value),
    currency: CURRENCY,
  });
}

/** TikTok standard event for completed purchase */
export function trackCompletePayment(params: TikTokPurchaseParams): void {
  if (!canTrack()) return;
  const dedupeKey = `ttq_Purchase_${params.orderId}`;
  if (isDuplicate(dedupeKey)) return;

  const value = Number(params.value);

  // Use 'Purchase' as the primary event name to match marketing manager expectations
  // but keep parameters robust.
  const eventPayload = {
    contents: params.contents 
      ? params.contents.map(c => ({
          content_id: c.id.toString(),
          content_type: 'product',
          quantity: Number(c.quantity) || 1,
          price: Number(c.price)
        }))
      : contentsFromIds(params.contentIds, 1),
    value: value,
    currency: CURRENCY,
  };

  window.ttq!.track('Purchase', eventPayload);
  
  // Also fire CompletePayment for redundancy as it's the TikTok standard
  window.ttq!.track('CompletePayment', eventPayload);
}

export function getTikTokPixelId(): string {
  return PIXEL_ID;
}
