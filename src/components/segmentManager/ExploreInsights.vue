<template>
    <div v-if="showLookerEmbed" class="explore-insights-wrapper" style="width:100%; height:100%;">
        <iframe
            src='https://lookerstudio.google.com/embed/reporting/25d1a942-d229-4f79-b3d2-4179fe189479/page/HZZdF?params={"ds3.ou":"all","ds3.segment_id":"0f04a842-ce62-4aa4-a978-79ea1b3e2992"}'
            style="border:0; width:100%; height:90vh;"
            allowfullscreen>
        </iframe>
    </div>
    <div v-else>
        <div v-if="loadingInsights" class="explore-insights-loader">
            <LottieAnimation
                height="40vh"
                ref="anim"
                :animation-data="loaderAnimation"
                :loop="true"
                :auto-play="true"
                :speed="1" />
            <h6>Generating Open Intelligence Insights<span class="dot-animate">
                <span>.</span><span>.</span><span>.</span>
            </span></h6>
        </div>

        <div v-if="!loadingInsights" class="explore-insights-wrapper">

            <div class="explore-insights">
                <h6 class="explore-insights-subtitle">
                    <div class="d-flex flex-column">
                        <div class="mb-2">
                            <span class="pd-segment-title">1PD Segment:</span>{{ selectedSegment?.name || 'Segment Overview' }}
                        </div>
                        <div class="pd-segment-title-details"><strong>Count:</strong> {{ formatCount(selectedSegment?.count) }}</div>
                        <div class="pd-segment-title-details"><strong>Description:</strong>  {{ selectedSegment?.description }}</div>
                    </div>
                    <span class="logo-wrapper">
                        <span>Enrichment Source:</span>
                        <img
                            src="https://storage.googleapis.com/segments-manager/images/Asset%201.png"
                            alt="logo"
                            width="120" />
                    </span>
                </h6>
                <div v-if="insightData && segmentsSection.length > 0">
                    <!-- <h3 class="cooccurrence-title">Behavioural Segment Groups with highest Affinity</h3>
                    <p class="cooccurrence-description">These segments exhibit distinct patterns in engagement and loyalty. Their preferences and actions provide valuable insights for optimizing campaigns and enhancing brand connections.</p> -->
                    <div class="thumbnail-card">

                        <div class="thumbnail-segment-cards">
                            <div class="segment-card-row">
                                <MainInfoCard
                                    :key="index"
                                    :segment-data="segmentsSection"
                                    :is-thumbnail="true" />
                                <!-- <div
                                    v-for="(segment, index) in mainSegments"
                                    :key="index"
                                    class="segment-card">
                                    <img :src="segment.image" alt="segment" class="segment-img" /> -->
                                <!-- <div class="segment-card-content">
                                        <h4 class="segment-title">{{ segment.name }}</h4>
                                        <p class="segment-detail">Reach: {{ segment.reach }}</p>
                                        <p class="segment-detail">Impressions: {{ segment.impressions }}</p>
                                    </div> -->
                                <!-- </div>
                            </div> -->
                            <!--
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
                            </div>
                        </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <template v-if="insightData">
                    <div class="charts-outer-wrapper" v-for="(section, index) in groupedBySection" :key="section?.[0]?.section + index">
                        <ChartCard :charts="section || []" v-if="section" :tags="insight.tags || []" :paidSocial="insightData.paidSocial" />
                    </div>
                </template>
                <!-- <TagCard :tags="insight.tags || []" :charts="insight.charts || []" /> -->
            </div>
        </div>
    </div>
</template>

