<template>
  <n-input
    v-if="item.type === 'input'"
    :value="value"
    @input="forwardEvent"
    :placeholder="placeholder"
  />
  <n-switch
  v-else-if="item.type === 'switch'"
  :value="value"
  @update:value="forwardEvent"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const { item } = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  value: {
    type: [String, Number, Boolean, Array, Object],
    default: "",
  },
});

const placeholder = computed(() => {
  let placeholder = item.placeholder;
  switch (item.type) {
    case "input":
      placeholder = placeholder || `请输入${item.label}`;
      break;
  }
  return placeholder;
});
const emits = defineEmits(["input"]);
function forwardEvent(event: any) {
  emits("input", {
    event,
    field: item.field,
  });
}
</script>

<style></style>
