<template>
    <div class="query-attributes">
        <CataUiSpinner v-if="fetching" class="query-builder-left-loader" size="xlarge" />
        <div
            class="query-attributes-group"
            v-for="table in tables"
            :key="table.display_name"
            :class="{ closed: collapsed.includes(table.display_name) }">
            <div
                class="query-attributes-group-toggle"
                @click="toggleGroup(table.display_name)"
                @keydown.enter="toggleGroup(table.display_name)">
                <span class="arrow"></span>
                {{ table.display_name }}
            </div>
            <div class="query-attributes-group-items" v-if="!collapsed.includes(table.display_name)">
                <Container
                    behaviour="copy"
                    group-name="1"
                    :get-child-payload="(event) => getAttributeDropPayload(event, table.columns)"
                    @drag-end="$emit('drag-end')">
                    <Draggable v-for="(column) in table.columns" :key="column.display_name">
                        <div
                            class="attribute"
                            @mousedown="$emit('drag-start')"
                            @mouseup="$emit('drag-end')">
                            <CataUiIcon class="drag-icon" icon="bi-grip-vertical" size="20px" />
                            <div class="attribute-content" @click.stop="$emit('click-attribute', column)">
                                <span class="attribute-type">{{ column.type }}</span>
                                <span class="attribute-name">{{ column.display_name }}</span>
                            </div>
                        </div>
                    </Draggable>
                </Container>
            </div>
        </div>
    </div>
</template>
  <script setup>
    import { Container, Draggable } from 'vue3-smooth-dnd';
    import { CataUiIcon, CataUiSpinner } from '@catalyst/ui-library';

    defineProps({
        tables: {
            type: Array,
            required: true,
        },
        collapsed: {
            type: Array,
            required: true,
        },
        fetching: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['click-attribute', 'drag-start', 'drag-end', 'toggle-group']);

    function toggleGroup(groupName) {
        emit('toggle-group', groupName);
    }

    function getAttributeDropPayload(index, columns) {
        return columns[index];
    }
  </script>
<style scoped lang="scss">
.query-attributes {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  position: relative;
}

.query-attributes-group {
  margin-bottom: 20px;
  padding-right: 15px;

  &.closed .arrow {
    rotate: 0deg;
  }
}

.query-attributes-group-toggle {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;

  .arrow {
    border-bottom: 4px solid transparent;
    border-left: 6px solid #0014cc;
    border-top: 4px solid transparent;
    width: 0;
    height: 0;
    margin-right: 8px;
    transition: transform 0.1s ease-out;
    rotate: 90deg;
  }
}

.query-attributes-group-items {
  .attribute {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 64px;
    margin-bottom: 10px;
    padding: 5px 10px;

    .drag-icon {
      color: #ccc;
      padding: 0 8px;
      cursor: move;
    }

    .attribute-content {
      display: flex;
      flex-direction: column;
      border-left: 1px solid #ccc;
      padding-left: 12px;
      cursor: pointer;
      width: 100%;

      .attribute-type {
        font-size: 10px;
        color: #767676;
        text-transform: uppercase;
      }

      .attribute-name {
        font-size: 14px;
        color: #212121;
        text-transform: uppercase;
      }
    }
  }
}
</style>
