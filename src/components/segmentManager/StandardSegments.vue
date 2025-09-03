<template>
    <div class="segment-details">
        <div class="wrapper-left">
            <div class="source-wrapper">
                <div class="source-container">
                    <CataUiInputSelect :style="{ width: '50%' }"
                        hasDefaultValue
                        class="source w-100"
                        :options="options"
                        v-model="source"
                        label="Source" />
                    <CataUiInputSelect :style="{ width: '50%' }"
                        hasDefaultValue
                        class="source w-100"
                        :options="locations"
                        v-model="location"
                        label="Server Location" />
                </div>
                <CataUiInput class="pr-10" type="text" icon="bi-search" placeholder="Search" v-model="searchTerm" />
            </div>
            <div class="sub-controls">
                <div class="sub-tab-container">
                    <div class="sub-controls-tabs">
                        <CataUiTabs :tabs="tabHeaders" v-model="tabActive" type="secondary" size="large" />
                    </div>
                    <div class="sub-controls-tools">
                        <CataUiIcon :icon="'bi-funnel-fill'" color="#4d5358" size="18px" @click="toggleFilters()" />
                    </div>
                </div>
            </div>
            <div class="list">
                <div class="list-list" ref="list">
                    <base-table
                        :stickyHeader="0"
                        :columns="columns"
                        :rows="segmentManagerStore.get_segments"
                        :selectable="false"
                        :sortable="true"
                        :maxWidthCell="'200'"
                        :enableSingleSelect="true"
                        @rowClicked="rowClicked($event)"
                        @columnSorted="sortByColumn($event)"
                        collapseControls />
                    <div class="d-flex justify-content-center pt-40 pb-40" v-if="isFetchingSegments">
                        <CataUiSpinner size="xlarge" />
                    </div>
                    <ui-intersection-observer :options="{ rootMargin: '0px 0px 600px 0px' }"
                        @intersecting="infiniteScroll($event)" />
                </div>
                <base-table-filters v-if="filtersVisible"
                    :filters="filters"
                    @clearFilters="resetFilters()"
                    @filterChange="updateList($event)" />
            </div>
        </div>
        <div class="wrapper-right">
            <div class="outer-wrapper-segment-details" :class="{ 'standard-empty': !selectedSegment }">
                <div v-if="selectedSegment" class="segment-details-wrapper">
                    <div v-if="selectedSegment" class="segment-details-title">
                        {{ selectedSegment.name }}
                    </div>
                    <div class="segment-details-subtitle">Segment Details</div>
                    <div class="segment-details-content">
                        <div class="description-row" v-if="selectedSegment.name">
                            <div class="description-term">Name</div>
                            <div class="description-detail">{{ selectedSegment.name }}</div>
                        </div>
                        <div class="description-row" v-if="selectedSegment.description">
                            <div class="description-term">Description</div>
                            <div class="description-detail">
                                {{ selectedSegment.description }}
                            </div>
                        </div>
                        <div class="description-row" v-if="selectedSegment.sourceCreatedDate">
                            <div class="description-term">Created</div>
                            <div class="description-detail">
                                {{ dayjs(selectedSegment.sourceCreatedDate).format('YYYY-MM-DD, HH:mm') }}
                            </div>
                        </div>
                        <div class="description-row" v-if="selectedSegment.sourceUpdatedDate">
                            <div class="description-term">Updated</div>
                            <div class="description-detail">
                                {{ dayjs(selectedSegment.sourceUpdatedDate).format('YYYY-MM-DD, HH:mm') }}
                            </div>
                        </div>
                        <div class="description-row" v-if="selectedSegment.status">
                            <div class="description-term">Status</div>
                            <div class="description-detail">
                                {{ selectedSegment.status.value }}
                            </div>
                        </div>
                        <div class="description-row" v-if="selectedSegment.expiration_date">
                            <div class="description-term">Expiration</div>
                            <div class="description-detail">
                                {{ selectedSegment.expiration_date }}
                            </div>
                        </div>
                        <div class="description-row" v-if="selectedSegment.id">
                            <div class="description-term">Segmnent ID</div>
                            <div class="description-detail">{{ selectedSegment.id }}</div>
                        </div>
                        <div class="description-row" v-if="selectedSegment.audience_id">
                            <div class="description-term">Audience ID</div>
                            <div class="description-detail">
                                {{ selectedSegment.audience_id }}
                            </div>
                        </div>
                        <div class="description-row" v-if="selectedSegment.count">
                            <div class="description-term">Last count</div>
                            <div class="description-detail-bold">{{ formatCount(selectedSegment.count) }}</div>
                            <span class="description-detail" v-if="selectedSegment.refreshCountDate">
                                ({{ dayjs(selectedSegment.refreshCountDate).format('YYYY-MM-DD, HH:mm') }})
                            </span>
                        </div>
                        <div class="description-row"
                            v-if="selectedSegment.platform_specific"
                            v-for="info in selectedSegment.platform_specific">
                            <div class="description-term">{{ formatString(info.label) }}</div>
                            <div class="description-detail">{{ info.value }}</div>
                        </div>
                    </div>
                    <!-- <CataUiAccordion :restricted="true" v-if="selectedSegment.query" v-model="accordionActiveItems">
                        <CataUiAccordionItem :start-active="true">
                            <template v-slot:header>
                                <div>
                                    <div class="segment-details-subtitle">Query</div>
                                </div>
                            </template>
                            <template v-slot:body> -->
                    <div>
                        <CataUiTabs :tabs="tabHeadersForSegmentDetails" v-model="tabActiveSegmentDetails" type="secondary" size="large" />
                        <!-- <ThumbnailCard
                            v-if="selectedSegment?.thumbnail"
                            :selectedSegment="selectedSegment"
                            :location="'standard'"
                            @showInsightsExplorer="openExplore" /> -->
                        <StandardQueryDisplay v-if="tabActiveSegmentDetails.id === 2" :query="selectedSegment.query" />
                    </div>

                    <!-- </template>
                        </CataUiAccordionItem>
                    </CataUiAccordion> -->
                </div>

                <div class="standard-view" v-if="!selectedSegment">
                    <div>
                        <img class="" alt="standardIcon" :src="svgUrl" />
                    </div>
                    <div class="standard-view-title">
                        <div>Select a standard segment from the list</div>
                        <div>or</div>
                        <div> <strong>Create a custom segment</strong></div>
                    </div>
                </div>
            </div>

            <div class="footer" v-if="selectedSegment.name">
                <div class="footer-text">
                    <div class="footer-description-term">Selected Segment:</div>
                    <div class="footer-description-detail">
                        <span>
                            {{ selectedSegment.name ? `${`${selectedSegment.name} - `}` : 'none' }}
                        </span>
                        <span>
                            {{ formatCount(selectedSegment.count) }}
                        </span>
                    </div>
                </div>
                <div>
                    <!-- <CataUiButton icon="bi-x-lg" class="deselect-button" type="secondary" label="Deselect" @click="deselectSegment()" /> -->
                    <!-- <CataUiButton type="primary" label="Insert" @click="insertSegment()" /> -->
                    <CataUiButton type="secondary" label="Explore" @click="openExplore()" class="mr-2" />
                    <CataUiButton type="delete" label="Delete" @click="deleteSegment()" class="mr-2 redButton" />
                    <CataUiButton type="primary" label="Push to destination" @click="pushToDestination()" />
                </div>
            </div>
        </div>
    </div>
    <PushModal v-if="showPushModal" @close="showPushModal = false" />
