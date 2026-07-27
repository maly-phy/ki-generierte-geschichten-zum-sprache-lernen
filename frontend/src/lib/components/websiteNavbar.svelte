<script>
  import { toggleTheme, toggleLanguage } from "./utils";
  import { theme, language } from "$lib/stores/items";
  import { onMount } from "svelte";

  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
</script>

<nav class="navbar is-danger" aria-label="main navigation">
  <div class="navbar-brand">
    <div
      role="button"
      class="navbar-burger"
      aria-label="menu"
      aria-expanded="false"
      data-target="web-navbarMenu"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  </div>

  <div id="web-navbarMenu" class="navbar-menu is-centered">
    <div id="navbar-end" class="navbar-end">
      <div class="navbar-item is-centered">
        <button
          type="button"
          id="language-toggle-btn"
          aria-label="toggle language"
          onclick={toggleLanguage}
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
          onclick={toggleTheme}
        >
          {#if mounted}
            <span class="icon">
              <i
                class={$theme === "dark"
                  ? "fas fa-moon"
                  : "fas fa-sun has-text-warning"}
                id="theme-icon"
              ></i>
            </span>
          {/if}
        </button>
      </div>
    </div>
  </div>
</nav>
