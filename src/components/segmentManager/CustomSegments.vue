<template>
    <div class="query-builder">
        <div class="query-builder-left">
            <CataUiSpinner class="query-builder-left-loader" v-if="fetchingPlatforms" size="xlarge" />
            <template v-else>
                <div class="query-tabs">
                    <CataUiTabs :tabs="tabHeaders" v-model="tabActive" type="secondary" size="large" />
                </div>
                <div class="source">
                    <CataUiInputSelect :style="{ width: '45%' }"
                        class="source w-100"
                        :options="platforms"
                        v-model="platform"
                        label="Source" />
                    <CataUiInputSelect :style="{ width: '45%' }"
                        class="source w-100"
                        :options="locations"
                        v-model="location"
                        label="Server Location" />
                    <CataUiInput :style="{ width: 'fit-content' }"
                        hasDefaultValue
                        class="source w-100"
                        disabled
                        v-if="segmentManagerStore.brief.market"
                        v-model="segmentManagerStore.brief.market"
                        label="Market" />
                </div>
                <template v-if="platform && location">
                    <QueryAttributesList
                        v-if="tabActive.id === 1"
                        :tables="customSegmentStore.get_databaseModel.tables"
                        :collapsed="collapsedAttributes"
                        :fetching="fetchingDataBaseModel"
                        @click-attribute="addNewQueryByClick"
                        @drag-start="setDragging(true)"
                        @drag-end="setDragging(false)"
                        @toggle-group="toggleGroup" />
                    <div class="ai-query-tab" v-if="tabActive.id === 2">
                        <CataUiInput class="mt-15 ai-query"
                            label="Description"
                            type="textarea"
                            :textArea="true"
                            v-model="aiDescription" />
                        <CataUiButton class="mt-15"
                            size="small"
                            label="Generate Query"
                            :disabled="!aiDescription"
                            :loading="aiGeneratingQuery"
                            @click="generateQuery()" />
                        <AiQueryFeedback :feedback="customSegmentStore.get_aiGeneratedMessage" v-if="customSegmentStore.get_aiGeneratedMessage" />
                        <AiQueryFeedback :feedback="customSegmentStore.get_aiGeneratedQuery" v-if="customSegmentStore.get_aiGeneratedQuery" />
                    </div>
                    <div class="" v-if="tabActive.id === 3">
                        <FreeForm />
                    </div>
                </template>
            </template>
        </div>
        <div class="query-builder-right">
            <div class="query-content-scrollable">
                <div class="query-editor-wrapper">
                    <div>
                        <div class="query-editor-title pb-20">Query Builder</div>
                        <div class="query-runner-button-wrapper">
                            <CataUiButton
                                icon="bi-caret-right"
                                class="run-query-button"
                                type="transparent"
                                label="Run Querys"
                                :disabled="!platform || !location"
                                :loading="savingDraft"
                                @click="runQuery()" />

                            <CataUiButton
                                class="run-query-button ml-10"
                                type="secondary"
                                size="small"
                                label="Save Querys"
                                :disabled="!segmentModel.name || !segmentModel.description || !segmentCount || segmentSaved"
                                :loading="savingSegment"
                                @click="saveSegment()" />

                        </div>

                    </div>
                    <div class="query-editor" v-if="tabActive.id !== 3">

                        <div class="queries">
                            <div class="query-outer" v-for="(query, index) in segmentModel.conditions" :key="query.id">
                                <div class="query" v-if="query.group">
                                    <div class="collapse-subQuery"
                                        @click="toggleQueryCollapse(query.id)"
                                        @keydown.enter="toggleQueryCollapse(query.id)">
                                        <CataUiIcon :icon="collapsedQueries.indexOf(query.id) === -1
                                                        ? 'bi-arrows-collapse'
                                                        : 'bi-arrows-expand'
                                                    "
                                            size="18px"
                                            color="#212121" />
                                    </div>
                                    <div class="w-100 pr-10">
                                        <div class="sub-query-outer" v-if="collapsedQueries.indexOf(query.id) === -1">
                                            <div class="sub-queries" v-for="subquery in query.group">
                                                <div class="query-operator-inner"
                                                    v-if="subquery.logic && collapsedQueries.indexOf(query.id) === -1"
                                                    :style="{ width: 'fit-content' }">
                                                    <CataUiInputSelect class="query-operator"
                                                        v-model="subquery.logic"
                                                        :singleSelect="true"
                                                        :options="operatorsQueries"
                                                        :hasDefaultValue="true" />
                                                </div>
                                                <div class="sub-query" v-if="subquery.statement" :class="{ 'single-subquery': query.group.length === 1 }">
                                                    <CataUiInput readonly v-model="subquery.statement[0]" />
                                                    <CataUiInputSelect v-model="subquery.statement[1]"
                                                        :singleSelect="true"
                                                        :options="getSubQueryOptions(subquery.input_type)"
                                                        :hasDefaultValue="true" />
                                                    <CataUiInputSelect v-if="subquery.selectors.length < 3
                                                                           && subquery.selectors.length > 0"
                                                        v-model="subquery.statement[2]"
                                                        :options="subquery.selectors" />
                                                    <CataUiInputSelect v-if="subquery.selectors.length > 2
                                                                           && subquery.input_type !== 'boolean'"
                                                        v-model="subquery.statement[2]"
                                                        :options="subquery.selectors"
                                                        :multipleSelect="true" />
                                                    <CataUiInput v-if="subquery.input_type === 'int'"
                                                        v-model="subquery.statement[2]"
                                                        :error="subquery.statement[2] ? '' : errorMessage" />
                                                    <CataUiInput v-if="subquery.input_type === 'string'"
                                                        v-model="subquery.statement[2]"
                                                        :error="subquery.statement[2] ? '' : errorMessage" />
                                                    <CataUiInputDate v-else-if="subquery.input_type === 'date'"
                                                        v-model="subquery.statement[2]"
                                                        :range="subquery.statement[1] === '$bt' || subquery.statement[1] === '$nbt'"
                                                        :error="subquery.statement[2] ? '' : errorMessage" />
                                                    <CataUiIcon class="remove-subQuery"
                                                        icon="bi-x"
                                                        size="25px"
                                                        color="#0014CC"
                                                        @click="removeSubQuery(query.id, index, subquery.id)" />
                                                </div>
                                            </div>
                                        </div>
                                        <p class="pt-3 pb-2" v-else>
                                            <span v-for="(subquery, i) in query.group" :key="subquery.id">
                                                <span v-if="subquery.statement">
                                                    <b>{{ subquery?.statement[0] }}</b>
                                                    {{ getOperatorText(subquery.input_type, subquery?.statement[1]) }}
                                                    <b>{{ subquery?.statement[2] || "?" }}</b>
                                                </span>
                                                <span v-else class="px-2">
                                                    {{
                                                        getOperatorText("operatorsQueries", subquery.logic)
                                                    }}
                                                </span>
                                            </span>
                                        </p>
                                        <Container v-if="dragging && maxFieldCounter < customSegmentStore.settings.maxSubQuery"
                                            behaviour="drop-zone"
                                            group-name="1"
                                            :should-animate-drop="() => false"
                                            @drag-enter="queryType = query.id"
                                            @drop="addNewQuery">
                                            <div class="drop-indicator mb-15"></div>
                                        </Container>
                                    </div>
                                    <!-- <div class="collapse-subQuery"
                                        @click="toggleQueryCollapse(query.id)"
                                        @keydown.enter="toggleQueryCollapse(query.id)">
                                        <CataUiIcon :icon="collapsedQueries.indexOf(query.id) === -1
                                                        ? 'bi-arrows-collapse'
                                                        : 'bi-arrows-expand'
                                                    "
                                            size="18px"
                                            color="#212121" />
                                    </div> -->
                                </div>
                                <div class="query-operator-outer"
                                    v-if="segmentModel.conditions.length > 1 && index < segmentModel.conditions.length - 1 && query.logic">
                                    <CataUiInputSelect class="query-operator"
                                        v-model="query.logic"
                                        :singleSelect="true"
                                        :options="operatorsQueries"
                                        :hasDefaultValue="true" />
                                </div>
                            </div>
                        </div>

                        <div class="inital-view" v-if="segmentModel.conditions.length === 0">
                            <span>
                                <img class="" alt="standardIcon" :src="svgUrl" />
                            </span>
                        </div>

                        <Container v-if="dragging && maxFieldCounter < customSegmentStore.settings.maxSubQuery || segmentModel.conditions.length === 0"
                            behaviour="drop-zone"
                            group-name="1"
                            :should-animate-drop="() => false"
                            @drag-enter="queryType = 'queryGroupDrop'"
                            @drop="addNewQuery">
                            <div class="drop-indicator"
                                :class="{
                                    'mt-25': segmentModel.conditions.length > 0,
                                    'p-5': segmentModel.conditions.length === 0,
                                }">
                                <span v-if="segmentModel.conditions.length <= 0">
                                    Drag and drop attributes or AI generated rules
                                </span>
                            </div>
                        </Container>
                    </div>
                </div>
                <div class="query-results-wrapper" v-if="savingDraft || showSegmentQueryResults">
                    <CustomExploreThumbnail :segmentData="segmentCount" :segmentCount="segmentCount" v-if="!savingDraft && showSegmentQueryResults" />
                    <div v-if="savingDraft" class="loading-query-run">
                        <CataUiSpinner size="xlarge" class="mt-3" />
                        <p class="mt-3">Running query...</p>
                    </div>

                    <div v-if="segmentStep === 'saving' || segmentStep === 'generating'" class="loading-query-run">
                        <CataUiSpinner size="xlarge" class="mt-3" />
                        <p v-if="segmentStep === 'saving'" class="mt-3">Saving segment...</p>
                        <p v-else class="mt-3">Generating insights...</p>
                    </div>

                    <ThumbnailCard
                        v-if="segmentStep === 'done' && segmentThumbnail"
                        :selectedSegment="segmentThumbnail"
                        :location="'custom'"
                        @showInsightsExplorer="openExplore" />

                </div>
            </div>
            <div class="query-builder-footer">
                <div class="query-builder-footer-fields">
                    <CataUiInput
                        required
                        class="segment-name"
                        label="Segment name"
                        v-model="segmentModel.name"
                        type="text" />
                    <CataUiInput
                        class="segment-name"
                        label="Segment description"
                        v-model="segmentModel.description"
                        type="text" />
                    <!-- <CataUiButton class="run-query-button"
                        size="small"
                        type="secondary"
                        label="Run Query"
                        :disabled="(!segmentModel.name && tabActive.id === 1)
                            || (!segmentModel.name && tabActive.id === 2)
                            || !platform
                            || !location
                        "
                        :loading="savingDraft"
                        @click="runQuery()" /> -->
                </div>
                <div class="query-builder-footer-buttons">
                    <CataUiButton type="secondary"
                        label="Explore"
                        size="small"
                        @click="openExplore()"
                        class="mx-1"
                        :disabled="!segmentCount
                            || (!segmentModel.name && tabActive.id === 1)
                            || (!segmentModel.name && tabActive.id === 2)
                            || (segmentModel.conditions.length <= 0 && tabActive.id !== 3)
                            || !generatedInsights
                        " />
                    <CataUiButton size="small"
                        label="Push to destination"
                        :disabled="!segmentCount
                            || (!segmentModel.name && tabActive.id === 1)
                            || (!segmentModel.name && tabActive.id === 2)
                            || (segmentModel.conditions.length <= 0 && tabActive.id !== 3)
                        "
                        @click="insertSegment()" />
                </div>
            </div>
        </div>
        <PushModal v-if="showPushModal" @close="showPushModal = false" />
    </div>
