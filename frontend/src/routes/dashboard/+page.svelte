<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    messageControl,
    toggleTheme,
    toggleLanguage,
    clickOutside,
  } from "$lib/components/utils";
  import { theme, language } from "$lib/stores/items";
  import { onMount } from "svelte";
  import logo from "$lib/assets/logo.svg";

  let mounted = $state(false);
  let offsetWords = $state<string[]>([]);
  let story = $state<string>("");
  let loading = $state(false);
  let successMessage = $state("");
  let menuOpen = $state(false);
  let mobileMenuOpen = $state(false);

  let translation = $state<{
    english: string;
    word_type: string[];
    word_article: string;
    example_english: string;
    example_german: string;
  }>({
    english: "",
    word_type: [],
    word_article: "",
    example_english: "",
    example_german: "",
  });

  let selectedWord = $state<string>("");
  let cachedtranslations = $state<
    Record<
      string,
      {
        english: string;
        word_type: string[];
        word_article: string;
        example_english: string;
        example_german: string;
      }
    >
  >({}); // using caching

  let isTranslationModalOpen = $state(false);
  const closeTranslationModal = () => {
    isTranslationModalOpen = false;
  };

  onMount(() => {
    mounted = true;
  });

  function handleKeydown(evt: KeyboardEvent) {
    if (evt.key === " " || evt.key === "Escape") {
      mobileMenuOpen = false;
      menuOpen = false;
    }
  }

  function closeMobileMenu() {
    mobileMenuOpen = false;
    menuOpen = false;
  }

  const startLearn = async () => {
    const selectedWords = [...offsetWords];
    loading = true;
    await storeData(selectedWords, story, data.userAuth?.id ?? "");

    try {
      const response = await fetch("http://localhost:3000/api/story", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ offsetWords: selectedWords }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      story = data.story ?? "";
      offsetWords = [];
      successMessage = "";
      closeTranslationModal();
    } catch (error) {
      error instanceof Error ? error.message : "Failed to start learning";
    } finally {
      loading = false;
    }
  };

  async function selectWord(word: string) {
    offsetWords = [...offsetWords, word];
    offsetWords = Array.from(new Set(offsetWords));
    const wordCleaned = word.replace(",", "").replace(".", "").trim();

    if (!(wordCleaned in cachedtranslations)) {
      const popupResponse = await fetch(
        `http://localhost:3000/api/translate/${encodeURIComponent(wordCleaned)}`,
      );
      const popupData = await popupResponse.json();
      cachedtranslations[wordCleaned] = {
        english: popupData.english ?? "No translation found",
        word_type: popupData.word_type.filter((w: string) => w !== "") ?? [],
        word_article: popupData.word_article ?? "",
        example_english: popupData.example_english ?? "",
        example_german: popupData.example_german ?? "",
      };
    }

    selectedWord = wordCleaned;
    translation = cachedtranslations[wordCleaned];
    isTranslationModalOpen = true;
  }
  const storeData = async (
    offsetWords: string[],
    story: string,
    userRecordId: string,
  ) => {
    try {
      successMessage = "";
      const response = await fetch("/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          offsetWords,
          story,
          userRecordId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      successMessage =
        $language === "en"
          ? "Story is saved successfully!"
          : "Geschichte wurde erfolgreich gespeichert!";
      messageControl(
        (text) => {
          successMessage = text;
        },
        successMessage,
        5000,
      );
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Failed to store user data",
      );
    }
  };
  let { data } = $props();

  $effect(() => {
    if (data?.userData) {
      offsetWords = Array.isArray(data.userData.offset_words)
        ? data.userData.offset_words
        : [];
      story = data.userData.generated_story ?? "";
    }
  });

  const resetStory = async () => {
    offsetWords = [];
    story = "";
    successMessage = "";
  };

  export const logout = async () => {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json();
    if (result.success) {
      goto("/", {
        invalidateAll: true,
      });
    } else {
      alert("Logout failed: " + result.error);
    }
  };

  export const deleteAccount = async () => {
    const userId = data.userAuth?.id;
    if (!userId) {
      alert("User ID not found. Cannot delete account.");
      return;
    }
    const confirmed = confirm(
      $language === "en"
        ? "Are you sure you want to delete your account?"
        : "Sind Sie sicher, dass Sie Ihr Konto löschen möchten?",
    );
    if (!confirmed) return;

    const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: "DELETE",
      credentials: "include",
    });
    const result = await response.json();
    if (result.success) {
      alert(
        $language === "en"
          ? "Account deleted successfully."
          : "Konto erfolgreich gelöscht.",
      );
      goto("/", {
        invalidateAll: true,
      });
    } else {
      alert("Account deletion failed: " + result.error);
    }
  };
  $inspect("lang", mounted ? document.documentElement.lang : null);
