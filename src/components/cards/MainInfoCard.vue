<template>
    <div class="info-card">
        <h5>Top Interests</h5>
        <div class="segments">
            <div class="segment" v-for="(segment) in displayedSegments" :key="segment.name">
                <div class="segment-img-wrapper">
                    <img :src="segment.image"
                        alt="segment"
                        :title="getTooltip('Unknown Segment Name')" />
                </div>
                <div class="segment-info">
                    <h4>{{ segment.name }}</h4>
                    <p><span>Est. Reach:</span> {{ segment.reach }} <CataUiTooltip
                        class="pl-1"
                        label="This is the number of people you can potentially reach through paid media platforms who share similar traits with your first-party audience." /></p>
                    <p><span>Affinity Score: </span> {{ segment.impressions }}<CataUiTooltip
                        class="pl-1"
                        label="A score of 158 means this persona is 58% more likely than average to be interested in your brand. It reflects behavioral and interest similarity to your seeded 1PD audience." /></p>
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

    const coreTraitsMap = {
        'Sports Enthusiasts': [
            'High affinity for both mainstream (Football, Basketball, Baseball) and niche sports (Formula 1, MMA, Equestrian, Triathlon)',
            'Likely to follow live sports, post about games/events, and participate in fantasy leagues or brackets',
        ],

        'Gaming & E-Sports Fans': [
            'Deeply immersed in online games and streaming culture',
            'Active on Twitch, Discord, Reddit, and gaming Twitter/X',
            'Passionate about competitions and influencers in the gaming ecosystem',
        ],

        'Social Shoppers & Brand Followers': [
            'Use social media to discover, evaluate, and shop products',
            'Follow brands and creators for inspiration',
            'Tend to amplify content related to lifestyle, fashion, and tech drops',
        ],

        'Fitness & Wellness Advocates': [
            'Fitness-focused, often engage in running, gym workouts, challenges',
            'Highly engaged in motivational and self-improvement content',
            'Participate in online fitness communities and track progress socially',
        ],

        'Readers & Intellectual Hobbyists': [
            'Enjoy quiet hobbies like reading, puzzles, crosswords, and culture',
            'Likely to be highly engaged in niche or curated online spaces (e.g., Goodreads, BookTok)',
            'Share reviews, quotes, and thoughtful reflections',
        ],

        'Food & Home Lovers': [
            'Passionate about cooking, home décor, and gardening',
            'Follow food bloggers, recipe creators, and home improvement influencers',
            'Post about meals, recipes, seasonal décor, and DIY projects',
        ],

        'Streaming & Entertainment Seekers': [
            'Always up to date with new releases, binge culture, and celebrity news',
            'Engage heavily with fandoms (TV shows, music artists, pop culture)',
            'Create or share reaction memes, fan theories, and reviews',
        ],

        'Demographic-Based Communities': [
            'Segments shaped by age, race/ethnicity, gender, and geography',
            'Vary in cultural expression, social causes, and lifestyle choices',
            'Participate in demographic-focused celebrations or advocacy',
        ],

        'Pet & Animal Lovers': [
            'Deep emotional connection to pets, rescue stories, and animal rights',
            'Share pet milestones, funny pet content, and adoption campaigns',
            'Engage with animal shelters, wildlife orgs, and pet brands',
        ],
    };

    function getTooltip(segmentName) {
        const traits = coreTraitsMap[segmentName];
        if (!traits) return 'No information available';
        return traits.map((t) => `• ${t}`).join('\n');
    }

    const displayedSegments = computed(() => {
        if (!props.segmentData || !props.segmentData.segments) {
            return [];
        }
        return props.isThumbnail
            ? props.segmentData.segments.slice(0, 5)
            : props.segmentData.segments;
    });
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
