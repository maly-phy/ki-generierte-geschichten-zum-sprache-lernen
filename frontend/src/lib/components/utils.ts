import { get } from 'svelte/store';
import { language } from '$lib/stores/language';
import { goto } from '$app/navigation';

let timer: ReturnType<typeof setTimeout>;

export function messageControl(setMessage: (text: string) => void, text: string, duration: number = 2000): void {
  setMessage(text);  
  clearTimeout(timer);
  timer = setTimeout(() => {
      setMessage("");
    }, duration);
}

export async function toggleTheme() {
    const themeIcon = document.getElementById("theme-icon");
    const html = document.documentElement;
    const isDark = html.getAttribute("data-theme") === "dark";

    if (isDark) {
      html.setAttribute("data-theme", "light");
      if (themeIcon) themeIcon.className = "fas fa-sun has-text-warning";
    } else {
      html.setAttribute("data-theme", "dark");
      if (themeIcon) themeIcon.className = "fas fa-moon";
    }
};

export async function toggleLanguage() {
  const current= get(language);
  const next= current === 'en' ? 'de':'en';
  language.set(next);
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace(`/${current}`, `/${next}`);
  await goto(newPath);
}