</template>

<script setup>
    import { ref, onMounted, watch, computed } from 'vue';
    import dayjs from 'dayjs';
    import {
        CataUiTabs,
        CataUiButton,
        CataUiInputSelect,
        CataUiInput,
        CataUiSpinner,
        CataUiIcon,
        CataUiTooltip,
    } from '@catalyst/ui-library';
    import { CataCoreUiChart } from '@catalyst-core/ui-library';
    import BaseTable from '@/components/table/BaseTable.vue';
    import BaseTableFilters from '@/components/table/BaseTableFilters.vue';
    import UiIntersectionObserver from '@/components/table/UiIntersectionObserver.vue';
    import { useSegmentManagerStore } from '@/store/segmentManagerStore';
    import svgUrl from '@/components/images/standard.svg';
    // import SankeyChart from '../charts/SankeyChart.vue';
    // import SankeyEcharts from '../charts/SankeyEcharts.vue';
    import StandardQueryDisplay from '@/components/cards/StandardQueryDisplay.vue';
    import MainInfoCard from '@/components/cards/MainInfoCard.vue';
    import ThumbnailCard from '@/components/cards/ThumbnailCard.vue';
    import PushModal from '@/components/app/PushModal.vue';
    import insightsData from '@/insights.json';
    import { chartBaseOptionsMap, jsonToApexChartTypeMap } from '@/constants/chartBaseOptions';

    const props = defineProps({
        baseUrl: {
            default: 'https://sm-standard-segments-838902823068.europe-west1.run.app',
            type: String,
            required: true,
        },
        tenantId: {
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
        selectedSegment: {
            default: null,
            type: Object,
            required: false,
        },
        currentlySelectedSegment: {
            default: null,
            type: Object,
            required: false,
        },
    });
    const emits = defineEmits(['insertSegment', 'showInsightsExplorer']);
    const accordionActiveItems = ref([]);
    const segmentManagerStore = useSegmentManagerStore();
    const list = ref(null);
    const intersectionContainer = ref(null);
    const filtersVisible = ref(false);
    const locations = ref([]);
    const location = ref('');
    const options = ref([]);
    const source = ref('');
    const searchTerm = ref('');
    const showPushModal = ref(false);
    const tabHeaders = [
        {
            id: 1,
            label: 'All',
        },
        {
            id: 4,
            label: 'Popular',
        },
        {
            id: 3,
            label: 'Recently Used',
        },
        {
            id: 2,
            label: 'New',
        },
    ];
    const tabHeadersForSegmentDetails = [
        // {
        //     id: 1,
        //     label: 'Insights',
        // },
        {
            id: 2,
            label: 'Query',
        },
    ];
    const tabActive = ref(tabHeaders[0]);
    const tabActiveSegmentDetails = ref(tabHeadersForSegmentDetails[0]);
    const isFetchingSegments = ref(false);
    const filters = ref([
        {
            key: 'name',
            model: '',
            type: 'string',
            value: 'Segment Name',
        },
        {
            key: 'description',
            model: '',
            type: 'string',
            value: 'Description',
        },
        {
            key: 'count',
            model: '',
            type: 'string',
            value: 'Last Count',
        },
        {
            key: 'status',
            model: '',
            type: 'string',
            value: 'Status',
        },
        {
            key: 'market',
            model: '',
            type: 'string',
            value: 'Market',
            disabled: true,
        },
    ]);
    const columns = [
        {
            key: 'name',
            type: 'string',
            value: 'Label',
        },
        {
            key: 'description',
            type: 'description',
            value: 'Description',
        },
        {
            key: 'count',
            type: 'number',
            value: 'Last Count',
        },
        {
            key: 'status',
            type: 'status',
            value: 'Status',
        },
        {
            key: 'type',
            type: 'string',
            value: 'Type',
        },
    ];

    const chartOptionsCombined = {
        chart: {
            type: 'bar',
            height: 700,
            stacked: true,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'center',
                },
            },
        },
        xaxis: {
            categories: [
                'Travel', 'Music', 'Food/Gastronomy', 'Fashion', 'Health',
                'Animals/Wildlife', 'Wellbeing', 'Sports', 'Technology/Science', 'Family/Relationships',
                'Young Single', 'Child-Free Couples', 'Parent with Young Children',
                'Parent with Older Children', 'Any Parent', 'Empty Nest',
                'Midlife Singles', 'Senior Singles', 'Hotel Parents',
            ],
            labels: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    colors: '#777',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'Inter, sans-serif',
                    colors: '#333',
                },
            },
        },
        grid: {
            borderColor: '#E4E4E7',
            strokeDashArray: 4,
            xaxis: {
                lines: { show: true },
            },
            yaxis: {
                lines: { show: false },
            },
        },

        colors: ['#4A90E2', '#A7C7F2'],
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            theme: 'light',
        },
        title: {
            text: 'Audience Groups & Life Stages Ratio',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#263238',
            },
        },
        legend: {
            position: 'bottom',
        },
    };

    const seriesCombined = [
        {
            name: 'Audience Groups',
            data: [15, 12, 18, 10, 14, 25, 10, 16, 20, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
            name: 'Life Stages',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 15, 18, 12, 10, 8, 10, 7, 10],
        },
    ];

    const segmentData = [
        [{
             name: 'Royal Canin Maxi Adult Wet Food',
             reach: '12,125',
             impressions: '102,125',
             img: 'https://storage.googleapis.com/catayst-playground/segment-manager-test-pics/royal-canin/vhn-packaging-emblematic-puppy-vhn-transversal-packaging-charter.png',
         },
         {
             name: 'Family / relationships',
             reach: '9,800',
             impressions: '85,000',
             img: 'https://storage.googleapis.com/catayst-playground/segment-manager-test-pics/royal-canin/mars-press-release-sustainability-carbon-neutral.png',
         },
         {
             name: 'Road Trip Fans',
             reach: '10,500',
             impressions: '90,200',
             img: 'https://storage.googleapis.com/catayst-playground/segment-manager-test-pics/ania_zosia_modern_car_minimalistic_studio_clean_light_photogr_e0ce0043-4287-4285-a7bf-567027f3d1ba_0%202.png',
         }],
    ];

    const selectedFilters = ref({});
    const selectedSegment = ref('');
    const sortColumn = ref({
        sortColumn: 'name',
        sortOrder: 1,
    });

    function openExplore() {
        segmentManagerStore.set_selectedSegmentType('standard');
        segmentManagerStore.set_selectedSegment(selectedSegment.value);
        emits('showInsightsExplorer', selectedSegment.value);
    }

    async function deleteSegment() {
        if (!selectedSegment.value?.segmentId) return;

        const endpoint = `${props.baseUrl}/api/v1/segments/${selectedSegment.value.segmentId}`;

        try {
            const response = await fetch(endpoint, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-tenant': props.tenantId,
                    'brand-id': props.brandId,
                    authorization: `Bearer ${props.token}`,
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Failed to delete segment');
            }

            selectedSegment.value = '';
            await segmentManagerStore.fetch_segments(source.value);
        } catch (err) {
            console.error('Error deleting segment:', err);
        }
    }

    function formatString(str) {
        return str.replace(/(?<!^)([A-Z])/g, ' $1').replace(/^./, (match) => match.toUpperCase());
    }

    function formatCount(count) {
        if (count === undefined || count === null) return '';
        const numCount = typeof count === 'string' ? parseInt(count, 10) : count;
        return numCount.toLocaleString();
    }

    function updateList(event) {
        selectedFilters.value = event;
        segmentManagerStore.set_filterQuery(event);
        segmentManagerStore.fetch_segments(source.value);
    }

    async function infiniteScroll(intersecting) {
        if (
            intersecting
            && segmentManagerStore.get_isLastPage
            && !isFetchingSegments.value
            && segmentManagerStore.get_segments
            && segmentManagerStore.get_segments.length > 0
        ) {
            isFetchingSegments.value = true;
            try {
                await segmentManagerStore.fetch_nextSegmentPage(source.value);
                isFetchingSegments.value = false;
            } catch (error) {
                isFetchingSegments.value = false;
            }
        }
    }
    async function resetFilters() {
        filters.value.map((filter) => {
            if (filter.key !== 'market') {
                filter.model = '';
            }
        });
        segmentManagerStore.reset_filterQuery();
        await segmentManagerStore.fetch_segments(source.value);
    }
    function sortByColumn(event) {
        sortColumn.value = event;
    }
    function toggleFilters() {
        filtersVisible.value = !filtersVisible.value;
    }

    function rowClicked(event) {
        selectedSegment.value = event.row;
    }

    function insertSegment() {
        segmentManagerStore.set_selectedSegmentType('standard');
        segmentManagerStore.set_selectedSegment(selectedSegment.value);
        emits('insertSegment', selectedSegment.value);
    }

    function deselectSegment() {
        selectedSegment.value = '';
    }

    function pushToDestination() {
        showPushModal.value = true;
    }

    async function initSegments() {
        await segmentManagerStore.set_token(props.token);
        await segmentManagerStore.set_brandId(props.brandId);
        await segmentManagerStore.set_tenantId(props.tenantId);
        await segmentManagerStore.set_baseUrl(props.baseUrl);
        if (props.currentlySelectedSegment && props.currentlySelectedSegment._id) {
            selectedSegment.value = props.currentlySelectedSegment;
        } else if (props.selectedSegment && props.selectedSegment._id) {
            selectedSegment.value = props.selectedSegment;
        }

        await segmentManagerStore.fetch_segment_settings(props.brandId);

        try {
            const settings = await segmentManagerStore.get_segment_settings;
            if (settings) {
                options.value = await settings.platforms.map((platform) => ({
                    value: platform.platform_id,
                    label: platform.platform,
                    locations: platform.locations.map((location) => ({
                        value: location.value,
                        label: location.display_name,
                    })),
                }));
            }

            source.value = options.value[0].value;
        } catch (error) {
            console.log(error);
        }
    }

    onMounted(() => {
        intersectionContainer.value = list.value;
        initSegments();
    });

    watch(source, async (newVal, oldVal) => {
        if (newVal) {
            if (oldVal !== newVal) {
                locations.value = options.value[newVal - 1].locations;
                location.value = locations.value[0].value;
                isFetchingSegments.value = true;
                segmentManagerStore.set_platform(newVal);
                await segmentManagerStore.fetch_segments(newVal);
                tabActive.value = tabHeaders[0];
                isFetchingSegments.value = false;
            }
        }
    });

    watch(searchTerm, async (val) => {
        if (val && val?.length < 3) {
            return;
        }
        segmentManagerStore.set_searchTerm(val);
        segmentManagerStore.fetch_segments(source.value);
    });

    watch(location, async (val) => {
        segmentManagerStore.set_locationQuery(val);
        segmentManagerStore.fetch_segments(source.value);
    });

    watch(sortColumn, async (val) => {
        segmentManagerStore.set_sortQuery(val);
        segmentManagerStore.fetch_segments(source.value);
    });

    watch(tabActive, async (val) => {
        const category = val.id;
        segmentManagerStore.set_categoryQuery(category);
        segmentManagerStore.fetch_segments();
    });

    const processedCharts = computed(() => insightsData.charts.map((chart) => {
        const type = jsonToApexChartTypeMap[chart.type] || chart.type?.toLowerCase();
        const baseOptions = chartBaseOptionsMap[type] || {};
        console.log('type', type);
        console.log('baseOptions', baseOptions);

        let dynamicOptions = {};
        let series = [];

        if (type === 'line' || type === 'area') {
            dynamicOptions = {
                xaxis: {
                    categories: chart.data.map((d) => d.key),
                    labels: { style: { fontSize: '12px', colors: '#777' } },
                    axisBorder: { show: false },
                    axisTicks: { show: false },
                },
                yaxis: {
                    labels: {
                        style: { fontSize: '12px', colors: '#777' },
                        formatter: (val) => (val > 1000 ? `${(val / 1000).toFixed(1)}K` : val),
                    },
                },
            };
            series = [{
                name: chart.data[0]?.valueType || 'Value',
                data: chart.data.map((d) => Number(d.value)),
            }];
        } else if (type === 'bar') {
            dynamicOptions = {
                xaxis: {
                    categories: chart.data.map((d) => d.key),
                },
            };
            series = [{
                name: chart.title,
                data: chart.data.map((d) => Number(d.value)),
            }];
        } else if (type === 'donut' || type === 'pie') {
            dynamicOptions = {
                labels: chart.data.map((d) => d.key),
            };
            series = chart.data.map((d) => Number(d.value));
        } else if (type === 'bubble') {
            series = [{
                name: chart.title,
                data: chart.data.map((d) => ({
                    x: Number(d.x),
                    y: Number(d.y),
                    z: Number(d.z),
                })),
            }];
        }
        console.log('series', series);
        console.log('dynamicOptions', dynamicOptions);
        return {
            series,
            options: {
                ...baseOptions,
                ...dynamicOptions,
                title: {
                    ...baseOptions.title,
                    text: chart.title,
                },
                chart: {
                    // ...baseOptions.chart,
                    type,
                },
            },
            chartType: type,
        };
    }));
