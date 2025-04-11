<template>
    <div>
        <div class="segment-details-insigts mt-4">
            <div class="insights-title-wrapper">
                <h6 class="insights-title mr-1">DELIVERED BY OPEN INTELLIGENCE</h6>
                <p class="mt-3">Find the segments that work best with <span class="query-result">{{ props.selectedSegment.name }}</span></p>
                <CataUiTooltip
                    label="The preview is for your external proofing tool." />
            </div>
            <!-- <CataUiButton type="secondary" label="Explore" @click="openExplore()" /> -->
        </div>
        <!-- <div>
            <p>Below you can find the segments that work best with {{ props.selectedSegment.name }}</p>
            <div class="thumbnail-card">
                <div class="thumbnail-bar-chart">
                    <CataCoreUiChart
                        :options="chartOptions"
                        :series="chartSeries"
                        :height="'550px'" />
                </div>

                <div class="thumbnail-segment-cards">
                    <div class="segment-card-row">
                        <div
                            v-for="(segment, index) in mainSegments"
                            :key="index"
                            class="segment-card">
                            <img :src="segment.image" alt="segment" class="segment-img" />
                            <div class="segment-card-content">
                                <h4 class="segment-title">{{ segment.name }}</h4>
                                <p class="segment-detail">Reach: {{ segment.reach }}</p>
                                <p class="segment-detail">Impressions: {{ segment.impressions }}</p>
                            </div>
                        </div>
                    </div>

                    <div class="segment-metrics-card">
                        <div class="segment-meta-box">
                            <div class="meta-item">
                                <div class="meta-title">Affinity score</div>
                                <div class="meta-value">{{ combinedAffinityScore }}</div>
                            </div>
                            <div class="meta-item">
                                <div class="meta-title">Expected Reach</div>
                                <div class="meta-value">{{ combinedReach }}</div>
                            </div>
                        </div>
                        <CataUiButton class="mt-2 full-width-button" label="Add to Segment manager" type="primary" />
                    </div>
                </div>

            </div>
        </div> -->
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { CataUiButton } from '@catalyst/ui-library';
    import { CataCoreUiChart } from '@catalyst-core/ui-library';

    import { useSegmentManagerStore } from '@/store/segmentManagerStore';

    const props = defineProps({
        location: {
            type: String,
            required: true,
        },
        selectedSegment: {
            type: Object,
            required: true,
        },
    });

    const segmentManagerStore = useSegmentManagerStore();
    const emits = defineEmits(['showInsightsExplorer']);

    const chartOptions = computed(() => ({
        chart: {
            type: 'bar',
            height: 550,
            stacked: true,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: { horizontal: true },
        },
        xaxis: {
            categories: props.selectedSegment.thumbnail?.graph?.labels || [],
        },
        colors: ['#0A2FFF',
                 '#0068AD'],
        title: {
            text: props.selectedSegment.thumbnail?.title || '',
            align: 'left',
            style: {
                fontSize: '16px',
                fontWeight: 'bold',
            },
        },
        legend: {
            position: 'bottom',
        },
    }));

    const chartSeries = computed(() => props.selectedSegment.thumbnail?.graph?.seriesCombined?.map((s) => ({
        name: s.name,
        data: s.data.map(Number),
    })) || []);

    const mainSegments = computed(() => props.selectedSegment.thumbnail?.segments?.[0]?.segments?.slice(0, 2)
        || []);

    const combinedAffinityScore = computed(() => {
        const values = mainSegments.value.map((s) => parseFloat(s.affinityScore || '0'));
        const sum = values.reduce((a, b) => a + b, 0);
        return sum.toFixed(2);
    });

    const combinedReach = computed(() => {
        const values = mainSegments.value.map((s) => parseInt(s.reach || '0', 10));
        return values.reduce((a, b) => a + b, 0).toLocaleString();
    });

    function openExplore() {
        segmentManagerStore.set_selectedSegmentType(props.location);
        segmentManagerStore.set_activeTab('custom');
        segmentManagerStore.set_selectedSegment(props.selectedSegment);
        emits('showInsightsExplorer', props.selectedSegment);
    }
</script>

<style scoped>

.query-result {
  font-weight: 700;
  margin: 0 4px;
  color: #0014cc;
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
        flex-direction: column;
    }
    .insights-title {
        font-size: 14px;
        font-weight: 600;
    }

    .thumbnail-card {
        display: flex;
        flex-direction: row;
        gap: 20px;
        align-items: flex-start;
        width: 100%;
        margin-top: 20px;
    }
    .thumbnail-bar-chart {
        flex: 1;
    }
    .thumbnail-segment-cards {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
    }

    .segment-card-row {
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .segment-card {
        background: #fff;
        padding: 20px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
        width: 100%;
    }
    .segment-metrics-card {
        background: #fff;
        padding: 20px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    .segment-meta-box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        gap: 20px;
    }

    .meta-item {
        flex: 1;
        text-align: center;
        border: 1px solid #e4e4e7;
        border-radius: 8px;
        padding: 20px 10px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .meta-title {
        font-size: 16px;
        color: #777;
    }
    .meta-value {
        font-weight: bold;
        font-size: 22px;
        color: #000;
    }
    .full-width-button {
        width: 100%;
        margin-top: 0px;
    }

    .segment-img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        margin: 0 auto 10px auto;
        border-radius: 12px;
    }
    .segment-card-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        text-align: left;
    }
    .segment-title {
        font-size: 22px;
        font-weight: bold;
    }
    .segment-detail {
        font-size: 16px;
        margin: 0;
        color: #555;
    }

</style>
