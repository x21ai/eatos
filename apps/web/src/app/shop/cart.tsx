// @ts-nocheck
'use client';

// Tiny external cart store: no provider needed, persisted to localStorage.
import { useSyncExternalStore } from 'react';

export interface CartItem {
  productSlug: string;
  name: string;
  image: string;
  unitAmount: number;
  quantity: number;
  selections: Record<string, string>;
  selectionLabels: string[];
}

const KEY = 'eatos-shop-bag';
let items: CartItem[] = [];
let hydrated = false;
const listeners = new Set<() => void>();

function read() {
  if (hydrated || typeof window === 'undefined') return;
  hydrated = true;
  try {
    items = JSON.parse(window.localStorage.getItem(KEY) || '[]');
  } catch {
    items = [];
  }
}

function write() {
  if (typeof window !== 'undefined') window.localStorage.setItem(KEY, JSON.stringify(items));
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  read();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  read();
  return items;
}

const EMPTY: CartItem[] = [];
function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

export function useBag(): CartItem[] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useBagCount(): number {
  const bag = useBag();
  return bag.reduce((n, i) => n + i.quantity, 0);
}

function keyOf(item: Pick<CartItem, 'productSlug' | 'selections'>) {
  return item.productSlug + '|' + JSON.stringify(item.selections);
}

export function addToBag(item: Omit<CartItem, 'quantity'>, quantity = 1) {
  read();
  const existing = items.find((i) => keyOf(i) === keyOf(item));
  if (existing) existing.quantity += quantity;
  else items = [...items, { ...item, quantity }];
  write();
}

export function updateQuantity(index: number, quantity: number) {
  read();
  if (quantity <= 0) {
    items = items.filter((_, i) => i !== index);
  } else {
    items = items.map((it, i) => (i === index ? { ...it, quantity } : it));
  }
  write();
}

export function removeFromBag(index: number) {
  read();
  items = items.filter((_, i) => i !== index);
  write();
}

export function clearBag() {
  read();
  items = [];
  write();
}

export function bagTotal(bag: CartItem[]): number {
  return bag.reduce((sum, i) => sum + i.unitAmount * i.quantity, 0);
}
