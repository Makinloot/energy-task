const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                signin: resolve(__dirname, "html/signin.html"),
                signup: resolve(__dirname, "html/signup.html"),
                results: resolve(__dirname, "html/results.html"),
                reset: resolve(__dirname, 'html/reset.html')
            },
        },
    },
});