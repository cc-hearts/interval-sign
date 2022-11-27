<template>
  <n-modal :show="visible" @update:show="handleCancelModal">
    <n-card
      :style="{ width }"
      :title="title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <slot name="header-extra"></slot>
      </template>
      <slot></slot>
      <template #footer>
        <slot name="footer">
          <div class="modal-footer">
            <Button @click="handleCancelModal">取消</Button>
            <Button type="primary" @click="handleSubmitModal">确定</Button>
          </div>
        </slot>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import Button from "@/components/button/index.vue";
const emits = defineEmits(["update:visible", "submit"]);
const { visible } = defineProps({
  title: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "50%",
  },
  visible: {
    type: Boolean,
    default: false,
  },
});

function handleCancelModal() {
  emits("update:visible", false);
}
function handleSubmitModal() {
  emits("submit");
}
</script>

<style lang="less" scoped>
.modal-footer {
  text-align: right;
  button:first-child {
    margin-right: 8px;
  }
}
</style>
