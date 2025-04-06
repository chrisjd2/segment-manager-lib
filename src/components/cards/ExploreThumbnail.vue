<template>
    <div>
        <div v-if="!savingDraft">
            <div class="d-flex justify-content-between">
                <div class="query-editor-title pb-20">Segment Summary</div>
                <CataUiButton
                    v-if="segmentSaved"
                    class="run-query-button"
                    type="secondary"
                    size="small"
                    label="Explore Insights"
                    @click="exploreInsights()" />
            </div>
            <div class="query-results">
                <div class="query-result">
                    Segment size
                    <span class="query-result-count">{{
                        formatCount(props.segmentCount)
                    }}</span>
                    records.
                </div>
            </div>
            <div class="segment-insights" v-if="segmentSaved">
                <CataCoreUiChart
                    :options="chartOptionsCombined"
                    :series="seriesCombined" />
            </div>
        </div>
        <div v-if="savingDraft" class="loading">
            <CataUiSpinner size="xlarge" />
            <p>Connecting to Open Intelligence...</p>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { CataUiButton, CataUiSpinner } from '@catalyst/ui-library';
    import { CataCoreUiChart } from '@catalyst-core/ui-library';

    const emit = defineEmits(['explore-insights']);

    const props = defineProps({
        segmentData: {
            type: Array,
            required: true,
        },
        segmentCount: {
            type: Number,
            default: 0,
        },
        savingDraft: {
            type: Boolean,
            default: false,
        },
    });

    const savingSegment = ref(false);
    const segmentSaved = ref(false);

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
            data: [15, 12, 18, 10, 14, 25, 10, 16, 20, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0], // ✅ Increased Animals/Wildlife to the highest value
        },
        {
            name: 'Life Stages',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25, 15, 18, 12, 10, 8, 10, 7, 10], // ✅ Increased Young Single to the highest value
        },
    ];

    function exploreInsights() {
        emit('explore-insights');
    }

    function formatCount(count) {
        if (count === undefined || count === null) return '';
        const numCount = typeof count === 'string' ? parseInt(count, 10) : count;
        return numCount.toLocaleString();
    }

</script>

<style lang="scss" scoped>
.loading  {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
}

.query-editor-title {
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 10px;
  color: #333;
}

.run-query-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  color: #0014cc;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.run-query-button:hover {
  background-color: #eaeaea;
}

.query-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 10px;
}

.query-result {
  font-size: 16px;
  font-weight: 500;
  color: #444;
}

.query-result-count {
  font-weight: 700;
  margin: 0 4px;
  color: #0014cc;
}

.segment-insights {
    display: flex;
    align-items: stretch;
    padding: 20px;
    gap: 20px;
    width: 100%;
    min-height: 400px;
  }

</style>
