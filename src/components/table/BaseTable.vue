<template>
    <div class="base-table-wrapper" :class="{ inactive }">
        <table class="base-table" ref="baseTable" :class="{ small, 'enable-hover': enableHover }">
            <thead>
                <tr @click="toggleRows()">
                    <th class="checkbox-container" v-if="!collapseControls && !expandable" :style="stickyTH">
                        <CataUiInputCheckbox v-if="selectable" v-model="checkAllRows" />
                    </th>
                    <th v-if="expandable"
                        class="text-center"
                        :class="{
                            expandable,
                        }"
                        :style="stickyTH">
                        <CataUiIcon v-if="rows.length > 0 && rows[0].details.length > 1"
                            class="expand-icon"
                            :icon="expanded ? 'bi-caret-down-fill' : 'bi-caret-right-fill'"
                            :color="expanded ? 'var(--wpp-primary-color-400)' : 'var(--wpp-grey-color-400)'"
                            :size="'16'" />
                    </th>
                    <th :style="stickyTH"
                        v-for="column in columns"
                        :key="column.id"
                        @click="sortByColumn(column)"
                        :class="{
                            actions: column.key === 'actions',
                            active: sortColumn === column.key,
                            sortable: sortable && column.key !== 'actions' && column.type != 'link',
                            expandable,
                        }">
                        <template v-if="column.key !== 'actions' && column.type != 'link'">
                            {{ column.value }}
                            <CataUiIcon class="sort-icon" v-if="sortable" :icon="'bi-chevron-expand'" :size="'16'" />
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody v-if="rows">
                <template v-for="row in rows">
                    <template v-for="(subrow) in row.details">
                        <tr :class="{ expandable: expandable && subrow.details.length === 1 }"
                            v-if="(expandable & expanded) || shouldExpand(row)"
                            :key="subrow.id"
                            @click="expandSubrow(subrow.id)">
                            <td class="text-center">
                                <CataUiIcon v-if="subrow.details.length > 1"
                                    class="expand-icon"
                                    :icon="subrowExpanded[subrow.id] ? 'bi-caret-down-fill' : 'bi-caret-right-fill'"
                                    :color="subrowExpanded[subrow.id] ? 'var(--wpp-primary-color-400)' : 'var(--wpp-grey-color-400)'"
                                    :size="16" />
                            </td>
                            <td :style="{
                                    'max-width': `${maxWidthCell}px`,
                                    'min-width': minWidthCell && minWidthCell[column.key]
                                        ? `${minWidthCell[column.key]}px` : '0px',
                                }"
                                v-for="column in columns"
                                :key="column.key">
                                <template>
                                    <span
                                        :title="formatValue(subrow[column.key].value || subrow[column.key], column.type)">
                                        {{ formatValue(subrow[column.key], column.type) }}
                                    </span>
                                </template>
                            </td>
                        </tr>
                        <template v-if="subrow.details.length > 1 && subrowExpanded[subrow.id]">
                            <tr class="subrow-details"
                                v-for="(subrow_level2) in subrow.details"
                                :key="subrow_level2.id">
                                <td class="d-flex text-center align-items-start pt-1"></td>
                                <td :style="{
                                        'max-width': `${maxWidthCell}px`,
                                        'min-width': minWidthCell && minWidthCell[column.key]
                                            ? `${minWidthCell[column.key]}px` : '0px',
                                    }"
                                    v-for="column in columns"
                                    :key="column.key">
                                    <template>
                                        <span :title="formatValue(subrow_level2[column.key], column.type)">
                                            {{ formatValue(subrow_level2[column.key], column.type) }}
                                        </span>
                                    </template>
                                </td>
                            </tr>
                        </template>
                    </template>
                    <tr v-if="(expandable && row.details.length) > 1 || (expandable && row.details[0].details.length > 1) || !expandable"
                        :class="{
                            active: checkedRowsProxy.includes(row.id),
                            static: row.showInAction === false,
                            trRelative,
                            activeSelected: activeRowIndex === row._id && enableSingleSelect,
                            expandable,
                            bold: expandable,
                        }"
                        :key="row.id"
                        @click="setActiveRow(row._id)">
                        <td class="checkbox-container" v-if="!collapseControls">
                            <CataUiInputCheckbox v-model="checkedRowsProxy"
                                v-if="selectable && row.showInAction !== false"
                                :val="row.id"
                                @input="$emit(EVENTS.ROW_CHECKED, proxy)" />
                        </td>
                        <td :class="{
                                actions: column.key === 'actions',
                                fixedActions: fixedActions && column.key === 'actions',
                            }"
                            :style="{
                                'max-width': `${maxWidthCell}px`,
                                'min-width': minWidthCell && minWidthCell[column.key]
                                    ? `${minWidthCell[column.key]}px` : '0px',
                            }"
                            v-for="column in columns"
                            :key="column.key"
                            @keydown.enter="rowClicked($event, row, column)"
                            @click="rowClicked($event, row, column)">
                            <template
                                v-if="(row[column.key] !== undefined && row[column.key] !== null) && column.key !== 'actions'">
                                <img alt=""
                                    v-if="row[column.key].icon"
                                    :src="row[column.key].icon"
                                    :class="column.key" />
                                <span class="table-bi-icon"
                                    v-else-if="row[column.key].biicon"
                                    :style="{ color: row[column.key].color }"
                                    :class="row[column.key].biicon"></span>
                                <CataUiStatusLabel v-if="row[column.key].type"
                                    :font-size="12"
                                    :label="row[column.key].value"
                                    :color="row[column.key].color" />
                                <template v-else-if="column.type === 'link'">
                                    <slot name="linkHandler" :link="{ row, columnKey: column.key }"></slot>
                                </template>
                                <template v-else-if="column.type === 'number'">
                                    <span class="d-flex justify-content-end pr-45">{{ formatCount(row[column.key]) }}</span>
                                </template>
                                <template v-else>
                                    <span :title="formatValue(row[column.key].value || row[column.key], column.type)">
                                        {{ formatValue(row[column.key], column.type) }}
                                    </span>
                                </template>
                            </template>
                            <template v-if="column.key === 'actions'">
                                <slot name="actionButton" :row="row"></slot>
                            </template>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
        <p class="no-matches" v-if="(rows && rows.length <= 0 || !rows) && showNoMatchLabel">
            No matches found
        </p>
    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue';
    import dayjs from 'dayjs';
    import { CataUiIcon, CataUiInputCheckbox, CataUiStatusLabel } from '@catalyst/ui-library';
    import { EVENTS } from '@/constants/Events.js';

    const emits = defineEmits(['rowChecked', 'rowClicked', 'columnSorted']);
    const props = defineProps({
        rows: Array,
        columns: Array,
        stickyHeader: Number,
        showNoMatchLabel: {
            type: Boolean,
            default: true,
        },
        inactive: {
            type: Boolean,
            default: false,
        },
        selectable: {
            type: Boolean,
            default: true,
        },
        sortable: {
            type: Boolean,
            default: true,
        },
        collapseControls: {
            type: Boolean,
            default: false,
        },
        small: {
            type: Boolean,
            default: false,
        },
        trRelative: {
            type: Boolean,
            default: false,
        },
        checkedRows: {
            type: Array,
            default: () => [],
        },
        fixedActions: {
            type: Boolean,
            default: true,
        },
        enableHover: {
            type: Boolean,
            default: true,
        },
        maxWidthCell: {
            type: String,
            default: '400',
        },
        minWidthCell: {
            type: Object,
        },
        enableSingleSelect: {
            type: Boolean,
            default: false,
        },
        expandable: {
            type: Boolean,
            default: false,
        },
    });

    const sortColumn = ref(null);
    const checkAllRows = ref(false);
    const sortOrder = ref(1);
    const proxy = ref([]);
    const activeRowIndex = ref(null);
    const expanded = ref(false);
    const subrowExpanded = ref({});

    const checkedRowsProxy = computed(
        {
            get() { return props.checkedRows; },
            set(value) {
                proxy.value = value;
            },
        },
    );

    const stickyTH = computed(() => {
        if (props.stickyHeader !== undefined) {
            return `position: sticky; z-index: 10; top: ${props.stickyHeader}px;`;
        } return '';
    });

    function toggleRows() {
        if (props.expandable && props.rows.length > 0) {
            expanded.value = !expanded.value;
            if (expanded.value === false) {
                subrowExpanded.value = {};
            }
        }
    }
    function shouldExpand(row) {
        return (props.expandable && row.details.length === 1);
    }
    function expandSubrow(subrowId) {
        if (subrowExpanded[subrowId]) {
            subrowExpanded[subrowId] = !subrowExpanded[subrowId];
        } else {
            this.$set(subrowExpanded, subrowId, true);
        }
    }
    function setActiveRow(index) {
        activeRowIndex.value = index;
    }
    function rowClicked(event, row, column) {
        if (column.key !== 'actions' && column.type !== 'link' && row.showInAction !== false) {
            emits('rowClicked', { event, row });
        }
    }
    function sortByColumn(column) {
        if (props.sortable && column.key !== 'actions' && column.type !== 'link') {
            if (sortColumn.value === column.key) sortOrder.value *= -1;
            else {
                sortColumn.value = column.key;
                sortOrder.value = 1;
            }
            emits('columnSorted', { sortColumn: sortColumn.value, sortOrder });
        }
    }

    function formatValue(value, type) {
        let val = '';
        if (typeof value === 'object') {
            val = value.value;
        } else {
            val = value;
        }

        if (type === 'datetime') {
            const date = dayjs(new Date(val));
            return dayjs(date).format('DD MMM YYYY');
        }
        if (type === 'datetimehour') {
            const date = dayjs(new Date(val));
            return dayjs(date).format('DD MMM YYYY, HH:mm');
        }
        if (type === 'number' || ((typeof val === 'number' || (typeof val === 'string' && !Number.isNaN(Number(val)))) && String(val).trim() !== '')) {
            const numValue = typeof val === 'string' ? Number(val) : val;
            return numValue.toLocaleString();
        }
        return val;
    }

    function formatCount(count) {
        if (count === undefined || count === null) return '';
        const numCount = typeof count === 'string' ? parseInt(count, 10) : count;
        return numCount.toLocaleString();
    }

    watch(checkAllRows, (status) => {
        if (status === 'true' || status === true) {
            props.rows.forEach((row) => {
                if (!proxy.value.includes(row.id) && row.showInAction !== false) {
                    proxy.value.push(row.id);
                }
            });
        } else proxy.value = [];
        emits('rowChecked', proxy.value);
    });

