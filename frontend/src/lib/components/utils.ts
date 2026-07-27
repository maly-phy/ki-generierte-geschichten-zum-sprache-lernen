import { get } from 'svelte/store';
import { language } from '$lib/stores/language';
import {theme} from '$lib/stores/theme';
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
  theme.set(get(theme) === 'dark' ? 'light':'dark');
};

export async function toggleLanguage() {
  const current= get(language);
  const next= current === 'en' ? 'de':'en';
  language.set(next);
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace(`/${current}`, `/${next}`);
  await goto(newPath);
}