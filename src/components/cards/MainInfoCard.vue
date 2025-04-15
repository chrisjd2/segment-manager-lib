<template>
    <div class="info-card">
        <h5 class="mb-3">Top Interests</h5>
        <div class="segments">
            <div class="segment" v-for="(segment) in displayedSegments" :key="segment.name">
                <div class="segment-img-wrapper">
                    <img :src="segment.image"
                        alt="segment"
                        :title="getTooltip(segment)" />
                </div>
                <div class="segment-info">
                    <h4>{{ segment.name }}</h4>
                    <p><span>Est. Reach:</span> {{ formatReach(segment.reach) }} <CataUiTooltip
                        class="pl-1"
                        label="This is the number of people you can potentially reach through paid media platforms who share similar traits with your first-party audience." /></p>
                    <p><span>Affinity Score: </span> {{ segment.affinityScore }}<CataUiTooltip
                        class="pl-1"
                        label="This score indicates how much more likely this persona is to be interested in your brand compared to the average person. It reflects behavioral and interest similarity to your 1PD seed audience" /></p>
                </div>
            </div>
        </div>

        <!-- Branding -->
        <!-- <div class="branding" v-if="!isThumbnail">
          <img src="https://storage.googleapis.com/segments-manager/images/Asset%201.png" alt="logo" />
      </div> -->

        <!-- Metrics Section -->
        <!-- <div class="metrics">
          <div class="metric">
              <p>Affinity score</p>
              <h3>125</h3>
          </div>
          <div class="metric">
              <p>Expected Reach</p>
              <h3>2.675.300</h3>
          </div>
      </div> -->

        <!-- Button -->
        <!-- <CataUiButton
          class="new-button"
          label="Add to Segment manager"
          @click="addToSegmentManager" /> -->
    </div>
</template>

<script setup>
    import { CataUiTooltip } from '@catalyst/ui-library';
    import { computed } from 'vue';

    const props = defineProps({
        segmentData: {
            type: Object,
            required: true,
        },
        isThumbnail: {
            type: Boolean,
            default: false,
        },
    });

    function getTooltip(segment) {
        const lines = [];

        if (segment.coreEngagement) {
            lines.push(`Core Engagement: ${segment.coreEngagement}`);
        }

        if (segment.coreFocus) {
            lines.push(`Core Focus: ${segment.coreFocus}`);
        }

        return lines.length > 0 ? lines.join('\n') : 'No information available';
    }

    const displayedSegments = computed(() => {
        if (!props.segmentData || !props.segmentData.segments) {
            return [];
        }
        return props.isThumbnail
            ? props.segmentData.segments.slice(0, 5)
            : props.segmentData.segments;
    });

    function formatReach(reach) {
        if (typeof reach === 'string' && reach.includes(',')) {
            return reach; // already formatted
        }
        const num = typeof reach === 'string' ? parseInt(reach, 10) : reach;
        return Number.isNaN(num) ? reach : num.toLocaleString();
    }
</script>

<style lang="scss" scoped>
:deep(.new-button.cata-ui-button){
  background: #EFF6FF;
  display: flex;
  justify-content: center;
  margin-top: 16px;
  color: var(--Colors-Mono-900, #18181B);
  width: 100%;
}

.info-card {
width: 100%;
// max-width: 800px;
background: white;
border-radius: 12px;
padding: 20px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Top Section - Segments */
.segments {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
gap: 16px;
margin-top: 16px;
width: 100%;
justify-items: center;
}

.segment-img-wrapper {
width: 100%;
max-width: 150px;
height: 120px;
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
border-radius: 8px;
background-color: #f8f8f8;
}

.segment img {
width: 100%;
height: 100%;
object-fit: cover;
}

.segment-info {
margin-top: 8px;
}

.segment-info h4 {
font-size: 14px;
margin-bottom: 6px;
}

.segment-info p {
font-size: 12px;
color: gray;
padding-bottom: 6px;
margin: 0;
}

.segment-info span {
font-weight: bold;
}

/* Branding */
.branding {
margin-top: 16px;
font-size: 14px;
font-weight: bold;
color: gray;
}

.highlight {
color: #0057ff;
}

/* Metrics */
.metrics {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 16px;
margin-top: 16px;
}

.metric {
padding: 16px;
border: 1px solid #e4e4e7;
border-radius: 8px;
text-align: center;
}

.metric p {
font-size: 14px;
color: gray;
}

.metric h3 {
font-size: 20px;
font-weight: bold;
}
</style>
