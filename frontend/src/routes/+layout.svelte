<script>
  import "../app.css";
  import { page } from "$app/state";
  import { language } from "$lib/stores/language";
  import { theme } from "$lib/stores/theme";

  let { children } = $props();

  $effect(() => {
    const lang = page.url.pathname.startsWith("/de") ? "de" : "en";
    language.set(lang);
    document.documentElement.lang = lang;
    document.documentElement.setAttribute("data-theme", $theme);
  });
</script>

{@render children()}
