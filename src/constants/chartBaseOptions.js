// src/constants/chartBaseOptions.js

const baseThemeOptionsForColumn = {
    colors: [
        '#0A2FFF', // cat-1-dark (vivid blue)
        '#0068AD', // cat-2-dark (deep blue)
        '#0E8677', // cat-3-dark (teal)
        '#12871C', // cat-4-dark (green)
        '#A36F05', // cat-5-dark (mustard/golden brown)
        '#CC4B00', // cat-6-dark (orange-red)
        '#D11534', // cat-7-dark (strong red)
        '#B41880', // cat-8-dark (magenta)
        '#832EEA', // cat-9-dark (purple)
        '#646C72', // cat-10-dark (slate gray)
    ],
    theme: {
        mode: 'light',
        monochrome: { enabled: false }, // default to off
    },
    tooltip: {
        theme: 'light',
    },
    grid: {
        borderColor: '#E4E4E7',
        strokeDashArray: 4,
    },
    dataLabels: {
        enabled: true,
        style: {
            fontFamily: 'Inter, sans-serif',
        },
    },
};

const baseThemeOptionsForPie = {
    colors: [
        '#85A3FF', // light blue-violet
        '#7AB6FF', // blue
        '#45E4B6', // turquoise
        '#6CE07B', // light green
        '#ECC706', // yellow
        '#FF9E66', // orange
        '#FF7A94', // coral pink
        '#ED78C6', // magenta-pink
        '#B482F3', // lavender-purple
        '#ABB1B5', // soft gray
    ],
    theme: {
        mode: 'light',
        monochrome: { enabled: false }, // default to off
    },
    tooltip: {
        theme: 'light',
    },
    grid: {
        borderColor: '#E4E4E7',
        strokeDashArray: 4,
    },
    dataLabels: {
        enabled: true,
        style: {
            fontFamily: 'Inter, sans-serif',
        },
    },
};

export const chartBaseOptionsMap = {
    area: {
        ...baseThemeOptionsForColumn,
        chart: {
            type: 'area',
            background: '#ffffff',
            height: 350,
            zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
            toolbar: { show: true, tools: { zoom: true, zoomin: true, zoomout: true, reset: true } },
        },
        stroke: { curve: 'smooth', width: 2, colors: ['#1E40AF'] },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: 'vertical',
                gradientToColors: ['#60A5FA'],
            },
        },
        grid: {
            borderColor: '#E4E4E7',
            strokeDashArray: 4,
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: true } },
        },
        tooltip: { theme: 'light', shared: true, intersect: false },
        dataLabels: { enabled: true },
    },

    vertical: {
        ...baseThemeOptionsForColumn,
        chart: {
            type: 'bar',
            background: '#ffffff',
            zoom: { enabled: true },
            toolbar: { show: true },
            scrollable: true,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                distributed: true,
                // dataLabels: { position: 'top' },
            },
        },
        xaxis: {
            labels: { show: true },
        },
        dataLabels: { enabled: false },
        grid: {
            borderColor: '#E4E4E7',
            strokeDashArray: 4,
        },
        tooltip: { theme: 'light' },
    },

    bar: {
        ...baseThemeOptionsForColumn,
        chart: {
            type: 'bar',
            background: '#ffffff',
            zoom: { enabled: true },
            toolbar: { show: true },
            scrollable: true,
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                // dataLabels: { position: 'top' },
            },
        },
        xaxis: {
            labels: { show: true },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'Inter',
                    colors: '#6B7280',
                },
            },
        },
        dataLabels: { enabled: false },
        grid: {
            borderColor: '#E4E4E7',
            strokeDashArray: 4,
        },
        colors: [
            '#1E40AF', '#3B82F6', '#60A5FA', '#A5B4FC',
            '#CBD5E1', '#64748B', '#94A3B8', '#E2E8F0', '#D1D5DB',
        ],
        tooltip: { theme: 'light' },
    },

    donut: {
        ...baseThemeOptionsForPie,
        chart: {
            type: 'donut',
            background: '#ffffff',
            toolbar: { show: true },
        },
        dataLabels: { enabled: true },
        tooltip: { theme: 'light' },
    },

    pie: {
        ...baseThemeOptionsForPie,
        chart: {
            type: 'pie',
            background: '#ffffff',
            toolbar: { show: true },
        },
        stroke: {
            show: false, // ✅ removes white gaps
            width: 0,
            colors: 'transparent',
        },
        tooltip: { theme: 'light' },
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: false,
            },
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
            },
        },
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.9,
                },
            },
        },
    },

    bubble: {
        ...baseThemeOptionsForPie,
        chart: {
            type: 'bubble',
            background: '#ffffff',
            zoom: { enabled: true },
            toolbar: { show: true },
        },
        fill: {
            type: 'solid',

        },
        markers: { strokeWidth: 0 },
        dataLabels: { enabled: true },
        tooltip: { theme: 'light' },
        xaxis: {
            title: { text: 'Impressions' },
            crosshairs: { show: true },
        },
        yaxis: {
            title: { text: 'Reach' },
            crosshairs: { show: true },
        },

    },
};

export const jsonToApexChartTypeMap = {
    'Vertical bars': 'bar', // Rendered as vertical bars
    'Horizontal bars': 'bar', // ApexCharts uses same 'bar', direction set via options
    Pie: 'pie', // Pie chart
    Donut: 'donut', // (not in your current data but optional support)
    Area: 'area', // (if needed in the future)
    Line: 'line', // (if needed in the future)
    Bubble: 'bubble', // (if needed in the future)
};