</script>

<!-- @ts-ignore @ts-nocheck -->
<svelte:document onkeydown={handleKeydown} />

<nav
  use:clickOutside={closeMobileMenu}
  class="navbar is-danger"
  aria-label="main navigation"
>
  <div class="navbar-brand">
    <a class="navbar-item" href="/">
      <img src={logo} alt="Logo" class="custom-logo" />
    </a>
    <button
      class="navbar-burger {mobileMenuOpen ? 'is-active' : ''}"
      aria-label="menu"
      aria-expanded={mobileMenuOpen}
      onclick={() => {
        mobileMenuOpen = !mobileMenuOpen;
      }}
      data-target="navbarMenu"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </div>

  <div
    id="navbarMenu"
    class="navbar-menu is-centered {mobileMenuOpen ? 'is-active' : ''}"
  >
    <div id="navbar-end" class="navbar-end">
      <div class="navbar-item is-centered">
        <button
          type="button"
          id="language-toggle-btn"
          aria-label="toggle language"
          onclick={() => {
            // closeMobileMenu();
            toggleLanguage();
          }}
        >
          {#if mounted}
            {$language === "en" ? "DE" : "EN"}
          {/if}
        </button>
      </div>

      <div class="navbar-item is-centered">
        <button
          type="button"
          id="theme-toggle-btn"
          aria-label="toggle theme"
          onclick={() => {
            // closeMobileMenu();
            toggleTheme();
          }}
        >
          {#if mounted}
            <span class="icon">
              <i
                class={$theme === "dark"
                  ? "fas fa-sun has-text-warning"
                  : "fa-regular fa-moon"}
                id="theme-icon"
              ></i>
            </span>
          {/if}
        </button>
      </div>

      <div
        id="dropdown-arrow"
        class="navbar-item has-dropdown is-centered {menuOpen
          ? 'is-active'
          : ''}"
      >
        <button
          class="navbar-link is-centered"
          onclick={() => {
            menuOpen = !menuOpen;
          }}
        >
          {data.userAuth?.email ?? ""}
        </button>
        <div id="dropdown-menu" class="navbar-dropdown is-right is-boxed">
          <div id="delete-account-dropdown" class="navbar-item">
            <button
              id="delete-account-btn"
              class="delete-account-dropdown"
              onclick={() => {
                // closeMobileMenu();
                void deleteAccount();
              }}
            >
              <span class="icon">
                <i class="fas fa-user-slash"></i>
              </span>
              <span
                >{$language === "en" ? "Delete Account" : "Konto löschen"}</span
              >
            </button>
          </div>

          <div id="logout-dropdown" class="navbar-item">
            <button
              id="logout-btn"
              class="logout-dropdown"
              onclick={() => {
                // closeMobileMenu();
                void logout();
              }}
            >
              <span class="icon">
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <span>{$language === "en" ? "Logout" : "Abmelden"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>

<div id="dash-page">
  <section id="dash-section" class="section">
    <div id="dash-container" class="container">
      <div id="dash-btns" class="buttons is-centered">
        {#if mounted}
          <button
            id="story-generate-btn"
            class="button is-link"
            onclick={startLearn}
            disabled={loading}
          >
            {loading
              ? $language === "en"
                ? "Generating..."
                : "Generiere..."
              : story
                ? $language === "en"
                  ? "Next Story"
                  : "Nächste Geschichte"
                : $language === "en"
                  ? "Generate Story"
                  : "Generiere Geschichte"}
          </button>
        {/if}

        {#if story}
          <button
            id="save-story-btn"
            class="button is-link is-soft"
            onclick={() =>
              void storeData(offsetWords, story, data.userAuth?.id ?? "")}
            disabled={loading}
          >
            {$language === "en" ? "Save" : "Speichern"}
          </button>
          <button
            id="reset-btn"
            class="button is-danger is-soft"
            onclick={() => {
              resetStory();
            }}
            disabled={loading}
          >
            {$language === "en" ? "Reset" : "Zurücksetzen"}
          </button>
        {/if}
      </div>

      {#if successMessage && !loading}
        <div id="story-save-msg" class="notification is-success is-light">
          <span id="story-save-icon" class="icon is-size-6 mr-2">
            <i class="fas fa-check-circle"></i>
          </span>
          <span id="story-save-text" class="is-size-6">{successMessage}</span>
          <button
            id="story-save-close-btn"
            class="delete"
            aria-label="delete"
            onclick={() => (successMessage = "")}
            disabled={loading}
          >
          </button>
        </div>
      {/if}

      {#if story}
        <div id="story-card" class="notification">
          <p>
            {#each story.split(/(\s+)/) as token}
              {#if token.trim() === ""}
                {token}
              {:else}
                <button
                  id="selected-word-btn"
                  type="button"
                  class:selected={offsetWords.includes(token)}
                  onclick={() => selectWord(token)}
                >
                  {token}
                </button>
              {/if}
            {/each}
          </p>
        </div>
      {/if}
      <div class="modal" class:is-active={isTranslationModalOpen}>
        <button
          class="modal-background"
          type="button"
          aria-label="close translation modal"
          onclick={closeTranslationModal}
        ></button>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">
              {$language === "en"
                ? "Translation with example"
                : "Übersetzung mit Beispiel"}
            </p>
            <button
              class="delete"
              aria-label="close"
              onclick={closeTranslationModal}
            ></button>
          </header>
          <section class="modal-card-body">
            <p class="title is-5">
              {selectedWord}:
              <span style="font-weight: normal; font-size: large;"
                >{translation.english}</span
              >
            </p>
            <div class="columns">
              <div class="column is-half">
                <strong>Type:</strong>
                {translation.word_type.join(", ")}
              </div>
              {#if translation.word_article}
                <div class="column">
                  <strong>Article:</strong>
                  {translation.word_article}
                </div>
              {/if}
            </div>

            <div id="translation-examples" class="content">
              <p>{translation.example_german}</p>
              <p>{translation.example_english}</p>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-link" onclick={closeTranslationModal}>
              Close
            </button>
          </footer>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onclick={closeTranslationModal}
        ></button>
      </div>
    </div>
  </section>

  <footer id="dash-footer" class="footer has-background-danger">
    <div class="content has-text-centered">
      <p class="footer-items">
        {$language === "en"
          ? "2026 AILLA © All rights reserved"
          : "2026 AILLA © Alle Rechte vorbehalten"}
        <span>|</span>

        <a
          href="https://gitlab.gwdg.de/webdev/2026/ki-generierte-geschichten-zum-sprache-lernen.git"
          target="_blank"
          rel="noopener norefererrer"
        >
          AILLA v0.0.1
        </a>
        <span>|</span>

        <a
          href={`/${$language}/data-privacy`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {$language === "en" ? "Data Privacy" : "Datenschutz"}
        </a>
        <span>|</span>

        <a
          href={`/${$language}/imprint`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {$language === "en" ? "Imprint" : "Impressum"}
        </a>
        <span>|</span>

        <a
          href={`/${$language}/accessibility`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {$language === "en" ? "Accessibility" : "Barrierefreiheit"}
        </a>
      </p>
    </div>
  </footer>
</div>
