<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";

  let words = $state<string[]>([]);
  let offsetWords = $state<string[]>([]);
  let story = $state<string>("");
  let loading = $state(false);
  let successMessage = $state("");

  let translation = $state<string>("");
  let selectedWord = $state<string>("");
  let cachedtranslations = $state<Record<string, string>>({}); // using caching
  let isTranslationModalOpen = $state(false);

  const closeTranslationModal = () => {
    isTranslationModalOpen = false;
  };

  const startLearn = async () => {
    const selectedWords = [...offsetWords];
    loading = true;
    await storeData(selectedWords, story, data.userAuth?.id ?? "");
    successMessage = "";

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
      words = Array.isArray(data.words) ? data.words : [];
      story = data.story ?? "";
      offsetWords = [];
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

    if (!(word in cachedtranslations)) {
      const popupResponse = await fetch(
        `http://localhost:3000/api/translate/${encodeURIComponent(word)}`,
      );
      const popupData = await popupResponse.json();
      cachedtranslations[word] = popupData.english ?? "No translation found";
    }

    selectedWord = word;
    translation = cachedtranslations[word];
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
      successMessage = "Story successfully saved!";
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Failed to store user data",
      );
    }
  };
  let { data } = $props();
  $inspect("authData", data.userAuth);

  $effect(() => {
    if (data?.userData) {
      offsetWords = Array.isArray(data.userData.offset_words)
        ? data.userData.offset_words
        : [];
      story = data.userData.generated_story ?? "";
    }
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<nav class="navbar is-danger is-fixed-top" aria-label="main navigation">
  <div class="navbar-brand">
    <div
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="navbarMenu"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  </div>

  <div id="navbarMenu" class="navbar-menu is-centered">
    <div id="navbar-end" class="navbar-end">
      <div
        id="dropdown-arrow"
        class="navbar-item has-dropdown is-hoverable is-centered"
      >
        <div class="navbar-link is-centered">{data.userAuth?.email ?? ""}</div>
        <div id="dropdown-menu" class="navbar-dropdown is-right is-boxed">
          <a id="dropdown-items" class="navbar-item" href="/">
            <span class="icon">
              <i class="fas fa-sign-out-alt"></i>
            </span>
            <span>Logout</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</nav>

<section id="dash-section" class="section">
  <div id="dash-container" class="container">
    <div id="dash-btns" class="buttons is-centered">
      <button
        id="story-generate-btn"
        class="button is-link"
        onclick={startLearn}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Story"}
      </button>
      <button
        id="save-story-btn"
        class="button is-link is-soft"
        onclick={() =>
          void storeData(offsetWords, story, data.userAuth?.id ?? "")}
        disabled={loading}
      >
        Save
      </button>
    </div>

    {#if successMessage}
      <article class="message is-success">
        <div class="message-header">
          <p>{successMessage}</p>
          <button
            class="delete"
            aria-label="delete"
            onclick={() => (successMessage = "")}
          >
          </button>
        </div>
      </article>
    {/if}

    {#if story}
      <div class="notification">
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
          <p class="modal-card-title">Translation</p>
          <button
            class="delete"
            aria-label="close"
            onclick={closeTranslationModal}
          ></button>
        </header>
        <section class="modal-card-body">
          <p class="title is-5">{selectedWord}</p>
          <p>{translation}</p>
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
