<template>
  <div class="freeform-tab">
      <CataUiInput class="mt-15 ai-query" label="Query" type="textarea" :textArea="true"
              v-model="query" />
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import {
    CataUiButton,
    CataUiInput,

  } from '@catalyst/ui-library';
  import {  useCustomSegmentStore } from '@/store/customSegments/customSegmentStore';

  const customSegmentManagerStore = useCustomSegmentStore();
  const query = ref('');


  function insertSegment() {
    customSegmentManagerStore.set_free_form_query(query.value);
 
  }

</script>

<style lang="scss" scoped>
.freeform-tab {
  margin-right: 15px;
}
</style>
