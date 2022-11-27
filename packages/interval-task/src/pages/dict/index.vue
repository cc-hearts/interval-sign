<template>
  <modal v-model:visible="visible" :title="title" @submit="handleSubmit">
    <form-wrapper
      ref="formRef"
      v-bind:="formProps"
      @change="handleChangeValue"
    />
  </modal>

  <Button @click="toggleAddDictVisible">{{ title }}</Button>

  <modal
    v-model:visible="subVisible"
    :title="subTitle"
    @submit="handleSubmitAddDictMap"
  >
    <form-wrapper
      ref="subFormRef"
      v-bind:="subFormProps"
      @change="handleChangeSubFormValue"
    />
  </modal>

  <Button @click="toggleSubFormVisible">{{ subTitle }}</Button>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Button from "@/components/button/index.vue";
import Modal from "@/components/native-ui/modal/index.vue";
import FormWrapper from "@/components/native-ui/form/index.vue";
import type { callback } from "@/types/types";
import { addDict, addDictMap } from "@/apis/dict";
import { useSetField } from "@/hooks/components/native-ui/form";
import { toggleVisible } from "@/utils/shard";
const visible = ref(false);
const formRef = ref<{ handleSubmit: callback } | null>(null);
const title = ref("添加字典");

const subTitle = ref("添加字典项");
const subVisible = ref(false);
const subFormRef = ref<{ handleSubmit: callback } | null>(null);
const formProps = reactive({
  mode: {
    code: "",
    name: "",
    status: true,
  },
  rules: {},
  wrapper: [
    { field: "code", label: "字典编码", type: "input" },
    { field: "name", label: "字典名称", type: "input" },
    { field: "status", label: "是否启用", type: "switch" },
  ],
});

const subFormProps = reactive({
  mode: {
    dictId: "",
    dictName: "",
    dictValue: "",
    status: true,
  },
  rules: {},
  wrapper: [
    { field: "dictKey", label: "字典编码", type: "input" },
    { field: "dictName", label: "字典项名", type: "input" },
    { field: "dictValue", label: "字典项值", type: "input" },
    { field: "status", label: "是否启用", type: "switch" },
  ],
});

const handleChangeValue = useSetField(formProps.mode);
const handleChangeSubFormValue = useSetField(subFormProps.mode);

function toggleAddDictVisible() {
  toggleVisible(visible);
}

function toggleSubFormVisible() {
  toggleVisible(subVisible);
}

function handleSubmit() {
  formRef.value?.handleSubmit().then((res: typeof formProps.mode) => {
    addDict(
      Object.assign({}, res, { status: Number(formProps.mode.status) })
    ).then(() => {
      toggleAddDictVisible();
    });
  });
}

function handleSubmitAddDictMap() {
  subFormRef.value?.handleSubmit().then((res: typeof formProps.mode) => {
    addDictMap(
      Object.assign({}, res, { status: Number(subFormProps.mode.status) })
    ).then(() => {
      toggleSubFormVisible();
    });
  });
}
</script>

<style></style>
