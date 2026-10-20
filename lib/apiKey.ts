"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "openai_api_key";
const EVENT = "openai-api-key-change";

export const API_KEY_HEADER = "x-openai-api-key";

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function read(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function useApiKey(): string | null {
  // server / first hydration render returns null
  return useSyncExternalStore(subscribe, read, () => null);
}

export function saveApiKey(key: string) {
  try {
    if (key) localStorage.setItem(STORAGE_KEY, key);
    else localStorage.removeItem(STORAGE_KEY);
  } finally {
    window.dispatchEvent(new Event(EVENT));
  }
}
