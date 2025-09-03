<template>
    <CataUiModal
        @close="closeModal"
        size="large">
        <template #header>
            <div v-if="!showExplorer">
                <div class="header">
                    <h4>Segment Manager</h4>
                </div>
                <!-- <div class="tabs-primary" :class="{ custom: true }">
                    <button class="tabs-primary-button"
                        type="button"
                        :class="{ selected: activeTab === 'standard' }"
                        @click="changeView('standard')">
                        Standard Segment
                    </button>
                    <button class="tabs-primary-button"
                        type="button"
                        :class="{ selected: activeTab === 'custom' }"
                        @click="changeView('custom')">
                        Custom Segment
                    </button>
                </div> -->
                <CataUiTabSwitch :tabs="tabs" v-model="tabActive" class="ml-1" />
            </div>
            <div v-if="showExplorer">
                <div @click="gobackToSegmentView" class="navigation">
                    <CataUiIcon icon="bi-chevron-left" class="chevron-bold" />
                    <p class="mt-6"> Back to Segment Manager</p>
                </div>
                <div class="discovery-header">
                    <div class="discovery-header-title">
                        <h6>Segment Manager</h6>
                        <p>Enriching 1PD audience segments with WPP Open Intelligence</p>
                    </div>

                    <!-- <CataUiButton label="Go to activation" /> -->
                </div>
            </div>
        </template>
        <template #body>
            <StandardSegments v-if="tabActive.id === 1 && !showExplorer"
                :baseUrl="baseUrl"
                :tenantId="tenantId"
                @insertSegment="onInsertSegment"
                @showInsightsExplorer="showInsightsExplorer"
                :brandId="brandId"
                :token="token"
                :selectedSegment="selectedSegment"
                :currentlySelectedSegment="currentlySelectedSegment" />
            <CustomSegments
                v-if="tabActive.id === 2 && !showExplorer"
                @insertSegment="onInsertSegment"
                @showInsightsExplorer="showInsightsExplorer"
                :customSegmentUrl="customSegmentUrl"
                :tenantId="tenantId"
                :brandId="brandId"
                :token="token" />
            <ExploreInsights v-if="showExplorer" />

        </template>
    </CataUiModal> 
</template>

<script setup>
    import { ref, onMounted, defineEmits } from 'vue';
    import { CataUiModal, CataUiButton, CataUiIcon, CataUiTabSwitch } from '@catalyst/ui-library';
    import { useSegmentManagerStore } from '@/store/segmentManagerStore';
    import { useCustomSegmentStore } from '@/store/customSegments/customSegmentStore';
    import StandardSegments from '@/components/segmentManager/StandardSegments.vue';
    import CustomSegments from '@/components/segmentManager/CustomSegments.vue';
    import ExploreInsights from '@/components/segmentManager/ExploreInsights.vue';

    const emits = defineEmits(['close', 'insertSegment']);
    const segmentManagerStore = useSegmentManagerStore();
    const customSegmentManagerStore = useCustomSegmentStore();

    const props = defineProps({
        baseUrl: {
            type: String,
            default: 'https://sm-standard-segments-838902823068.europe-west1.run.app',
        },
        customSegmentUrl: {
            type: String,
        },
        token: {
            type: String,
            required: true,
        },
        tenantId: {
            type: String,
            required: true,
        },
        brandId: {
            type: String,
            default: 1,
        },
        selectedSegment: {
            type: Object,
            default: null,
        },
    });
    const tabs = [
        { label: 'Standard Segment', id: 1 },
        { label: 'Custom Segment', id: 2 },
    ];
    const activeTab = ref('standard');
    const tabActive = ref(tabs[0]);
    const showExplorer = ref(false);
    const currentlySelectedSegment = ref(null);

    function showInsightsExplorer(selectedSegment) {
        currentlySelectedSegment.value = selectedSegment;
        showExplorer.value = true;
    }

    function changeView(view) {
        activeTab.value = view;
    }

    function closeModal() {
        emits('close');
    }

    function onInsertSegment(segment) {
        emits('insertSegment', segment);
    }

    function gobackToSegmentView() {
        showExplorer.value = false;
    }

    onMounted(() => {
        segmentManagerStore.set_brandId(props.brandId);
        segmentManagerStore.set_token(props.token);
        segmentManagerStore.set_tenantId(props.tenantId);
        segmentManagerStore.set_baseUrl(props.baseUrl);
        customSegmentManagerStore.set_customSegmentUrl(props.customSegmentUrl);
        activeTab.value = segmentManagerStore.get_activeTab;
    });

</script>

<style lang="scss" scoped>
    :deep(.cata-ui-modal-content.large) {
        max-width: 100% !important;
    }

    :deep(.cata-ui-modal-content-header) {
        padding-bottom: 0px !important;
    }

    :deep(.cata-ui-modal-content-body) {
        background-color: #F8F9FB;
    }

    :deep(.modal-body) {
        padding: 10px 0px 10px 0px;
    }

    $padding: 5px;

    .header {
        font-size: 20px;
        font-weight: 600;
        line-height: normal;
        padding: 0px #{$padding + 30} $padding 0px;
        word-break: break-word;
    }

    .modal-body {
        height: calc(100vh - 197px);
        overflow-y: hidden
    }

    .subtitle {
        color: var(--color-grey-600);
        font-size: 14px;
        font-weight: 400;
    }

    .tabs-primary {
    background-color: var(--color-grey-300);
    border-radius: 8px;
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;
    padding: 3px;
    width: 169px;

    &.custom {
      width: 325px;
    }

    &-button {
      background-color: var(--color-grey-300);
      border-color: var(--color-grey-300);
      border-radius: 8px;
      border-spacing: 0;
      border-style: solid;
      border-width: 1px;
      color: var(--color-grey-800);
      font-size: 14px;
      font-weight: 700;
      line-height: normal;
      list-style: none outside none;
      outline: none;
      padding: 8px 16px;
      text-align: left;
      text-decoration: none;
      text-indent: 0;
      white-space: nowrap;

      &:not(:last-child) {
        margin-right: 4px;
      }

      &.selected {
        background-color: var(--color-blue-100);
        box-shadow: 0px 1px 4px rgba(52, 58, 63, 0.12);
        border-color: #0014CC;
        color:#0014CC;
      }

      &:hover {
        background-color: var(--color-grey-100);
      }
    }
  }

.discovery-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
    margin-top: 14px;
    padding: 0 20px;

    h6 {
      font-size: 18px;
      font-weight: 500;
      color:#0014CC;
      line-height: normal;
      margin: 0;
    }
  }

  .discovery-header-title {
    display: flex;
    flex-direction: column;
    gap: 4px;

    p {
      font-size: 14px;
      font-weight: 400;
      color: var(--color-grey-600);
      line-height: normal;
      margin: 0;
    }
  }

  .navigation {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    border-color: var(--color-grey-300);

    p {
      color: var(--color-blue-500);
      cursor: pointer;
      font-size: 12px;
      font-weight: 400;
      line-height: normal;
      margin: 0;
    }
  }

  .chevron-bold {
    color: var(--color-blue-500);
    cursor: pointer;
    font-size: 12px;
    margin-right: 10px;
  }

</style>
