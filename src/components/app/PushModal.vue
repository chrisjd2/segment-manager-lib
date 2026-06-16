<template>
    <CataUiModal
        @close="closeModal"
        size="medium">
        <!-- Header -->
        <template #header>
            <h4 class="push-header">Push to destination(s)</h4>
        </template>
        <template #body>
            <!-- Loading state -->
            <div v-if="status === 'loading'" class="push-status">
                <CataUiSpinner size="xlarge" />
                <p>Pushing audience...</p>
            </div>

            <!-- Confirmation state -->
            <div v-else-if="status === 'confirmed'" class="push-status">
                <p>{{ confirmationMessage }}</p>
            </div>

            <!-- Modal Body -->
            <div v-else class="modal-body">
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
            <!-- Confirmation footer -->
            <CataUiButton v-if="status === 'confirmed'" type="primary" label="Ok" @click="closeModal" />
            <!-- Form footer (hidden while loading) -->
            <template v-else-if="status === 'form'">
                <CataUiButton class="mr-2" type="secondary" label="Cancel" @click="closeModal" />
                <CataUiButton type="primary" label="Push" @click="pushSelection" />
            </template>
        </template>
    </CataUiModal>
</template>

  <script setup>
    import { ref, computed } from 'vue';
    import { CataUiModal, CataUiButton, CataUiInputCheckbox, CataUiSpinner } from '@catalyst/ui-library';

    const emits = defineEmits(['close', 'insertSegment']);

    const selectedOptions = ref([]);

    // 'form' -> 'loading' -> 'confirmed'
    const status = ref('form');

    const confirmationMessage = computed(() => {
        const destinations = selectedOptions.value.length
            ? selectedOptions.value.join(', ')
            : 'the selected destination(s)';
        return `Audience pushed to ${destinations}`;
    });

    const directPushOptions = ['META', 'Google', 'TikTok', 'Snapchat', 'LinkedIn'];
    const campaignOptions = ['Build new campaign', 'Update current campaign'];
    const cohortOptions = ['Display & Video 360', 'The Trade Desk'];
    const cleanRoomOptions = ['Infosum', 'LiveRamp'];
    const wppOpenOptions = ['Open Media Studio', 'Audience Builder'];

    function closeModal() {
        emits('close');
    }

    const pushSelection = () => {
        status.value = 'loading';
        // Simulate the push to destination(s) before confirming.
        setTimeout(() => {
            emits('insertSegment');
            status.value = 'confirmed';
        }, 2500);
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

  .push-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 40px 20px;
    text-align: center;
    min-height: 160px;
  }

  .push-status p {
    font-size: 16px;
    margin: 0;
  }

  .sections-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 15px;
    padding-right: 45px;
  }

  </style>
