import { get } from 'svelte/store';
import {theme,language} from '$lib/stores/items';
import { goto } from '$app/navigation';
import type {Action} from 'svelte/action';

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

// export const clickOutside: Action<HTMLElement, undefined> {
//   onclickOutside: CustomEvent<void>
// }
// >= (node) => {
//   const handleClick = (event: MouseEvent) => {
//     if (!node.contains(event.target as Node)) {
//       Node.dispatchEvent(new CustomEvent('clickoutside'))
//   }
// };

//   document.addEventListener("click", handleClick, true);

//   return {
//     destroy() {
//       document.removeEventListener("click", handleClick, true);
//     },
//   };
// }


export const clickOutside: Action<
  HTMLElement,
  () => void
> = (node, callback) => {
  const handleClick = (event: MouseEvent) => {
    if (!node.contains(event.target as Node)) {
      callback?.();
    }
  };

  document.addEventListener("click", handleClick, true);

  return {
    update(newCallback) {
      callback = newCallback;
    },
    destroy() {
      document.removeEventListener("click", handleClick, true);
    }
  };
};