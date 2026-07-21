import { browser } from "$app/environment";
import { writable } from "svelte/store";

const storageKey = "userRecordId";

function readStoredUserRecordId() {
  if (!browser) {
    return "";
  }

  return localStorage.getItem(storageKey) ?? "";
}

function createUserRecordIdStore() {
  const { subscribe, set } = writable(readStoredUserRecordId());

  return {
    subscribe,
    set(value: string) {
      if (browser) {
        if (value) {
          localStorage.setItem(storageKey, value);
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

      set("");
    },
    syncFromStorage() {
      set(readStoredUserRecordId());
    },
  };
}

export const userRecordId = createUserRecordIdStore();
export { readStoredUserRecordId };