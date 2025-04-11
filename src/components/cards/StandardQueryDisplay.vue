<template>
    <div class="query-builder">
        <!-- Query Conditions -->
        <div class="query-conditions">
            <h6>QUERY CONDITIONS</h6>

            <div
                v-for="(group, groupIndex) in query"
                :key="`group-${groupIndex}`"
                class="query-group">

                <!-- Loop through each condition in the group -->
                <div
                    v-for="(condition, index) in group.conditions"
                    :key="`condition-${index}`">

                    <!-- Render condition row -->
                    <div class="condition">
                        <div class="cell field">{{ condition.field }}</div>
                        <div class="cell operator">{{ condition.operator }}</div>
                        <div class="cell value">{{ renderValue(condition) }}</div>
                        <CataUiButton type="tertiary" icon="bi-arrows-expand" />
                    </div>

                    <!-- Show logic between conditions in the same group -->
                    <div
                        v-if="index < group.conditions.length - 1"
                        class="query-operator-outer">
                        <div class="query-operator">{{ group.logic.replace('$', '').toUpperCase() }}</div>
                    </div>
                </div>

                <!-- Optional: Show logic between groups -->
                <div
                    v-if="groupIndex < query.length - 1"
                    class="query-operator-outer">
                    <div class="query-operator">{{ query[groupIndex + 1].logic.replace('$', '').toUpperCase() }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { CataUiButton } from '@catalyst/ui-library';

    const props = defineProps({
        query: {
            type: Array,
            required: true,
        },
    });

    const formatDate = (date) => {
        try {
            return new Date(date).toISOString().split('T')[0];
        } catch {
            return '-';
        }
    };

    const renderValue = (condition) => {
        const val = condition?.value;
        if (!val) return '-';

        if (condition.type === 'date') return formatDate(val);
        if (Array.isArray(val)) return val.join(', ');
        if (typeof val === 'boolean') return val ? 'True' : 'False';
        return val;
    };
</script>

<style scoped>
.query-builder {
  background: #f9f9f9;
  border-radius: 8px;
  font-family: "Inter", sans-serif;
  width: 100%;
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
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  align-items: center;
  background: #fff;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-weight: 500;
  gap: 10px;
}

.condition strong {
  font-weight: 700;
  margin-right: 6px;
}

.condition span {
  margin-left: 4px;
}

.cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.field {
  font-weight: 700;
}

.query-operator-outer {
  width: 84px;
  min-width: 84px;
  margin: 8px 0;

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
