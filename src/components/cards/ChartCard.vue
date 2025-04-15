<template>
    <div>
        <h5 class="chart-section-title my-3">
            {{ chartList[0].section.charAt(0).toUpperCase() + chartList[0].section.slice(1) }}
        </h5>

        <div class="chart-section">

            <div
                v-for="(chart, index) in chartList"
                :key="chart.title + index"
                :ref="el => observeChart(el, index)"
                :class="['chart-wrapper', getWidthClass(index)]">
                <div v-if="visibleCharts[index]">
                    <div class="chart-title">{{ chart.title === 'Digital Media Consumption Index Weekly'
                        ? 'Digital Media Consumption Annual View'
                        : chart.title }}</div>
                    <CataCoreUiChart
                        :options="chart.options"
                        :series="chart.series"
                        :type="chart.chartType"
                        width="100%"
                        :height="chart.chartType === 'bubble' ? '550' : '350'" />
                </div>
            </div>

        </div>

        <TagCard :tags="tags.slice(0, 2)" v-if="chartList[0].section === 'Paid Intelligence'" />

        <!-- <div class="chart-section"> -->
        <h5 v-if="chartList[0].section === 'Paid Intelligence'" class="chart-section-title my-4">
            {{paidSocial.section}}
        </h5>
        <div v-if="chartList[0].section === 'Paid Intelligence'" class="pb-4">
            <div
                ref="paidSocialEl"
                class="chart-wrapper"
                :class="{ 'full-width': true }">
                <div class="chart-title">{{ paidSocial.title }}</div>
                <CataCoreUiChart
                    v-if="showPaidSocial"
                    :options="paidSocialChart.options"
                    :series="paidSocialChart.series"
                    type="bar"
                    width="100%"
                    height="500" />
            </div>
            <!-- </div> -->
        </div>
        <h5 v-if="tags[2].section === 'Owned Intelligence' && chartList[0].section === 'Paid Intelligence'" class="chart-section-title my-4">
            {{tags[2].section}}
        </h5>
        <TagCard :tags="tags.slice(2)" v-if="tags[2].section === 'Owned Intelligence' && chartList[0].section === 'Paid Intelligence'" />
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
        paidSocial: {
            type: Object,
            required: true,
        },
    });

    const visibleCharts = ref([]);
    const chartRefs = ref([]);
    const observers = [];
    const paidSocialEl = ref(null);
    const showPaidSocial = ref(false);

    const monochromeBaseColors = ['#0A2FFF', '#0068AD', '#0E8677', '#12871C', '#A36F05', '#CC4B00', '#D11534', '#B41880', '#832EEA', '#646C72'];

    const createSmoothAreaChart = (chart, index) => {
        const type = 'area';
        const baseOptions = chartBaseOptionsMap[type] || {};

        const weekLabels = chart.data[0]?.label || [];
        const rawValues = chart.data[0]?.score || [];
        const values = rawValues.map((v) => (Number.isNaN(Number(v)) ? v : Number(v)));
        const series = [{ name: chart.title, data: values }];

        const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const weekToMonth = weekLabels.map((_, i) => monthLabels[Math.floor(i / (52 / 12))]);

        const displayedCategories = [];
        const seen = new Set();
        weekToMonth.forEach((month) => {
            if (!seen.has(month)) {
                displayedCategories.push(month);
                seen.add(month);
            } else {
                displayedCategories.push('');
            }
        });

        const dynamicOptions = {
            xaxis: {
                categories: displayedCategories,
                title: {
                    text: 'Month',
                    style: {
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#666',
                    },
                },
                tickPlacement: 'on',
                labels: {
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Inter, sans-serif',
                        colors: '#777',
                    },
                    rotate: 0,
                    trim: false,
                },
            },
            yaxis: {
                title: {
                    text: 'Indexed Consumption',
                    style: {
                        fontSize: '14px',
                        fontWeight: 500,
                        color: '#666',
                    },
                },
            },
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
                enabled: false,
            },
            markers: {
                size: 0,
            },
            tooltip: {
                enabled: true,
                shared: true,
                intersect: false,
                custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                    const week = w.globals.labels[dataPointIndex];
                    const value = series[seriesIndex][dataPointIndex];
                    return `
                    <div style="
                        border-radius: 6px;
                        overflow: hidden;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        font-family: Inter, sans-serif;
                        font-size: 14px;
                    ">
                        <div style="
                            background-color: #f1f1f1;
                            padding: 8px 12px;
                            font-weight: 600;
                        ">
                            Week ${week}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption (Annual): </span>
                            <span style="font-weight: 600;">${value}</span>
                        </div>
                    </div>
                `;
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
            title: chart.title === 'Digital Media Consumption Index Weekly'
                ? 'Digital Media Consumption Annual View'
                : chart.title,
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
                if (chart.title === 'Digital Media Consumption Index Hourly' || chart.title === 'Digital Media Consumption Index Daily') {
                    series = [{ name: 'Indexed Consumption', data: values }];
                    dynamicOptions = {
                        xaxis: {
                            categories,
                            title: {
                                text: 'Hour of the Day',
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#666',
                                },
                            },
                            labels: {
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Inter, sans-serif',
                                    colors: '#777',
                                },
                                formatter: (value) => `${value}:00`, // Optional: show "1:00", "2:00", etc.
                            },
                        },
                        yaxis: {
                            title: {
                                text: 'Indexed Consumption',
                                style: {
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: '#666',
                                },
                            },
                            labels: {
                                style: {
                                    fontSize: '13px',
                                    fontFamily: 'Inter, sans-serif',
                                    colors: '#777',
                                },
                            },
                        },
                        colors: [monochromeBaseColors[index % monochromeBaseColors.length]],
                        plotOptions: {
                            bar: {
                                horizontal: false,
                                distributed: false,
                                borderRadius: 4,
                                columnWidth: '50%',
                            },
                        },
                        tooltip: {
                            enabled: true,
                            shared: false,
                            intersect: true,
                            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
                                const hour = w.globals.labels[dataPointIndex];
                                const value = series[seriesIndex][dataPointIndex];
                                return `
                    <div style="
                        border-radius: 6px;
                        overflow: hidden;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        font-family: Inter, sans-serif;
                        font-size: 14px;
                    ">
                        <div style="
                            background-color: #f1f1f1;
                            padding: 8px 12px;
                            font-weight: 600;
                        ">
                            Hour ${hour}
                        </div>
                        <div style="
                            background: white;
                            padding: 10px 12px;
                        ">
                            <span style="color: #000; font-weight: 500;">Indexed Consumption: </span>
                            <span style="font-weight: 600;">${value}</span>
                        </div>
                    </div>
                `;
                            },
                        },
                        dataLabels: {
                            enabled: false,
                        },
                        grid: {
                            borderColor: '#f1f1f1',
                            row: {
                                colors: ['transparent', 'transparent'],
                                opacity: 0.5,
                            },
                        },
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
        if (paidSocialEl.value) {
            useIntersectionObserver(
                paidSocialEl,
                ([entry], observerElement) => {
                    if (entry.isIntersecting) {
                        showPaidSocial.value = true;
                        observerElement.disconnect(); // Optional: stop observing after load
                    }
                },
                { threshold: 0.1 },
            );
        }
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

    // const paidSocial = {
    //     title: 'Top types of social media behaviour',
    //     section: 'Digital Consumption',
    //     description: 'Top types of social media consumption for audiences of Banfield versus Population',
    //     type: 'bar',
    //     source: 'WPP Open Intelligence',
    //     data: [
    //         {
    //             name: 'Career Builders',
    //             x: '65',
    //             y: '50',
    //         },
    //         {
    //             name: 'Social Shoppers',
    //             x: '85',
    //             y: '60',
    //         },
    //         {
    //             name: 'Social Fashonistas',
    //             x: '45',
    //             y: '35',
    //         },
    //         {
    //             name: 'Social Gamers',
    //             x: '30',
    //             y: '40',
    //         },
    //         {
    //             name: 'Scrollers',
    //             x: '70',
    //             y: '75',
    //         },
    //         {
    //             name: 'Brand Followers',
    //             x: '90',
    //             y: '55',
    //         },
    //         {
    //             name: 'Lifestyle Followers',
    //             x: '75',
    //             y: '65',
    //         },
    //         {
    //             name: 'Content Creators',
    //             x: '40',
    //             y: '30',
    //         },
    //         {
    //             name: 'Influencer Followers',
    //             x: '60',
    //             y: '50',
    //         },
    //         {
    //             name: 'Celebrity Followers',
    //             x: '35',
    //             y: '45',
    //         },
    //         {
    //             name: 'Social Sports Fan',
    //             x: '25',
    //             y: '30',
    //         },
    //     ],
    // };

    const paidSocialChart = computed(() => {
        const { paidSocial } = props;
        const categories = paidSocial.data.map((item) => item.name);

        return {
            chartType: 'bar',
            title: paidSocial.title,
            section: paidSocial.section,
            description: paidSocial.description,
            series: [
                {
                    name: 'Audience',
                    data: paidSocial.data.map((item) => Number(item.x)),
                },
                {
                    name: 'Population',
                    data: paidSocial.data.map((item) => Number(item.y)),
                },
            ],
            options: {
                chart: {
                    type: 'bar',
                    height: 400,
                    toolbar: {
                        show: false,
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '50%', // Adjust this for spacing
                    },
                },
                dataLabels: {
                    enabled: true,
                    style: {
                        fontSize: '12px',
                        colors: ['#333'],
                    },
                },
                legend: {
                    show: true,
                    position: 'top',
                    horizontalAlign: 'left',
                    markers: {
                        fillColors: ['#008FFB', '#775DD0'],
                    },
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                },
                grid: {
                    borderColor: '#E4E4E7',
                    strokeDashArray: 4,
                },
                xaxis: {
                    categories,
                    labels: {
                        style: {
                            fontSize: '12px',
                            fontFamily: 'Inter',
                            colors: '#777',
                        },
                    },
                },
                yaxis: {
                    title: {
                        text: '%',
                    },
                },
                colors: ['#0A2FFF', '#D9DCDE'],
            },
        };
    });

</script>

<style scoped>
.chart-section-title {
    font-size: 20px;
    font-weight: 600;
    margin-top: 16px;
    padding-left: 5px;
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
    margin-bottom: 20px;
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
