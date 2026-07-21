import { browser } from "$app/environment";
import { readStoredUserRecordId } from "$lib/stores/user_record";

export async function load({ fetch }) {
  if (!browser) {
    return {
      userData: null,
    };
  }

  const userRecordId = readStoredUserRecordId();

  if (!userRecordId) {
    return {
      userData: null,
    };
  }

  try {
    const response = await fetch(`/api/load?userRecordId=${userRecordId}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const loadedData = await response.json();
    return {
      userData: loadedData?.userData ?? null,
    };
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Failed to load user data",
    );

    return {
      userData: null,
    };
  }
};