<script setup>
    import axios from 'axios';
    import { ref, computed, onMounted } from 'vue';
    import { CataUiButton } from '@catalyst/ui-library';
    import { CataCoreUiChart } from '@catalyst-core/ui-library';
    import { LottieAnimation } from 'lottie-web-vue';
    import { promiseTimeout } from '@vueuse/core';
    import TagCard from '@/components/cards/TagCard.vue';
    import ChartCard from '@/components/cards/ChartCard.vue';
    import { useSegmentManagerStore } from '@/store/segmentManagerStore';
    import loaderAnimation from '@/components/images/loaderAnimation.json';
    import MainInfoCard from '../cards/MainInfoCard.vue';

    const emits = defineEmits(['apiError']);

    const segmentManagerStore = useSegmentManagerStore();
    const selectedSegment = segmentManagerStore.get_selectedSegment;

    const insightData = ref(null);
    const insight = computed(() => insightData.value || {});

    const anim = ref();
    const segmentsSection = ref([]);
    const loadingInsights = ref(true);
    const groupedBySection = ref([]);

    onMounted(async () => {
        if (!selectedSegment?.segmentId) return;

        try {
            loadingInsights.value = true;

            const response = await axios.get(
                `https://sm-standard-segments-838902823068.europe-west1.run.app/api/v1/segments/insights/${selectedSegment?.segmentId ? selectedSegment?.segmentId : useSegmentManagerStore.get_selectedSegment?.segmentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${segmentManagerStore.token}`,
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'x-tenant': segmentManagerStore.tenantId,
                        'brand-id': segmentManagerStore.brandId,
                    },
                },
            );

            if (!response?.data?.data) {
                emits('apiError', {
                    error: 'Empty response',
                    headline: 'Error',
                    message: 'Sorry, an error occurred while getting your insights.',
                });
            }

            insightData.value = response.data?.data?.[0];
            // const groupingBySection = insightData.value.charts.reduce((acc, item) => {
            //     if (!acc[item.section]) {
            //         acc[item.section] = [];
            //     }
            //     acc[item.section].push(item);
            //     return acc;
            // }, {});
            const grouped = insightData.value.charts.reduce((acc, item, index, array) => {
                if (index < 2) {
                    // First two go in the first group
                    if (!acc[0]) acc[0] = [];
                    acc[0].push(item);
                } else if (index < 5) {
                    // Next three go in the second group
                    if (!acc[1]) acc[1] = [];
                    acc[1].push(item);
                } else {
                    // All remaining charts go in the third group
                    if (!acc[2]) acc[2] = [];
                    acc[2].push(item);
                }
                return acc;
            }, []);

            segmentsSection.value = insightData.value.segments[0];
            groupedBySection.value = Object.values(grouped);

            await promiseTimeout(3000);
            loadingInsights.value = false;
        } catch (error) {
            loadingInsights.value = false;
            const apiError = {
                error,
                headline: 'Error',
                message:
                    error?.response?.data
                    || 'Sorry, an error occurred while getting your insights.',
            };
            emits(apiError);
        }
    });

    const showLookerEmbed = computed(() => segmentManagerStore.tenantId === '3d28abf8-b549-4535-9ccd-51f0f0fd2363');

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
            categories: selectedSegment.thumbnail?.graph?.labels || [],
        },
        colors: ['#85A3FF',
                 '#7AB6FF'],
        title: {
            text: selectedSegment.thumbnail?.title || '',
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

    const chartSeries = computed(() => selectedSegment.thumbnail?.graph?.seriesCombined?.map((s) => ({
        name: s.name,
        data: s.data.map(Number),
    })) || []);

    const mainSegments = computed(() => selectedSegment.thumbnail?.segments?.[0]?.segments?.slice(0, 4)
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

    function formatCount(count) {
        if (count === undefined || count === null) return '';
        const numCount = typeof count === 'string' ? parseInt(count, 10) : count;
        return numCount.toLocaleString();
    }

</script>

<style scoped>
:deep(div.cata-ui-modal-content-body) {
    padding: 0 !important;
}

.dot-animate {
  display: inline-flex;
  gap: 1px;
}

.dot-animate span {
  opacity: 0;
  animation: blink 1s infinite;
}

.dot-animate span:nth-child(1) {
  animation-delay: 0s;
}
.dot-animate span:nth-child(2) {
  animation-delay: 0.2s;
}
.dot-animate span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}

.charts-outer-wrapper {
    margin-bottom: 20px;
}

.explore-insights-loader {
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 95vh;
    width: 100%;
}

    .explore-insights-wrapper {
        display: flex;
        justify-content: center;
        width: 100%;
        background: #f8f9fb;
    }
    .explore-insights {
        display: flex;
        flex-direction: column;
        width: 80%;
    }
    .explore-insights-subtitle {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 25px 15px;
        font-size: 18px;
        background-color: white;
        margin-top: 15px;
        margin-bottom: 25px;
        position:sticky;
        top: 0;
        z-index: 100;
        border-bottom: 1px solid #e4e4e7;

        .pd-segment-title {
            font-size: 22px;
            font-weight: 500;
            color:#0014CC;
            margin-right: 10px;
            margin-bottom: 10px;
        }

        .pd-segment-title-details {
            font-size: 14px;
            margin-top: 5px;
        }

        .h6 {
            font-size: 22px;
            font-weight: 500;
        }

        .logo-wrapper {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 14px;
            font-weight: 500;
        }
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
    }
    .insights-title {
        font-size: 16px;
        font-weight: 700;
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
        margin-bottom: 20px;
        background: #fff;

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
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
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
        margin-top: 10px;
    }

    .segment-img {
        width: 300px;
        height: 300px;
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

    .cooccurrence-segment-cards {
        margin-top: 40px;
        margin-bottom: 40px;
        display: flex;
        flex-direction: column;
        gap: 20px;
}

.cooccurrence-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
}

.cooccurrence-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.segment-card.cooccurrence-card {
  max-width: 380px;
  align-items: flex-start;
}

.cooccurrence-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  width: 340px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  min-height: 360px;
}

.segment-images {
  display: flex;
  gap: 20px;
  justify-content: space-between;
  margin-bottom: 12px;
  width: 100%;
}

.segment-single {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  flex: 1;
}

.segment-single .segment-title {
  font-size: 14px;
  font-weight: bold;
  margin: 6px 0 4px;
}

.segment-single .segment-detail {
  font-size: 13px;
  color: #555;
  margin: 2px 0;
}

.segment-img.rounded {
  border-radius: 8px;
  width: 100%;
  height: auto;
  object-fit: contain;
}

.totals-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0 4px;
}

.totals {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 14px;
}

.affinity-label-inline {
  background-color: #d1fae5;
  color: #065f46;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.blue {
  color: #2a5ada;
  font-weight: bold;
}

</style>
