<template>
    <div class="tag-section">
        <div class="card-wrapper"
            v-for="(tag, index) in bubbleSkippedTags"
            :key="tag.title + index"
            :class="{ 'full-width': tag.section === 'Owned Intelligence' }">
            <div
                class="rating-card">
                <div class="header">
                    <h2 class="title">
                        <span class="pb-2">{{ tag.title }}</span>
                    </h2>
                </div>
                <div class="content-wrapper">
                    <div class="content">
                        <div class="publishers">
                            <div v-for="(label, i) in tag.data[0].label" :key="label">
                                <div class="publisher-item">{{ label }}</div>
                                <div class="ratings">
                                    <div class="rating">
                                        <span
                                            v-for="(n, j) in Math.floor(parseFloat(tag.data[0].score[i]))"
                                            :key="`filled-${j}`"
                                            class="dot filled"></span>
                                        <span
                                            v-for="(n, j) in 5 - Math.floor(parseFloat(tag.data[0].score[i]))"
                                            :key="`empty-${j}`"
                                            class="dot"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="logo-wrapper">
                        <img
                            src="https://storage.googleapis.com/segments-manager/images/Asset%201.png"
                            alt="logo"
                            width="100" />
                    </div>
                </div>
            </div>
        </div>

        <!-- <div
          v-for="(chart, index) in bubbleCharts"
          :key="chart.title + index"
          :ref="el => observeChart(el, index)"
          class="chart-wrapper full-width">
          <div class="chart-title">{{ chart.title }}</div>
          <CataCoreUiChart
              :options="buildChartOptions(chart)"
              :series="buildChartSeries(chart)"
              :type="chart.type"
              width="100%"
              height="550" />
      </div> -->
    </div>
</template>

<script setup>
    import { computed, ref, onMounted } from 'vue';
    import { CataCoreUiChart } from '@catalyst-core/ui-library';
    import { useIntersectionObserver } from '@vueuse/core';

    const visibleCharts = ref([]);

    const observeChart = (el, index) => {
        if (!el || visibleCharts.value[index]) return;

        const { stop } = useIntersectionObserver(
            el,
            ([entry]) => {
                if (entry.isIntersecting) {
                    visibleCharts.value[index] = true;
                    stop(); // stop observing once it's visible
                }
            },
            { threshold: 0.1 },
        );
    };

    const props = defineProps({
        tags: {
            type: Array,
            required: true,
        },
        charts: {
            type: Array,
            default: () => [],
        },
    });

    const bubbleCharts = computed(() => props.charts.filter((chart) => chart.type === 'bubble'));
    const bubbleSkippedTags = computed(() => props.tags);

    onMounted(() => {
        visibleCharts.value = new Array(bubbleCharts.value.length).fill(false);
    });

    function buildChartOptions(chart) {
        return {
            chart: { type: chart.type },
            fill: {
                type: 'gradient',
                gradient: {
                    type: 'radial', // Radial = center-outward
                    shade: 'light', // Can be 'light' or 'dark'
                    shadeIntensity: 0.6, // How strong the shading is
                    inverseColors: false,
                    opacityFrom: 1, // Center opacity
                    opacityTo: 0.4, // Edge opacity
                    stops: [0, 100], // Gradient spread
                },
            },
        };
    }

    function buildChartSeries(chart) {
        return [
            {
                name: chart.title,
                data: chart.data.map((item) => ({
                    x: item.value[0],
                    y: item.value[1],
                    z: item.value[2],
                    name: item.key,
                })),
            },
        ];
    }
</script>

  <style scoped>
  .tag-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;

  }

  .card-wrapper {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
    margin-bottom: 20px;
    gap: 20px;
    width: 100%;
    justify-content: center;
  }
  .card-wrapper.full-width {
    flex: 1 1 100%;
    max-width: 100%;
  }

  .rating-card {
  box-sizing: border-box;
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 320px;
  height: 100%;
}

  .header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
  }

  .content {
    margin-top: 16px;
  }

  .publishers {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .publisher-item {
    padding: 8px 14px;
    border: 1px solid black;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s;
  }

  .publisher-item.active {
    background: #2a5ada;
    color: white;
    border-color: #2a5ada;
  }

  .ratings {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 16px;
    padding-left: 14px;
  }

  .rating {
    display: flex;
    gap: 4px;
  }

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ccc;
  }

  .dot.filled {
    background: #2a5ada;
  }

  .logo-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
  }

  .chart-wrapper {
    width: 100%;
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }

  .chart-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    color: #333;
  }
  </style>
