const sveltePreprocess = require('svelte-preprocess');

export default {
    preprocess: sveltePreprocess({
        scss: {
            includePaths: ['theme'],
        },
    }),
};