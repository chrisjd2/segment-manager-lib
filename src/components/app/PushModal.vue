<template>
    <CataUiModal
        @close="closeModal"
        size="medium">
        <!-- Header -->
        <template #header>
            <h4 class="push-header">Push to destination(s)</h4>
        </template>
        <template #body>
            <!-- Modal Body -->
            <div class="modal-body">
                <!-- Direct Push Section -->
                <div class="section">
                    <hp>Direct Push / 1:1 audience sync</hp>
                    <div class="checkbox-group">
                        <CataUiInputCheckbox
                            v-for="option in directPushOptions"
                            :key="option"
                            :label="option"
                            v-model="selectedOptions"
                            :value="option" />
                    </div>
                </div>

                <hr />

                <!-- Campaign Section -->
                <div class="checkbox-group">
                    <CataUiInputCheckbox
                        v-for="option in campaignOptions"
                        :key="option"
                        :label="option"
                        v-model="selectedOptions"
                        :value="option" />
                </div>

                <!-- Cohort, Clean Room, and WPP Open Sections -->
                <div class="sections-wrapper">
                    <div class="section">
                        <h3>Cohort</h3>
                        <div class="checkbox-group-catergory">
                            <CataUiInputCheckbox
                                v-for="option in cohortOptions"
                                :key="option"
                                :label="option"
                                v-model="selectedOptions"
                                :value="option" />
                        </div>
                    </div>

                    <div class="section">
                        <h3>Clean Room</h3>
                        <div class="ccheckbox-group-catergory">
                            <CataUiInputCheckbox
                                v-for="option in cleanRoomOptions"
                                :key="option"
                                :label="option"
                                v-model="selectedOptions"
                                :value="option" />
                        </div>
                    </div>

                    <div class="section">
                        <h3>WPP Open</h3>
                        <div class="checkbox-group-category">
                            <CataUiInputCheckbox
                                v-for="option in wppOpenOptions"
                                :key="option"
                                :label="option"
                                v-model="selectedOptions"
                                :value="option" />
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template #footer>
            <CataUiButton class="mr-2" type="secondary" label="Cancel" @click="closeModal" />
            <CataUiButton type="primary" label="Push" @click="pushSelection" />
        </template>
    </CataUiModal>
</template>

  <script setup>
    import { ref } from 'vue';
    import { CataUiModal, CataUiButton, CataUiInputCheckbox } from '@catalyst/ui-library';

    const emits = defineEmits(['close', 'insertSegment']);

    const selectedOptions = ref([]);

    const directPushOptions = ['META', 'Google', 'TikTok', 'Snapchat', 'LinkedIn'];
    const campaignOptions = ['Build new campaign', 'Update current campaign'];
    const cohortOptions = ['Display & Video 360', 'The Trade Desk'];
    const cleanRoomOptions = ['Infosum', 'LiveRamp'];
    const wppOpenOptions = ['Open Media Studio', 'Audience Builder'];

    function closeModal() {
        emits('close');
    }

    const pushSelection = () => {
        emits('insertSegment');
        closeModal();
    };
  </script>

  <style scoped>
:deep(.cata-ui-modal-content-body) {
        background: white !important;
    }
.push-header {
    h4 {
      font-size: 18px;
      font-weight: 600;
      line-height: normal;
      margin: 0;
    }
  }

  h3 {
    font-size: 14px;
    margin-bottom: 15px;
  }

  hr {
  margin: 5px 0;
  border: 0.5px solid #ddd;
}

  .checkbox-group {
    display: flex;
    flex-wrap: wrap;
    gap: 45px;
    margin-top: 15px;
  }

  .checkbox-group-catergory {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
  }

  .sections-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 15px;
    padding-right: 45px;
  }

  </style>
