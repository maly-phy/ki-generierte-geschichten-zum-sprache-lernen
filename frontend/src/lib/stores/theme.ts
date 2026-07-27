import {writable} from 'svelte/store';
import {browser} from '$app/environment';

function createThemeStore() {
    // const initialTheme = browser ? document.documentElement.getAttribute('data-theme') ?? 'light': 'light';
    const initialTheme= browser ? localStorage.getItem('theme') ?? 'light':'light';
    const {subscribe, set} = writable(initialTheme);
    return {
        subscribe,
        set: (value:string) => {
            if (browser) {
                localStorage.setItem('theme', value);
            }
            set(value);
        }
    }
}

export const theme = createThemeStore();