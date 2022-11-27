<template>
  <n-form ref="formRef" :model="mode" :rules="rules">
    <template v-for="item in wrapper" :key="item.field">
      <n-form-item :path="item.field" :label="item.label">
        <template v-if="item.slot">
          <slot :name="item.slot" />
        </template>
        <template v-else>
          <item-vue
            :item="item"
            :value="mode[item.field]"
            @input="forwardEvent"
          />
        </template>
      </n-form-item>
    </template>
  </n-form>
</template>

<script setup lang="ts">
import ItemVue from "./item.vue";
// 基于native-ui 封装的表单组件
// propType 可以重新定义props类型
import { ref } from "vue";
import { callback } from "@/types/types";

interface formItemInter {
  slot?: string;
  field: string;
  label: string;
  type: "input" | string;
}
const formRef = ref<{ validate: callback } | null>(null);

const emits = defineEmits(["change"]);

const { mode } = defineProps({
  mode: {
    type: Object,
    default: () => ({}),
  },
  rules: {
    type: Object,
    // required: true,
    default: () => ({}),
  },
  wrapper: {
    type: Array<formItemInter>,
    default: () => [],
  },
});

defineExpose({
  handleSubmit,
});

function forwardEvent<T extends { event: any; field: string }>(data: T) {
  emits("change", data);
}

function handleSubmit() {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((errors: Error) => {
      if (errors) {
        reject(errors);
        return;
      }
      resolve(mode);
    });
  });
}
</script>

<style></style>
