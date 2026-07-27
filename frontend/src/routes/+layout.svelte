<script>
  import "../app.css";
  import { page } from "$app/state";
  import { language } from "$lib/stores/language";

  let { children } = $props();

  $effect(() => {
    const lang = page.url.pathname.startsWith("/de") ? "de" : "en";
    language.set(lang);
    document.documentElement.lang = lang;
  });
</script>

{@render children()}
