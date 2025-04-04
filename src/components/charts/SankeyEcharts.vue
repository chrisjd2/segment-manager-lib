<template>
    <div class="sankey-container">
        <VChart class="chart" :option="chartOptions" autoresize />
    </div>
</template>

  <script setup>
    // import { ref } from 'vue';
    // import { use } from 'echarts/core';
    // import { SankeyChart } from 'echarts/charts';
    // import { CanvasRenderer } from 'echarts/renderers';
    // import { TooltipComponent } from 'echarts/components';
    // import VChart from 'vue-echarts'; // ✅ Use Vue-ECharts for Sankey diagrams

    // Register ECharts modules
    use([SankeyChart, CanvasRenderer, TooltipComponent]);

    const chartOptions = ref({
        tooltip: { trigger: 'item' },
        series: [
            {
                type: 'sankey',
                layout: 'none',
                emphasis: { focus: 'adjacency' },
                nodeAlign: 'left',
                data: [
                    { name: 'Volvo XC 90 Purchases' },
                    { name: 'Road Trip Fans' },
                    { name: 'Luxury Car Buyers' },
                    { name: 'Technology Aficionados' },
                    { name: 'Family-Oriented Shoppers' },
                    { name: 'Outdoor Adventure Seekers' },
                ],
                links: [
                    { source: 'Volvo XC 90 Purchases', target: 'Road Trip Fans', value: 10 },
                    { source: 'Volvo XC 90 Purchases', target: 'Luxury Car Buyers', value: 8 },
                    { source: 'Volvo XC 90 Purchases', target: 'Technology Aficionados', value: 6 },
                    { source: 'Volvo XC 90 Purchases', target: 'Family-Oriented Shoppers', value: 5 },
                    { source: 'Volvo XC 90 Purchases', target: 'Outdoor Adventure Seekers', value: 4 },
                ],
                lineStyle: { color: 'source', opacity: 0.2 },
                label: { color: '#000', fontSize: 14, fontWeight: 'bold' },
            },
        ],
    });
  </script>

  <style scoped>
  .sankey-container {
    max-width: 100%;
    overflow: hidden;
  }

  .chart {
    width: 100%;
    height: 500px;
  }
  </style>
