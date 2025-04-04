import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/*'],
            root: fileURLToPath(new URL('./', import.meta.url)),
            reporters: ['json', 'junit', 'default'],
            outputFile: {
                junit: 'test-results/junit-report.xml',
                json: 'test-results/json-report.json',
            },
            coverage: {
                reporter: ['text', 'clover', 'json', 'cobertura'],
            },
        },
    }),
);