</script>

<style lang="scss" scoped>

  $contentHeight: calc(100vh - 360px);

  // Left side
  .segment-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: calc(100vh - 185px);
  }

  .title {
    font-size: 20px;
    padding-bottom: 20px;
    font-weight: 600;
  }

  .source-wrapper {
    padding: 10px 10px 0px 20px;
    border-bottom: 1px solid var(--color-grey-300);
  }

  .source-container {
    display: flex;
    align-items: flex-start;
  }

  .source {
    width: 317px;
    margin-right: 10px;
  }

  .wrapper-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 83vh;
    padding-bottom: 10px;
    padding-top: 20px;
    border-radius: 5px;
    border: 1px solid #e4e4e4;
    background-color: #fff;
    position: relative;
  }

  .list {
    height: calc(100% - 46px);
    overflow: hidden;
    position: relative;
    display: flex;

    &-list {
      background-color: var(--color-white);
      padding: 0;
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }

  .container {
    width: 100%;
    display: flex;
  }

  .sub-controls {
    background-color: var(--color-white);
    border-bottom: 1px solid var(--color-grey-300);
    padding: 0 15px 0 20px;

    .sub-tab-container {
      background-color: transparent;
      margin-bottom: -1px;
      display: flex;
    }
  }

  .sub-controls-tabs {
    flex: 1 0 0;
    overflow: hidden;
    z-index: 0;
  }

  .sub-controls-tools {
    display: flex;
    align-items: center;
    padding-left: 5px;
  }

  // Right side
  .wrapper-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 83vh;
    border-radius: 5px;
    background-color: #f8f9fb;
    margin-left: 5px;
    position: relative;

  }

  .segment-details-insigts {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: start;
  }
  .insights-title-wrapper {
    display: flex;
    justify-content: start;
    padding: 10px 0px;

    .insights-title {
      font-size: 16px;
      font-weight: 700;
    }
  }

  .standard-view {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .standard-view-title {
    text-align: center;
    font-size: 14px;
    padding-right: 20px;
    color: #615057;
  }

  .outer-wrapper-segment-details {
    padding-bottom: 10px;
    height: 100vh;
    background-color: #F8F9FB;
    overflow-y: auto;

    &.standard-empty {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }

  .segment-details-wrapper {
    background-color: var(--color-white);
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    height: fit-content;
    padding: 25px;
  }

  .segment-details-title {
    font-size: 30px;
    padding-bottom: 5px;
  }

  .segment-details-subtitle {
    font-size: 18px;
    padding-top: 5px;
    padding-bottom: 10px;
  }

  .description-term {
    width: 155px;
    font-size: 13px;
    line-height: 19px;
    font-weight: 600;
  }

  .description-detail {
    max-width: 370px;
    font-size: 14px;
    line-height: 19px;
  }

  .description-detail-bold {
    max-width: 370px;
    font-size: 14px;
    line-height: 19px;
    font-weight: 600;
    margin-right: 5px;
  }

  .description-row {
    display: flex;
    flex-direction: row;
    align-items: end;
    padding-bottom: 10px;
  }

  .refresh-count-section {
    display: flex;
    align-items: center;
    flex-direction: row;
    padding-top: 20px;
    color: var(--color2-blue-200);
    font-weight: 400;
  }

  .info-text {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin: 0px 20px 5px 20px;
    line-height: 18px;
    font-size: 14px;
  }

  .label {
    font-size: 12px;
    line-height: 15px;
    font-weight: 600;
  }

  .filters {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 0px;
  }

  .filter {
    margin: 10px;
  }

  .query-conditions {
    background-color: var(--color-grey-100);
  }

  .logical-operator {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 39px;
    border-radius: 19px;
    border: solid 1px var(--color-grey-300);
    margin: 10px 0px;
    position: relative;
  }

  .logical-operator::before,
  .logical-operator::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 10px;
    background-color: var(--color-grey-300);
  }

  /* Line above the logical-operator */
  .logical-operator::before {
    top: -10px;
  }

  /* Line below the logical-operator */
  .logical-operator::after {
    bottom: -10px;
  }

  .footer {
    border: 1px solid var(--color-grey-300);
    border-radius: 5px;
    background-color: var(--color-white);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px 20px 20px;
    width: 100%;
    height: 87px;
  }

  .footer-description-term {
    font-size: 14px;
    line-height: 19px;
    font-weight: 600;
    padding-right: 10px;

  }

  .footer-description-detail {
    max-width: 400px;
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .footer-text {
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 10px;
  }

  .deselect-button {
    margin-right: 20px;
  }

  .segment-insights {
    display: flex;
    align-items: stretch;
    padding: 20px;
    gap: 20px;
    width: 100%;
    min-height: 550px;
  }

  .segment-insights > * {
    flex: 1;
}

.redButton {
    background: red;
}
</style>
