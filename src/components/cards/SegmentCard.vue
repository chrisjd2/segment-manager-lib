<template>
    <div
        class="segment-card">

        <div class="segments">
            <!-- Primary Segment -->
            <div class="segment">
                <div class="segment-img-wrapper">
                    <img :src="'https://storage.googleapis.com/catayst-playground/segment-manager-test-pics/royal-canin/vhn-packaging-emblematic-puppy-vhn-transversal-packaging-charter.png'" alt="Primary Segment" />
                </div>
                <div class="segment-info">
                    <h4>{{ segmentData.primarySegment.name }}</h4>
                    <p>Reach: <span>{{ segmentData.primarySegment.reach.toLocaleString() }}</span></p>
                    <p>Impressions: <span>{{ segmentData.primarySegment.impressions.toLocaleString() }}</span></p>
                </div>
            </div>

            <!-- Secondary Segment -->
            <div class="segment">
                <div class="segment-img-wrapper">
                    <img :src="'https://storage.googleapis.com/catayst-playground/segment-manager-test-pics/royal-canin/vhn-packaging-emblematic-puppy-vhn-transversal-packaging-charter.png'" alt="Secondary Segment" />
                </div>
                <div class="segment-info">
                    <h4>{{ segmentData.secondarySegment.name }}</h4>
                    <p>Reach: <span>{{ segmentData.secondarySegment.reach.toLocaleString() }}</span></p>
                    <p>Impressions: <span>{{ segmentData.secondarySegment.impressions.toLocaleString() }}</span></p>
                </div>
            </div>
        </div>

        <div class="reach-info">
            <div class="d-flex flex-column">
                <div>Total Reach: <span class="total-reach">{{ segmentData.totalReach.toLocaleString() }}</span></div>
                <div>Impressions: <span class="total-reach">{{ segmentData.totalImpressions.toLocaleString() }}</span></div>
            </div>
            <span class="overlap-badge" :class="{ high: segmentData.isHighAffinity }">
                {{ segmentData.isHighAffinity ? 'High Affinity' : 'Low Affinity' }}
            </span>
        </div>

        <CataUiButton
            class="new-button"
            label="Add to Segment Manager"
            @click="addToSegmentManager(segmentData)" />
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';
    import { CataUiButton } from '@catalyst/ui-library';

    const props = defineProps({
        segmentData: {
            type: Array,
            required: true,
        },
    });

    function addToSegmentManager(segment) {
        console.log('Add to Segment Manager', segment);
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

.segment-card {
  width: 100%;
  max-width: 340px;
  background: white;
  border-radius: 12px;
  padding: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* ensures button sits at the bottom */
  gap: 15px;
  border: 1px solid #e4e4e4;
  height: 100%;
}

.segments {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 16px;
  margin-top: 14px;
  width: 100%;
}

.segment-img-wrapper {
  width: 100%;  /* ✅ Makes the wrapper flexible */
  max-width: 180px; /* ✅ Ensures images don't stretch too much */
  height: 120px; /* ✅ Keeps height uniform */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* ✅ Prevents overflow */
  border-radius: 8px;
  background-color: #f8f8f8; /* ✅ Optional: Light background for consistency */
  border: 1px solid #e4e4e4;
}

.segment img {
  width: 100%; /* ✅ Ensures the image fills the container */
  height: 100%; /* ✅ Ensures consistent height */
  object-fit: cover; /* ✅ Ensures full image visibility */
  filter: grayscale(10%);
}

.segment-info {
  margin-top: 16px;
}

.segment-info h4 {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  word-break: break-word;

}

.segment-info p {
  font-size: 12px;
  color: #71717A;
  padding: 0;
  margin: 0;
  font-weight: bold;
}

.segment-info span {
  font-weight: normal;
}

.reach-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  font-size: 12px;
  color:var(--Colors-Mono-500, #71717A);

}

.total-reach {
  font-weight: bold;
  color: #0014CC;
}

.overlap-badge {
  background: #d5f5e3;
  color: #2e8b57;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
}

</style>
