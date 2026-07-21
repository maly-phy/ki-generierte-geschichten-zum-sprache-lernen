import adapter from '@sveltejs/adapter-auto';
import { preprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: preprocess({
        scss: {
            prependData: "@import '$lib/styles/style.scss';"
        }
    }),
    onwarn: (warning, handler) => {
        // Suppress warnings about unused CSS selectors
        const {code, frame} = warning;
        if (code === 'css-unused-selector') return;
        handler(warning);
    },
    kit: {
        adapter: adapter()
    }
};