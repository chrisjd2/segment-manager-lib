<template>
    <div ref="targetELement" class="observer" style="height:3px;">
        <slot></slot>
    </div>
</template>

<script setup>
    import { onMounted, onUnmounted, ref } from 'vue';

    const emits = defineEmits(['intersecting']);
    const props = defineProps({ options: Object });
    const options = props.options || {};
    const observer = new IntersectionObserver(([entry]) => {
            emits('intersecting', entry.isIntersecting);
        }, options);

    const targetELement = ref(null);
    onMounted(() => {
       
        if(targetELement.value) {
              observer.observe(targetELement.value);
        }
    });
    onUnmounted(() => {
            observer.disconnect();
    });
</script>
