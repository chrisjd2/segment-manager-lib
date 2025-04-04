<template>
    <div>
        <h5 class="chart-section-title my-3">{{chartList[0].section}}</h5>
        <div class="chart-section">
            <div
                v-for="(chart, index) in chartList"
                :key="chart.title + index"
                :ref="el => observeChart(el, index)"
                :class="['chart-wrapper', getWidthClass(index)]">
                <div v-if="visibleCharts[index]">
                    <div class="chart-title">{{ chart.title }}</div>
                    <CataCoreUiChart
                        :options="chart.options"
                        :series="chart.series"
                        :type="chart.chartType"
                        width="100%"
                        :height="chart.chartType === 'bubble' ? '550' : '350'" />
                </div>
            </div>
            <TagCard :tags="tags || []" :charts="charts || []" v-if="chartList.length === 2" />
        </div>
    </div>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { useIntersectionObserver } from '@vueuse/core';
    import { CataCoreUiChart } from '@catalyst-core/ui-library';

    import TagCard from '@/components/cards/TagCard.vue';
    import { chartBaseOptionsMap, jsonToApexChartTypeMap } from '@/constants/chartBaseOptions';

    const props = defineProps({
        charts: {
            type: Array,
            required: true,
        },
        tags: {
            type: Array,
            required: true,
        },
    });

    const visibleCharts = ref([]);
    const chartRefs = ref([]);
    const observers = [];

    const monochromeBaseColors = ['#0A2FFF', '#0068AD', '#0E8677', '#12871C', '#A36F05', '#CC4B00', '#D11534', '#B41880', '#832EEA', '#646C72'];

    const createSmoothAreaChart = (chart, index) => {
        const type = 'area';
        const baseOptions = chartBaseOptionsMap[type] || {};

        const categories = chart.data[0]?.label || [];
        const rawValues = chart.data[0]?.score || [];
        const values = rawValues.map((v) => (Number.isNaN(Number(v)) ? v : Number(v)));

        const series = [{ name: chart.title, data: values }];

        // Enhanced options for smoother area charts
        const dynamicOptions = {
            labels: categories,
            colors: [monochromeBaseColors[index % monochromeBaseColors.length]],
            stroke: {
                curve: 'smooth',
                width: 3,
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.2,
                    stops: [0, 90, 100],
                },
            },
            dataLabels: {
                enabled: false, // Remove the black boxes with numbers
            },
            markers: {
                size: 0, // Remove data point markers for smoother appearance
            },
            tooltip: {
                enabled: true,
                shared: true,
                intersect: false,
                // Show data values in tooltip instead of on chart
                y: {
                    formatter(value) {
                        return value;
                    },
                },
            },
            grid: {
                borderColor: '#f1f1f1',
                row: {
                    colors: ['transparent', 'transparent'],
                    opacity: 0.5,
                },
            },
        };

        return {
            section: chart.section,
            chartType: type,
            title: chart.title,
            series,
            options: {
                ...baseOptions,
                ...dynamicOptions,
                chart: {
                    type,
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                        },
                    },
                },
            },
        };
    };

    const normalizeChartType = (rawType) => {
        if (!rawType) return 'bar'; // Default type

        const type = rawType.toString().toLowerCase().trim();

        if ((type.includes('vertical') || type.includes('verical'))
            && (type.includes('bar') || type.includes('bars') || type.includes('chart'))) {
            return 'bar';
        }

        if (type === 'horizontal') return 'bar';
        if (type === 'donut') return 'donut';
        if (type === 'pie') return 'pie';
        if (type === 'radar') return 'radar';
        if (type === 'line') return 'line';
        if (type === 'area') return 'area';

        return type;
    };

    const chartList = computed(() => props.charts
        .filter((chart) => chart.data && chart.data.length > 0)
        .map((chart, index) => {
            const type = normalizeChartType(jsonToApexChartTypeMap[chart.type] || chart.type);
            const baseOptions = chartBaseOptionsMap[type] || {};

            const categories = chart.data[0]?.label || [];
            const rawValues = chart.data[0]?.score || [];
            const values = rawValues.map((v) => (Number.isNaN(Number(v)) ? v : Number(v)));

            let series = [];
            let dynamicOptions = {};

            if (type === 'horizontal') {
                series = [{ name: chart.title, data: values }];
                dynamicOptions = {
                    labels: categories,
                    colors: [monochromeBaseColors[index % monochromeBaseColors.length]],
                    plotOptions: { bar: { distributed: false } },
                };
            } else if (type === 'bar' || type === 'vertical bar' || type === 'vertical bars' || type === 'Vertical bars' || type === 'vertical chart') {
                if (chart.title === 'Average View of Digital consumption (Daily)') {
                    series = [{ name: chart.title, data: values }];
                    dynamicOptions = {
                        labels: categories,
                        colors: [monochromeBaseColors[index % monochromeBaseColors.length]],
                        plotOptions: { bar: { horizontal: false, distributed: false } },
                    };
                } else {
                    if (chart.title === 'Personality archetype') {
                        console.log(values);
                    }
                    series = [{ name: chart.title, data: values }];
                    dynamicOptions = {
                        labels: categories,
                        colors: [monochromeBaseColors[index % monochromeBaseColors.length]],
                        plotOptions: { bar: { horizontal: true, distributed: false } },
                    };
                }
            } else if (type === 'line' || type === 'area') {
                return createSmoothAreaChart(chart, index);
                // series = [{ name: chart.title, data: values }];
                // dynamicOptions = {
                //     labels: categories,
                //     colors: [monochromeBaseColors[index % monochromeBaseColors.length]],
                //     stroke: { curve: 'smooth' },
                // };
            } else if (type === 'radar') {
                series = [{ name: chart.title, data: values }];
                dynamicOptions = { labels: categories };
            } else if (type === 'donut' || type === 'pie') {
                series = values;
                dynamicOptions = { labels: categories };
            }

            return {
                section: chart.section,
                chartType: type,
                title: chart.title,
                series,
                options: {
                    ...baseOptions,
                    ...dynamicOptions,
                    chart: { type },
                },
            };
        }));

    onMounted(() => {
        visibleCharts.value = new Array(chartList.value.length).fill(false);
    });

    const observeChart = (el, index) => {
        if (!el || visibleCharts.value[index]) return;
        chartRefs.value[index] = el;
        const { stop } = useIntersectionObserver(
            el,
            ([entry]) => {
                if (entry.isIntersecting) {
                    visibleCharts.value[index] = true;
                    stop();
                }
            },
            { threshold: 0.1 },
        );
        observers[index] = stop;
    };

    const getWidthClass = () => {
        const len = chartList.value.length;
        if (len === 1) return 'full-width';
        if (len === 2) return 'half-width';
        if (len === 3) return 'third-width';
        return 'third-width';
    };

</script>

<style scoped>
.chart-section-title {
    font-size: 20px;
    font-weight: 600;
    margin-top: 16px;
}
.chart-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
}
.chart-wrapper {
    padding: 24px;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: box-shadow 0.2s ease-in-out;
}
.chart-wrapper.full-width {
    flex: 1 1 100%;
    max-width: 100%;
}
.chart-wrapper.half-width {
    flex: 1 1 calc(50% - 20px);
    max-width: calc(50% - 20px);
}
.chart-wrapper.third-width {
    flex: 1 1 calc(33.333% - 20px);
    max-width: calc(33.333% - 20px);
}
.chart-title {
    margin-bottom: 16px;
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 8px;
}
</style>
