<template>
    <div>
        <div ref="sankeyContainer" class="sankey-wrapper"></div>
    </div>
</template>

<script setup>
    // import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
    // import ApexSankey from 'apexsankey';

    // Reference for the chart container
    const sankeyContainer = ref(null);
    let sankeyInstance = null;

    // **Updated Sankey Data (Balanced for a more downward flow)**
    const sankeyData = {
        nodes: [
            { id: 'volvo', title: 'Volvo XC 90 Purchases', color: '#FFFFFF', borderColor: '#000000' },
            { id: 'roadtrip', title: 'Road Trip Fans', color: '#1E40AF', textColor: '#FFFFFF' },
            { id: 'luxury', title: 'Luxury Car Buyers', color: '#3B82F6', textColor: '#FFFFFF' },
            { id: 'tech', title: 'Technology Aficionados', color: '#60A5FA', textColor: '#000000' },
            { id: 'family', title: 'Family-Oriented Shoppers', color: '#93C5FD', textColor: '#000000' },
            { id: 'outdoor', title: 'Outdoor Adventure Seekers', color: '#BFDBFE', textColor: '#000000' },
        ],
        edges: [
            { source: 'volvo', target: 'roadtrip', value: 4, type: 'Segment' }, // 🔹 Increase value for higher impact
            { source: 'volvo', target: 'luxury', value: 2, type: 'Segment' },
            { source: 'volvo', target: 'tech', value: 1, type: 'Segment' }, // 🔹 Reduced for a more balanced shape
            { source: 'volvo', target: 'family', value: 1, type: 'Segment' },
            { source: 'volvo', target: 'outdoor', value: 1, type: 'Segment' },
        ],
        options: {
            order: [[['volvo']], [['roadtrip']], [['luxury', 'tech']], [['family', 'outdoor']]], // 🔹 Reorders nodes for a more downward curve
        },
    };

    const sankeyOptions = {
        width: 450,
        height: 450, // 🔹 Increased height for better proportions
        spacing: 40, // 🔹 Moves items closer together while keeping the flow natural
        nodeWidth: 20, // 🔹 Keeps the left source node visible
        nodeBorderWidth: 0, // 🔹 Removes unnecessary borders
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        fontColor: '#000',
        edgeOpacity: 0.6, // 🔹 Keeps paths visible but not too harsh
        edgeColor: '#90CAF9', // 🔹 Light blue flow color
        enableTooltip: true,
        tooltipBorderColor: '#BCBCBC',
        tooltipBGColor: '#FFFFFF',
        curve: 'smooth', // 🔹 Ensures flowing, natural links
    };

    const destroyChart = () => {
        if (sankeyInstance) {
            const container = sankeyContainer.value;
            if (container) {
                container.innerHTML = ''; // Clears the SVG content
            }
            sankeyInstance = null; // Reset the instance
        }
    };

    onMounted(async () => {
        await nextTick(); // Ensures DOM is fully rendered before initializing chart

        if (!sankeyContainer.value) {
            console.error('Sankey container not found!');
            return;
        }

        try {
            sankeyInstance = new ApexSankey(sankeyContainer.value, sankeyOptions);
            sankeyInstance.render(sankeyData);
        } catch (error) {
            console.error('Error initializing ApexSankey:', error);
        }
    });

    onBeforeUnmount(() => {
        destroyChart();
    });
</script>

<style scoped>
.sankey-wrapper {
  max-width: 450px;
  overflow: hidden;
  transform: translateY(-40px);
}
</style>
