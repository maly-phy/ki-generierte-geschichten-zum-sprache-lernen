<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/app_style/style.css";
  import { Translations } from "openai/resources/audio/translations.js";

  let words = $state<string[]>([]);
  let offsetWords = $state<string[]>([]);
  let story = $state<string>("");
  let loading = $state(false);
  let errorMessage = $state("");

  let translation = $state<string>("");
  let cachedtranslations = $state<Record<string, string>>({}); // using caching
  let popupVisible = $state(false);
  let popupX = $state(0);
  let popupY = $state(0);

  const startLearn = async () => {
    const selectedWords = [...offsetWords];
    loading = true;
    errorMessage = "";

    try {
      const response = await fetch("http://localhost:3000/story", {
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
      popupVisible = false;
    } catch (error) {
      errorMessage =
        error instanceof Error ? error.message : "Failed to start learning";
    } finally {
      loading = false;
    }
  };

  async function selectWord(word: string, event: MouseEvent) {
    offsetWords = [...offsetWords, word];
    offsetWords = Array.from(new Set(offsetWords));

    const rect = (event.target as HTMLElement).getBoundingClientRect();
    popupX = rect.left + window.scrollX;
    popupY = rect.bottom + window.scrollY + 5;

    if (!(word in cachedtranslations)) {
      const popupReposne = await fetch(
        `http://localhost:3000/translate/${encodeURIComponent(word)}`,
      );
      const popupData = await popupReposne.json();
      cachedtranslations[word] = popupData.english ?? "No translation found";
    }

    translation = cachedtranslations[word];
    popupVisible = true;
  }
  $inspect(`offsetwords: ${offsetWords}`);
  $inspect(`words: ${words}`);
  $inspect(`cachedtranslations: ${cachedtranslations}`);
  $inspect(`translation: ${translation}`);

  let { children } = $props<{ children: any }>();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div>
  <button onclick={startLearn} disabled={loading}>
    {loading ? "Generating..." : "Generate Story"}
  </button>

  {#if story}
    <p>
      {#each story.split(/(\s+)/) as token}
        {#if token.trim() === ""}
          {token}
        {:else}
          <button
            type="button"
            class:selected={offsetWords.includes(token)}
            onclick={(evt) => selectWord(token, evt)}
          >
            {token}
          </button>
        {/if}
      {/each}
    </p>
  {/if}

  {#if popupVisible}
    <div class="popup" style:left="{popupX}px" style:top="{popupY}px">
      {translation}
      <button onclick={() => (popupVisible = false)}>x</button>
    </div>
  {/if}
</div>

{@render children()}
