<template>
    <div class="base-table-filters" :class="{ inactive }">
        <h6 class="d-flex align-items-center mb-30">
            <cata-ui-icon class="mr-5" :icon="'bi-funnel-fill'" />
            Filters
        </h6>
        <slot name="customFields"></slot>
        <template v-for="(filter, i) in filters">
            <CataUiInputDate class="filter-elm" v-if="filter.type === 'datetime' || filter.type === 'datetimehour'"
                :key="`${prefix}${filter.key}`" :label="filter.value" :disabled="filters[i].disabled"
                v-model="filters[i].model" @input="filterChange" />
            <CataUiInputSelect class="filter-elm" v-else-if="filter.dataSource" :key="`${prefix}${filter.key}`"
                :options="filter.key === 'campaign' ? campaignlist : filter.dataSource" :label="filter.value"
                :disabled="filters[i].disabled" :singleSelect="false" v-model="filters[i].model"
                @click.native="filterClicked(filter.key)" @input="filterChange" />
            <CataUiInput type="text" class="filter-elm" v-else :key="`${prefix}${filter.key}`" :label="filter.value"
                :disabled="filters[i].disabled" v-model="filters[i].model" @input="filterChange" />
        </template>
        <CataUiButton :type="'tertiary'" :label="'Clear filters'" @click="clearFilters()" />
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import {
        CataUiInput, CataUiButton, CataUiIcon, CataUiInputDate, CataUiInputSelect,
    } from '@catalyst/ui-library';
    import { debounce } from 'lodash';
    import { EVENTS } from '@/constants/Events.js';

    const emits = defineEmits([
        EVENTS.FILTER_CHANGE,
        EVENTS.CLEAR_FILTERS,
    ]);

    const props = defineProps({
        filters: Array,
        prefix: {
            type: String,
            default: '',
        },
        inactive: {
            type: Boolean,
            default: false,
        },
    });

    const activeFilters = computed(() => {
        if (props.filters) {
            return props.filters.filter((e) => e.model);
        }
        return [];
    });

    const queryStr = computed(() => {
        const filters = {};
        activeFilters.value.forEach((e) => {
            filters[e.key] = e.model;
        });
        return filters;
    });

    // eslint-disable-next-line func-names
    const filterChange = debounce(() => {
        emits(EVENTS.FILTER_CHANGE, queryStr);
    }, 800);

    function clearFilters() {
        emits(EVENTS.CLEAR_FILTERS);
        document.activeElement.blur();
    }

</script>
<style lang="scss" scoped>
    .base-table-filters {
        width: 350px;
        padding: 30px;
        height: 100%;
        overflow-y: auto;
        background-color: var(--color-white);
        border-left: 1px solid var(--color-grey-400);
        position: relative;

        &.inactive {
            &:before {
                content: "";
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999;
                display: block;
                position: absolute;
                background-color: rgba(var(--color-white), 0.7);
            }
        }
    }

    .filter-elm {
        padding-bottom: 20px;

        &:last-child {
            padding-bottom: 0;
        }
    }
</style>
