import { get } from 'svelte/store';
import {theme,language} from '$lib/stores/items';
import { goto } from '$app/navigation';

let timer: ReturnType<typeof setTimeout>;

export function messageControl(setMessage: (text: string) => void, text: string, duration: number = 3000): void {
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
  if(currentPath.startsWith(`/${current}`)) {
    const newPath = currentPath.replace(`/${current}`, `/${next}`);
    await goto(newPath);
  }
}