</template>

<script setup>
    import { ref, watch, onMounted, nextTick } from 'vue';
    import { v4 as uuidv4 } from 'uuid';
    import {
        CataUiInputSelect,
        CataUiInputDate,
        CataUiTabs,
        CataUiInput,
        CataUiIcon,
        CataUiButton,
        CataUiSpinner,
    } from '@catalyst/ui-library';
    import { Container, Draggable } from 'vue3-smooth-dnd';
    import AiQueryFeedback from '@/components/app/AiQueryFeedback.vue';
    import { useCustomSegmentStore } from '@/store/customSegments/customSegmentStore';
    import { useSegmentManagerStore } from '@/store/segmentManagerStore';
    import svgUrl from '@/components/images/standard.svg';
    import CustomExploreThumbnail from '@/components/cards/ExploreThumbnail.vue';
    import QueryAttributesList from '@/components/customSegmentComponents/QueryAttributesList.vue';
    import ThumbnailCard from '@/components/cards/ThumbnailCard.vue';
    import PushModal from '@/components/app/PushModal.vue';
    import FreeForm from './FreeForm.vue';

    const props = defineProps({
        segment: Object,
        customSegmentUrl: {
            default: 'https://sm-standard-segments-838902823068.europe-west1.run.app',
            type: String,
            required: true,
        },
        tenantId: {
            default: '',
            type: String,
            required: true,
        },
        brandName: {
            default: '',
            type: String,
            required: true,
        },
        brandId: {
            default: '1',
            type: String,
            required: true,
        },
        token: {
            default: '',
            type: String,
            required: true,
        },
    });

    const segmentManagerStore = useSegmentManagerStore();
    const customSegmentStore = useCustomSegmentStore();
    const emits = defineEmits(['insertSegment', 'showInsightsExplorer']);
    const anim = ref();
    const feedback = {
        title: 'AI Assumption',
        text: 'Fetching all male customers under the age of 40. Assumption made that age is calculated based on birthdate and current date.',
        type: 'warning',
    };
    const tabHeaders = [
        {
            id: 1,
            label: 'Query Builder',
        },
        {
            id: 2,
            label: 'Ai Assisted Query',
        },
        {
            id: 3,
            label: 'Free Form',
        },

    ];
    const tabActive = ref(tabHeaders[0]);
    const locations = ref([]);
    const location = ref(locations.value[0]);
    const platforms = ref([]);
    const platform = ref(platforms.value[0]);

    const segmentCount = ref('');
    const segmentThumbnail = ref(null);

    const dragging = ref(false);
    const queryType = ref(null);

    const fetchingPlatforms = ref(true);
    const fetchingDataBaseModel = ref(false);
    const collapsedQueries = ref([]);
    const collapsedAttributes = ref([]);
    const savingDraft = ref(false);
    const showSegmentQueryResults = ref(false);
    const errorMessage = ref('');
    const aiDescription = ref('');
    const aiGeneratingQuery = ref(false);
    const segmentSaved = ref(false);
    const savingSegment = ref(false);
    const segmentStep = ref(''); // '', 'saving', 'generating', 'done'
    const generatedInsights = ref(false);
    const showPushModal = ref(false);

    const operatorsQueries = [
        { value: '$and', label: 'and' },
        { value: '$or', label: 'or' },
    ];

    const conditionBooleanComaprison = [
        { value: '$eq', label: 'equal' },
    ];

    const conditionSelectComaprison = [
        { value: '$eq', label: 'equal' },
        { value: '$neq', label: 'not equal' },
        { value: '$in', label: 'in' },
        { value: '$nin', label: 'not in' },
    ];

    const conditionStringComparisons = [
        { value: '$eq', label: 'equal' },
        { value: '$neq', label: 'not equal' },
        { value: '$bw', label: 'begins with' },
        { value: '$nbw', label: 'not begins with' },
        { value: '$ew', label: 'ends with' },
        { value: '$new', label: 'not ends with' },
    ];

    const conditionDateComparisons = [
        { value: '$eq', label: 'equal' },
        { value: '$neq', label: 'not equal' },
        { value: '$gt', label: 'greater than' },
        { value: '$gte', label: 'greater than or equal to' },
        { value: '$lt', label: 'less than' },
        { value: '$lte', label: 'less than or equal to' },
        { value: '$bt', label: 'between' },
        { value: '$nbt', label: 'not between' },
    ];

    const conditionNumericComparisons = [
        { value: '$eq', label: 'equal' },
        { value: '$lt', label: 'less than' },
        { value: '$lte', label: 'less than or equal to' },
        { value: '$gt', label: 'greater than' },
        { value: '$gte', label: 'greater than or equal to' },
    ];

    const maxFieldCounter = ref(0);
    const segmentModel = ref({
        name: '',
        description: '',
        table: '',
        joins: [],
        conditions: [

        ],
    });

    const openExplore = () => {
        segmentManagerStore.set_selectedSegmentType('custom');
        segmentManagerStore.set_activeTab('custom');
        segmentManagerStore.set_selectedSegment(segmentThumbnail.value);
        emits('showInsightsExplorer', segmentThumbnail.value);
    };

    // function convertQueryToReadable(query) {
    //     const operatorMap = {
    //         $eq: 'is equal to',
    //         $neq: 'is not equal to',
    //         $lt: 'is less than',
    //         $lte: 'is less than or equal to',
    //         $gt: 'is greater than',
    //         $gte: 'is greater than or equal to',
    //         $in: 'is in',
    //         $nin: 'is not in',
    //         $bw: 'begins with',
    //         $nbw: 'does not begin with',
    //         $ew: 'ends with',
    //         $new: 'does not end with',
    //         $bt: 'is between',
    //         $nbt: 'is not between',
    //     };

    //     return query
    //         .filter((item) => item.statement)
    //         .map(({ statement, input_type }) => {
    //             const [field, op, value] = statement;

    //             return {
    //                 field,
    //                 operator: operatorMap[op] || op,
    //                 value,
    //                 type: input_type,
    //             };
    //         });
    // }

    function convertQueryToReadableWithLogic(conditions) {
        const operatorMap = {
            $eq: 'is equal to',
            $neq: 'is not equal to',
            $lt: 'is less than',
            $lte: 'is less than or equal to',
            $gt: 'is greater than',
            $gte: 'is greater than or equal to',
            $in: 'is in',
            $nin: 'is not in',
            $bw: 'begins with',
            $nbw: 'does not begin with',
            $ew: 'ends with',
            $new: 'does not end with',
            $bt: 'is between',
            $nbt: 'is not between',
        };

        let currentLogic = '$and';

        return conditions.reduce((acc, item) => {
            if (item.logic) {
                currentLogic = item.logic;
                return acc;
            }

            if (Array.isArray(item.group)) {
                const conditionsList = item.group
                    .filter((entry) => entry.statement)
                    .map((entry) => {
                        const [field, op, value] = entry.statement;
                        return {
                            field,
                            operator: operatorMap[op] || op,
                            value,
                            type: entry.input_type,
                        };
                    });

                return [
                    ...acc,
                    {
                        logic: currentLogic,
                        conditions: conditionsList,
                    },
                ];
            }

            return acc;
        }, []);
    }

    async function generateInsights(segment) {
        const payload = {
            brandName: props.brandName,
            name: segment.name,
            description: segment.description,
            count: segment.count || segmentCount.value,
            market: segmentManagerStore.query.demographics.market,
        };

        const endpoint = `https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments/insights/${segment.segmentId}`;

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-tenant': props.tenantId,
                'brand-id': props.brandId,
                authorization: `Bearer ${props.token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.message || 'Failed to generate insights');
        }

        const result = await res.json();
    }
    async function saveSegment() {
        segmentStep.value = 'saving';
        generatedInsights.value = false;
        savingSegment.value = true;

        const payload = {
            platformId: platform.value,
            count: segmentCount.value,
            region: segmentManagerStore.query.demographics.region,
            market: segmentManagerStore.query.demographics.market,
            description: segmentModel.value.description,
            name: segmentModel.value.name,
            query: convertQueryToReadableWithLogic(segmentModel.value.conditions),
        };

        try {
            const res = await fetch('https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-tenant': props.tenantId,
                    'brand-id': props.brandId,
                    authorization: `Bearer ${props.token}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to save segment');

            segmentSaved.value = true;
            showSegmentQueryResults.value = true;

            // After saving, trigger insight generation
            segmentStep.value = 'generating';
            // eslint-disable-next-line prefer-destructuring
            segmentThumbnail.value = data.data[0];
            await generateInsights(data.data[0]); // assuming it returns the segment in data[0]

            segmentStep.value = 'done';
        } catch (err) {
            console.error('Error saving segment or generating insights:', err);
            segmentStep.value = '';
        } finally {
            savingSegment.value = false;
            generatedInsights.value = true;
        }
    }

    async function generateQuery() {
        aiGeneratingQuery.value = true;
        const payload = {
            communication_type: '',
            language: '',
            market: '',
            user_prompt: aiDescription.value,
        };
        segmentModel.value = {
            name: '',
            table: '',
            joins: [],
            conditions: [

            ],
        };
        const generatedAiInfo = await customSegmentStore.generate_ai_query(payload, platform.value, location.value);
        const generatedMessage = {
            text: generatedAiInfo.message,
            type: generatedAiInfo.query ? 'info' : 'warning',
            title: 'AI Assumption',
        };
        const generatedQuery = {
            text: generatedAiInfo.query,
            type: 'query',
            title: 'Query Gen',
        };
        customSegmentStore.set_ai_generated_message(generatedMessage);
        customSegmentStore.set_ai_generated_query(generatedQuery);
        generatedAiInfo.attrs.forEach((element, index) => {
            if (index === 0) { queryType.value = 'queryGroupDrop'; } else { queryType.value = segmentModel.value.conditions[0].id; }
            const formattedValue = String(element.value);

            // Start with the main value first
            const selectorsSet = new Set([formattedValue]);

            // Then add the rest of the options (if any), excluding duplicates
            if (Array.isArray(element.valueOptions)) {
                element.valueOptions.forEach((option) => {
                    selectorsSet.add(String(option));
                });
            }

            const parsedElement = {
                payload: {
                    display_name: element.field,
                    input_type: element.input_type,
                    operators: element.operator,
                    selectors: Array.from(selectorsSet), // No dups, formatted correctly
                },
            };

            addNewQuery(parsedElement);
            nextTick();
        });
        aiGeneratingQuery.value = false;
    }
    // Not implemented yet
    async function validateQuery() {
        segmentModel.value.conditions.forEach((element) => {
            if (Array.isArray(element.group)) {
                element?.group.forEach((subQuery) => {
                    if (subQuery.input_type === 'select' && subQuery.statement[2].length > 1 && subQuery.statement[1] === '$eq') {
                        subQuery.statement[1] = '$in';
                    }
                    if (subQuery.input_type === 'select' && subQuery.statement[2].length > 1 && subQuery.statement[1] === '$neq') {
                        subQuery.statement[1] = '$nin';
                    }
                });
            }
        });
    }
    async function runQuery() {
        savingDraft.value = true;
        if (tabActive.value.id === 1) {
            await validateQuery();
        }
        segmentCount.value = await customSegmentStore.run_query(segmentModel.value, platform.value, location.value);
        if (segmentCount.value) {
            showSegmentQueryResults.value = true;
        }
        savingDraft.value = false;
        segmentSaved.value = false;
    }
    function getOperatorText(operator, id) {
        if (operator === 'operatorsQueries') {
            return operatorsQueries.find((e) => e.value === id)?.label;
        }
        const operatorList = getSubQueryOptions(operator);
        return operatorList.find((e) => e.value === id)?.label;
    }

    function getSubQueryOptions(fieldType) {
        switch (fieldType) {
        case 'select':
            return conditionSelectComaprison;
        case 'boolean':
            return conditionBooleanComaprison;
        case 'string':
            return conditionStringComparisons;
        case 'date':
            return conditionDateComparisons;
        case 'int':
            return conditionNumericComparisons;
        default:
            return [];
        }
    }
    function setDragging(state) {
        dragging.value = state;
    }
    async function fetchModel() {
        fetchingDataBaseModel.value = true;
        const response = await customSegmentStore.fetch_database_model(platform.value, location.value);
        fetchingDataBaseModel.value = false;
    }
    async function fetchPlatforms() {
        fetchingPlatforms.value = true;
        await customSegmentStore.fetch_custom_segment_settings();
        const settings = await customSegmentStore.get_segment_settings;
        if (settings) {
            platforms.value = await settings.platforms.map((platform) => ({
                value: platform.platform_id,
                label: platform.platform,
                locations: platform.locations.map((location) => ({
                    value: location.value,
                    label: location.display_name,
                })),
            }));

            platform.value = platforms.value[0].value;
        }
        fetchingPlatforms.value = false;
    }
    function addNewQuery(column) {
        console.log(column)
        const selectedColumn = column.payload ? column.payload : column;
        if (maxFieldCounter.value < customSegmentStore.settings.maxSubQuery) {
            // Parse dropdown options and preselect value from database model if available
            const selectors = selectedColumn.selectors.map((element) => ({
                value: element,
                label: element,
            }));
            // Preselect value based on input_type
            let preselectedCondition = [];
            if (selectors.length > 2) {
                preselectedCondition[0] = selectors[0].value;
            } else if (selectors.length > 0) {
                preselectedCondition = selectors[0].value;
            } else {
                preselectedCondition = null;
            }

            const inputType = selectors.length > 0 && selectedColumn.input_type !== 'boolean'
                ? 'select' : selectedColumn.input_type;

            // Query is dropped in a new group
            if (queryType.value === 'queryGroupDrop') {
                maxFieldCounter.value += 1;
                // More than one query group
                if (segmentModel.value.conditions.length > 0) {
                    segmentModel.value.conditions.push({ logic: '$or' });
                }
                const queryGroup = {
                    id: uuidv4(),
                    group: [
                        {
                            id: uuidv4(),
                            statement: [selectedColumn.display_name, '$eq', preselectedCondition],
                            selectors,
                            input_type: inputType,
                        },
                    ],
                };

                segmentModel.value.conditions.push(queryGroup);
            }
            // Query is dropped in an existing group
            else if (queryType.value !== null) {
                maxFieldCounter.value += 1;
                const query = segmentModel.value.conditions.findIndex(
                    (e) => e.id === queryType.value,
                );
                if (query !== -1) {
                    segmentModel.value.conditions[query].group.push({ logic: '$and' });
                    segmentModel.value.conditions[query].group.push({
                        id: uuidv4(),
                        statement: [selectedColumn.display_name, '$eq', preselectedCondition],
                        selectors,
                        input_type: inputType,
                    });
                }
            }
            queryType.value = null;
        }
    }
    function addNewQueryByClick(column) {
        if (!segmentModel.value.conditions[0]?.id) { queryType.value = 'queryGroupDrop'; } else { queryType.value = segmentModel.value.conditions[0].id; }
        addNewQuery(column);
        nextTick();
    }
    function removeSubQuery(query, queryGroupIndex, subQueryId) {
        if (segmentModel.value.conditions[queryGroupIndex].group.length === 1) {
            if (segmentModel.value.conditions.length > queryGroupIndex + 1) { segmentModel.value.conditions.splice(queryGroupIndex, 2); } else {
                segmentModel.value.conditions.splice(queryGroupIndex, 1);
            }

            maxFieldCounter.value -= 1;
        } else {
            const index = segmentModel.value.conditions[queryGroupIndex].group.findIndex(
                (e) => e.id === subQueryId,
            );
            segmentModel.value.conditions[queryGroupIndex].group.splice(index - 1, 2);
            maxFieldCounter.value -= 1;
        }
    }
    function toggleQueryCollapse(query) {
        const index = collapsedQueries.value.indexOf(query);
        if (index >= 0) {
            collapsedQueries.value.splice(index, 1);
        } else collapsedQueries.value.push(query);
    }
    function toggleGroup(group) {
        const index = collapsedAttributes.value.indexOf(group);
        if (index >= 0) {
            collapsedAttributes.value.splice(index, 1);
        } else collapsedAttributes.value.push(group);
    }
    function getAttributeDropPayload(index, column) {
        const payload = column[index];
        return payload;
    }
    function resetQueryBuilder() {
        segmentCount.value = '';
        segmentModel.value = {
            name: '',
            table: '',
            joins: [],
            conditions: [],
        };
    }
    function insertSegment() {
        segmentModel.value = { ...segmentModel.value, count: segmentCount.value };
        if (tabActive.value.id === 3) {
            segmentModel.value = { ...segmentModel.value,
                                   freeForm: customSegmentStore.freeFormQuery };
        }
        emits('insertSegment', segmentModel.value);
        showPushModal.value = true;
    }
    async function init() {
        await segmentManagerStore.set_token(props.token);
        await segmentManagerStore.set_brandId(props.brandId);
        await segmentManagerStore.set_tenantId(props.tenantId);
        await customSegmentStore.set_customSegmentUrl(props.customSegmentUrl);
        await customSegmentStore.fetch_custom_segment_settings();
        await fetchPlatforms();
    }

    onMounted(() => {
        init();
    });

    watch(platform, async (newVal, oldVal) => {
        if (newVal) {
            if (oldVal !== newVal) {
                locations.value = platforms.value.find((element) => element.value == newVal).locations;
                location.value = locations.value[0].value;
                await resetQueryBuilder();
                await fetchModel();
            }
        }
    });
    watch(tabActive, async (newVal, oldVal) => {
        if (newVal) {
            if (oldVal !== newVal) {
                if (newVal.id === 2) {
                    aiDescription.value = '';
                    customSegmentStore.set_ai_generated_message(null);
                    customSegmentStore.set_ai_generated_query(null);
                }
            }
        }
    });
