# segment-manager

This library exports:

export { default as SegmentManagerModal } from '@/components/segmentManagerModal/SegmentManagerModal.vue';
export { default as CustomSegments } from '@/components/segmentManager/CustomSegments.vue';
export { default as StandardSegments } from '@/components/segmentManager/StandardSegments.vue';
export { useSegmentManagerStore } from '@/store/segmentManagerStore';
export { useCustomSegmentStore } from '@/store/customSegments/customSegmentStore';

If you experience update problems do not just pass the props but import the stores from this package and set the required values
(which are the same as the props below)

When using the below components you will need to use the following props:
For Standard segments:
const props = defineProps({
baseUrl: {
default: 'http://localhost:5000',
type: String,
required: true,
},
tenantId: {
default: '',
type: String,
required: true,
},
brandId: {
default: 1,
type: Number,
required: true,
},
token: {
default: '',
type: String,
required: true,
},
});

For Custom Segments:

const props = defineProps({
segment: Object,
customSegmentUrl: {
default: 'http://localhost:5000',
type: String,
required: true,
},
tenantId: {
default: '',
type: String,
required: true,
},
brandId: {
default: 1,
type: Number,
required: true,
},
token: {
default: '',
type: String,
required: true,
},
});

When using the whole modal component:

     const props = defineProps({
        baseUrl: {
            default: 'http://localhost:5000',
            type: String,
            required: true,
        },
        customSegmentUrl: {
            default: 'http://localhost:5000',
            type: String,
            required: true,
        },
        token: {
            default: '',
            type: String,
            required: true,
        },
        tenantId: {
            default: '',
            type: String,
            required: true,
        },
        brandId: {
            default: 1,
            type: Number,
            required: true,
        },
        profile: {
            required: true,
            type: Object,
        },
    });

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests and create coverage report with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Compile and Hot-Reload documentation site for Development [VuePress](https://v2.vuepress.vuejs.org/)

```sh
npm run docs:dev
```

### Compile and Minify documentation site for Production

```sh
npm run docs:build
```
