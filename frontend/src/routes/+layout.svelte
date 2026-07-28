<script>
  import "../app.css";
  import { page } from "$app/state";
  import { theme, language } from "$lib/stores/items";
  import favicon from "$lib/assets/logo2.png";

  let { children } = $props();

  $effect(() => {
    if (page.url.pathname.startsWith("/de")) {
      language.set("de");
      document.documentElement.lang = "de";
    } else if (page.url.pathname.startsWith("/en")) {
      language.set("en");
      document.documentElement.lang = "en";
    } else {
      document.documentElement.lang = $language;
    }

    document.documentElement.setAttribute("data-theme", $theme);
  });
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