</script>

<style lang="scss" scoped>
  .inital-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 20px;
  }

  :deep(span.cata-ui-spinner.medium.cata-ui-button-spinner.pr-5) {
    padding-right: 0px !important;
  }

  :deep(.query-operator) {
    margin-bottom: 0px;
  }

  :deep(.cata-ui-input-field) {
    margin-bottom: 0px;
  }

  :deep(.cata-ui-button.run-query-button) {
    color:#0014cc;
  }

  :deep(.run-query-button .cata-ui-button-icon) {
  padding-right: 5px !important;
}

.query-operator-inner {
  :deep(.cata-ui-input-field .select) {
    // Your styles for only the .select dropdown
    background-color: transparent;
    font-size: 14px;
    border: none;
    padding: 4px 8px;
    color: #0014cc;
  }
}

  .sub-query-outer>.sub-queries:only-child {
    margin-bottom: 0px;

  }

  .sub-query-outer>div:nth-child(2).sub-queries {
    width: fit-content;
  }

  .sub-query-outer>*:first-child {
    margin-bottom: -25px;
  }

  .sub-query-outer>*:nth-child(n+3):nth-child(odd) {
    margin-top: -25px;
  }

  .sub-query-outer>*:not(:nth-child(2)):nth-child(even) {
    margin-top: -25px;
  }

  .query-builder {
    flex: 1;
    display: flex;
    height: 83vh;
  }

  .query-builder-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 83vh;
    padding-bottom: 10px;
    padding-left: 20px;
    border-radius: 5px;
    border: 1px solid #e4e4e4;
    background-color: #fff;
    position: relative;

    .query-builder-left-loader {
      position: absolute;
      z-index: 99;
      left: 45%;
      top: 30%;
      margin-top: 20px;
    }

    .source {
      display: flex;
      align-items: flex-start;
      width: 100%;
      padding-right: 15px;
      padding-bottom: 5px;

      .platform-select {
        min-width: 40%;
        margin-right: 15px;
      }

      .location-select {
        min-width: 33%;
        margin-right: 15px;
      }

      .market {
        width: 33%;
        margin-bottom: 15px;
      }
    }

    .query-tabs {
      border-bottom: 1px solid #e4e4e4;
      margin-bottom: 25px;
      margin-right: 22px;
    }

    .ai-query-tab {
      padding-right: 15px;
    }

    .ai-query {
      :deep(textarea) {
        resize: none;
        overflow-y: auto;
      }
    }

    .ai-query-result {
      font-size: 13px;
      margin-top: 15px;
      border: 1px solid var(--color-grey-400);
      border-radius: 3px;
      padding: 12px;
      background-color: var(--color-grey-100);
    }

    .query-attributes {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: auto;
      position: relative;

      .query-attributes-group {
        margin-bottom: 20px;
        padding-right: 15px;

        &.closed {
          .arrow {
            rotate: 0deg;
          }
        }
      }

      .query-attributes-group-toggle {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 0 0 10px 0;
        user-select: none;
        cursor: pointer;

        .arrow {
          border-bottom: 4px solid transparent;
          border-left: 6px solid #0014cc;
          border-top: 4px solid transparent;
          height: 0px;
          margin-right: 8px;
          transition: 0.1s transform ease-out;
          width: 0px;
          rotate: 90deg;
        }
      }

      .query-attributes-group-items {
        .attribute {
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 64px;
          background-color: #fff;
          margin-bottom: 10px;
          padding: 5px 10px;

          .drag-icon {
            color: #ccc;
            padding: 0 8px;
            cursor: move;
          }

          .attribute-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            padding: 0 12px;
            border-left: 1px solid #ccc;
            width: 100%;
             cursor: pointer;

            .attribute-type {
              font-size: 10px;
              color: #767676;
              line-height: 1;
              padding-bottom: 3px;
              text-transform: uppercase;
            }

            .attribute-name {
              font-size: 14px;
              color: #212121;
              text-transform: uppercase;
            }
          }
        }
      }
    }
  }

  .query-builder-right {
    flex: 2;
    height: 83vh;
    display: flex;
    background: var(--color-white);
    border-radius: 6px;
    margin-left: 5px;
    background-color: #F8F9FB;
    border: 1px solid #e4e4e4;
    flex-direction: column;
    overflow: auto;

    .query-builder-footer {
      border-top: 1px solid #e4e4e4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 20px 14px 20px;
      background-color: #fff;
      position: sticky;

      .query-builder-footer-fields {
        display: flex;
        align-items: center;
        width: 100%;
        padding-bottom: 10px;

        .segment-name {
          width: 300px;
          margin-right: 10px;
        }
      }
      .query-builder-footer-buttons {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        padding-bottom: 10px;

      }
    }

    .query-editor-wrapper {
      margin: 10px 20px 10px 20px;
    }

    .query-editor-title {
      font-size: 22px;
      font-weight: 400;
    }

    .query-editor {
      height: auto;
      max-width: 1000px;
      margin: 0 auto;
      padding: 25px;
      background-color: #FFF;

      .drop-indicator {
        color: #0014cc;
        padding: 30px;
        text-align: center;
        border: 1px dashed #0014cc;
        border-radius: 6px;
        background: rgba(0, 113, 138, 0.05);
      }

      .queries {
        .query-outer {
          .query {
            display: flex;
            align-items: center;
            padding: 0 10px 0 15px;
            background: #FFF;
            border: 1px solid #e4e4e4;
            border-radius: 64px;

            .query-operator {
              width: 83px;
              min-width: 83px;
              margin-right: 15px;
            }

            .sub-query {
              display: flex;
              align-items: center;
              padding-bottom: 15px;
              margin-left: 95px;

              &:first-child {
                padding-top: 15px;
              }

              &>*:not(.remove-subQuery) {
                flex: 1;
                padding-right: 10px;

                &:last-child {
                  padding-right: 0;
                }
              }

              .remove-subQuery {
                cursor: pointer;
              }
            }

            .collapse-subQuery {
              display: flex;
              align-items: center;
              align-self: stretch;
              padding-right: 10px;
              border-right: 1px solid #e4e4e4;
              cursor: pointer;
              margin-right: 10px
            }
          }

          .query-operator-outer {
            width: 84px;
            min-width: 84px;

            &::before,
            &::after {
              content: "";
              width: 1px;
              height: 25px;
              margin-left: 44px;
              display: block;
              background: #e4e4e4;
            }
          }

          :deep(.label-placeholder) {
            display: none;
          }
        }
      }
    }

    .single-subquery {
      margin-left: 0 !important;
    }

    // .run-query-button {
    //   margin-right: 20px;
    // }

    .query-results-wrapper {
      display: flex;
      flex-direction: column;
      margin: 22px;
      padding: 25px;
      border-radius: 5px;
      background-color: var(--color-white);
      height: fit-content;

      .query-results {
        display: flex;
        flex-direction: column;
        align-items: center;

        .query-result {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .query-result-count {
          font-size: 16px;
          font-weight: 700;
        }

        .query-result-message {
          font-size: 12px;
        }
      }
    }
  }

.query-content-scrollable {
    overflow-y: auto;
    flex: 1;
    padding-top: 10px;
  }

  .query-runner-button-wrapper {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 20px;
      }

.loading-query-run  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;

}
</style>
