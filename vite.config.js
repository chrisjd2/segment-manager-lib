import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.js'),
            name: 'CataSegmentBuilder',
            fileName: 'index',
        },
        commonjsOptions: {
            esmExternals: true,
        },
        rollupOptions: {
            external: [
                '@catalyst/ui-library',
                '@catalyst/ui-wrapper',
                '@catalyst-core/ui-library',
                '@vueuse/core',
                'axios',
                'uuid',
                'pinia',
                'vue',
                'dayjs',
                'sass',
                'bootstrap',
                'vue3-smooth-dnd',
                'lottie-web-vue',
            ],
            output: {
                globals: {
                    '@catalyst/ui-library': 'UiLibrary',
                    '@catalyst/ui-wrapper': 'UiWrapper',
                    '@catalyst-core/ui-library': 'CoreUiLibrary',
                    '@vueuse/core': 'VueUse',
                    axios: 'Axios',
                    uuid: 'Uuid',
                    pinia: 'Pinia',
                    vue: 'Vue',
                    dayjs: 'Dayjs',
                    sass: 'Sass',
                    bootstrap: 'Bootstrap',
                    'vue3-smooth-dnd': 'Vue3SmoothDnd',
                    'lottie-web-vue': 'Vue3Lottie',
                },
            },
        },
    },
});
