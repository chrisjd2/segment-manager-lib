<template>
    <div class="ai-query-feedback" :class="[feedback.type]" v-if="feedback">
        <div class="feedback-title-wrapper">
            <CataUiIcon class="pr-2"
                size="16px"
                :icon="iconMapper[feedback?.type]"
                :color="iconMapper[`icon-color-${feedback?.type}`]" />
            <div class="title">{{ feedback.title }}</div>
        </div>
        <p class="feedback-text">{{ feedback?.text }}</p>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { CataUiIcon } from '@catalyst/ui-library';

    const props = defineProps({
        feedback: {
            type: Object,
            default: () => ({
                title: 'Ai Assumption',
                text: '',
                type: 'info',
            }),
        },
    });

    const iconMapper = {
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill',
        query: 'bi-magic',
        'icon-color-warning': '#FA5D05',
        'icon-color-info': '#8B919A',
        'icon-color-query': '#528233',
    };
</script>

<style lang="scss" scoped>
    $color-info: #E7EAEE;
    $color-warning: #FFECE0;
    $color-query: #e2f0d9;

    .ai-query-feedback {
        padding: 12px 16px;
        margin: 10px 10px 10px 0px;
        border-radius: 8px;

        &.info {
            background-color: $color-info;
        }

        &.warning {
            background-color: $color-warning;
        }

        &.query {
            background-color: $color-query;
        }
    }

    .feedback-title-wrapper {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        color: #121619;
        display: flex;
        align-items: center;
    }

    .title {
        padding-left: 10px;
    }

    .feedback-text {
        padding-top: 5px;
        margin-left: 25px;
        font-size: 14px;
    }

</style>
