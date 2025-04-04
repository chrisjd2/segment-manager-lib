<template>
    <div class="query-builder">
        <!-- Additional Filters -->
        <!-- <div class="additional-filters">
            <h6 class="mb-4">ADDITIONAL FILTERS</h6>
            <div class="filters">

                <CataUiInputSelect
                    :style="{ width: '45%' }"
                    class="source w-100"
                    :options="filterOptions.gender"
                    v-model="selectedFilters.gender"
                    label="Gender" />

                <CataUiInputSelect
                    :style="{ width: '45%' }"
                    class="source w-100"
                    :options="filterOptions.productCategory"
                    v-model="selectedFilters.productCategory"
                    label="Product Category" />
            </div>
        </div> -->

        <!-- Query Conditions -->
        <div class="query-conditions">
            <h6>QUERY CONDITIONS</h6>

            <div v-for="(condition, index) in queryConditions" :key="index">
                <div class="condition">
                    <strong>{{ condition.field }}</strong>
                    <span>{{ condition.operator }}</span>
                    <span v-if="condition.type === 'date'">{{ formatDate(condition.value) }}</span>
                    <span v-else>{{ condition.value }}</span>
                    <CataUiButton
                        type="tertiary"
                        :icon="'bi-arrows-expand'" />
                </div>

                <div v-if="queryConditions.length > 1 && index !== queryConditions.length - 1" class="query-operator-outer">
                    <div class="query-operator"> And</div>
                </div>
            </div>

        </div>
    </div>
</template>

  <script setup>
    import { ref } from 'vue';
    import { CataUiInputSelect, CataUiButton } from '@catalyst/ui-library';

    // Available filter options for CataUiInputSelect (formatted as required)
    const filterOptions = ref({
        gender: [
            { label: 'Male', value: 'Male' },
            { label: 'Female', value: 'Female' },
            { label: 'Non-Binary', value: 'Non-Binary' },
            { label: 'Other', value: 'Other' },
        ],
        productCategory: [
            { label: 'Electronics', value: 'Electronics' },
            { label: 'Clothing', value: 'Clothing' },
            { label: 'Furniture', value: 'Furniture' },
            { label: 'Automobile', value: 'Automobile' },
        ],
    });

    // Selected filters
    const selectedFilters = ref({
        gender: null,
        productCategory: null,
    });

    // Query Conditions (Dynamically populated)
    const queryConditions = ref([
        {
            field: 'Last Purchase',
            operator: 'is greater than',
            value: '2025-04-19',
            type: 'date',
        },
        {
            field: 'Total Spend',
            operator: 'is greater than',
            value: '2,500 DKK',
            type: 'currency',
        },
    ]);

    // Format date for display
    const formatDate = (date) => new Date(date).toISOString().split('T')[0];
  </script>

  <style scoped>
  .query-builder {
    background: #f9f9f9;
    border-radius: 8px;
    font-family: "Inter", sans-serif;
    width: 100%;
  }

  .filters {
    display: flex;
    gap: 10px;
  }

  .query-conditions {
  background: #f6f6f6;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
}

.condition {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  padding-left: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-weight: 500;
}

.condition strong {
  font-weight: 700;
  margin-right: 6px; /* Add spacing between bold and normal text */
}

.condition span {
  margin-left: 4px; /* Add spacing between text elements */
}

.condition-logic {
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin: 10px 0;
  color: #222;
}

.query-operator-outer {
            width: 84px;
            min-width: 84px;

            &::before,
            &::after {
              content: "";
              width: 1px;
              height: 20px;
              margin-left: 42px;
              display: block;
              background: #e4e4e4;
            }
          }

          .query-operator {
              width: 83px;
              min-width: 83px;
              padding: 5px 0px;
                border-radius: 20px;
              margin-right: 15px;
              background: #f7f7f7;
              border: 1px solid #e4e4e4;
              display: flex;
              align-items: center;
                justify-content: center;
            }
  </style>
