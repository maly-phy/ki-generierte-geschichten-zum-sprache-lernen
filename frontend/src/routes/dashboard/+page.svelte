<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "$lib/app_style/style.css";
  import { userRecordId } from "$lib/stores/user_record";

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
    await storeData(selectedWords, story, $userRecordId);

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
        `http://localhost:3000/api/translate/${encodeURIComponent(word)}`,
      );
      const popupData = await popupReposne.json();
      cachedtranslations[word] = popupData.english ?? "No translation found";
    }

    translation = cachedtranslations[word];
    popupVisible = true;
  }
  const storeData = async (
    offsetWords: string[],
    story: string,
    userRecordId: string,
  ) => {
    try {
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
    } catch (error) {
      console.error(
        error instanceof Error ? error.message : "Failed to store user data",
      );
    }
  };

  $inspect("userId:", $userRecordId);
  let { data } = $props<{ data: any }>();

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
  <style src="$lib/app_style/style.scss"></style>
</svelte:head>

<div>
  <button onclick={startLearn} disabled={loading}>
    {loading ? "Generating..." : "Generate Story"}
  </button>
  <button
    onclick={() => void storeData(offsetWords, story, $userRecordId)}
    disabled={loading}
  >
    Save
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
