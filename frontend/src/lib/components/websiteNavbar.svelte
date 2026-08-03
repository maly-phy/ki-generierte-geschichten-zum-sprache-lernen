<script>
  import { toggleTheme, toggleLanguage, clickOutside } from "./utils";
  import { theme, language } from "$lib/stores/items";
  import { onMount } from "svelte";
  import logo from "$lib/assets/logo.svg";

  let mounted = $state(false);
  let mobileMenuOpen = $state(false);

  onMount(() => {
    mounted = true;
  });

  function closeMobileMenu() {
    mobileMenuOpen = false;
  }
</script>

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
      data-target="web-navbarMenu"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </button>
  </div>

  <div
    id="web-navbarMenu"
    class="navbar-menu is-centered {mobileMenuOpen ? 'is-active' : ''}"
  >
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
                  ? "fas fa-sun has-text-warning"
                  : "fa-regular fa-moon"}
                id="theme-icon"
              ></i>
            </span>
          {/if}
        </button>
      </div>
    </div>
  </div>
</nav>
