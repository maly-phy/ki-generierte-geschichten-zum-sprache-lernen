import { browser } from "$app/environment";
import { writable } from "svelte/store";

export type UserAuth = {
  authenticated: boolean;
  id?: string;
  email?: string;
} | null;

const storageKey = "userAuth";

function readStoredUserAuth(): UserAuth {
  if (!browser) {
    return null;
  }

  const storedValue = localStorage.getItem(storageKey);
  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as UserAuth;
  } catch {
    localStorage.removeItem(storageKey);
    return null;
  }
}

function createUserAuthStore() {
  const { subscribe, set } = writable<UserAuth>(readStoredUserAuth());

  return {
    subscribe,
    set(value: UserAuth) {
      if (browser) {
        if (value) {
          localStorage.setItem(storageKey, JSON.stringify(value));
        } else {
          localStorage.removeItem(storageKey);
        }
      }

      set(value);
    },
    clear() {
      if (browser) {
        localStorage.removeItem(storageKey);
      }

      set(null);
    },
    syncFromStorage() {
      set(readStoredUserAuth());
    },
  };
}

export const userAuth = createUserAuthStore();
export { readStoredUserAuth };