</script>
<style lang="scss" scoped>
    p {
        font-size: 14px;
        text-align: center;
        margin-top: 20px;
    }

    .base-table-wrapper {
        position: relative;
        padding-left: 20px;

        &.inactive {
            opacity: 0.3;

            &:before {
                content: "";
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999;
                display: block;
                position: absolute;
            }
        }
    }

    .base-table {
        width: 100%;
        color: var(--color-grey-1000);
        border-spacing: 0;
        position: relative;
        border-collapse: separate;
        background-color: var(--color-white);

        &.small {

            th,
            td {
                height: 40px;
                font-size: 13px;
            }
        }

        th,
        td {
            height: 45px;
            font-size: 14px;
            line-height: 18px;
            padding: 0 11px;
            text-overflow: ellipsis;
            vertical-align: middle;
            white-space: nowrap;
            overflow: hidden;
            max-width: 400px;
            border-bottom: 1px solid var(--color-grey-100);

            img {
                max-width: 15px;
                margin-right: 2px;
                box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.1);

                &.campaignsName {
                    box-shadow: none;
                    max-width: 15px;
                    vertical-align: -1px;
                }
            }

            &.checkbox-container {
                width: 46px;
                min-width: 46px;
                padding: 0;
                text-align: center;
            }

            &.actions {
                width: 1%;
                min-width: 46px;
                overflow: initial;
                cursor: initial;

                &.fixedActions {
                    background-color: var(--color-white);
                    border-left: 1px solid var(--wpp-grey-color-100);
                    position: sticky;
                    right: 0;
                    z-index: 1;
                }
            }

            &.checkbox-container {
                cursor: initial;

                div {
                    justify-content: center;
                }
            }

            &.fixedWidth {
                max-width: 200px;
            }
        }

        th {
            font-weight: bold;
            text-transform: uppercase;
            overflow: hidden;
            border-bottom: 2px solid var(--color-grey-300);
            background-color: var(--color-white);

            &.expandable {
                text-transform: none;
                background-color: #f9f9f9;
            }

            .expand-icon {
                cursor: pointer;
            }

            .sort-icon {
                display: inline;
                color: var(--wpp-grey-color-400);
                margin-left: 4px;
                vertical-align: -1px;

                &:deep(.ui-icon) {
                    display: inline;
                }
            }

            &.sortable {
                cursor: pointer;
            }

            &.active {
                .sort-icon {
                    color: var(--color-grey-1000);
                }

                &:after {
                    content: "";
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background-color: var(--color-grey-1000);
                }
            }

            &.actions {
                border-left: none;
            }
        }

        tbody tr {
            &.static {
                cursor: initial;
            }

            &.trRelative {
                transform: scale(1);
            }

            &.active {
                background-color: var(--color-grey-100);
            }

            &.activeSelected {
                background-color: var(--color-grey-400);
            }

            &.expandable {
                cursor: initial;
            }

            &.bold {
                font-weight: bold;
                background-color: #f9f9f9;
            }

        }

        .subrow-details {
            background-color: var(--color-grey-100);
            cursor: none;

        }

        .subrow-details:hover {
            cursor: auto;
        }

        .base-table-expand {
            cursor: initial;

            td {
                height: auto;
                overflow: visible;
                background-image: linear-gradient(var(--color-white), var(--color-grey-100));
            }
        }

        &.enable-hover tr {
            cursor: pointer;

            &:hover:not(.base-table-expand) {
                background-color: var(--color-grey-100);

                td:first-child {
                    position: relative;

                    &:before {
                        background-color: var(--color-grey-1000);
                        content: "";
                        height: 100%;
                        left: 0;
                        position: absolute;
                        top: 0;
                        width: 3px;
                    }
                }
            }

        }
    }

    .no-matches {
        padding: 20px 0;
        margin-top: 0;
        background-color: var(--color-grey-100);
    }

    .table-bi-icon {
        font-size: 16px;
        display: inline-block;
        margin-right: 4px;
    }
</style>
