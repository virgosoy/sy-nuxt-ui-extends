
<script setup lang="ts">
import type { UxFormPropsFields } from '../../../../components/UxForm.vue';
// import type { UxFormPropsFields } from '#import';

const state = {a: 1, b: 2}
const fields = ref<UxFormPropsFields<keyof typeof state>>([
  {key: 'a', label: 'account'},
  {key: 'b', label: 'b'},
])
</script>

<template>
  <!-- 123 -->
  <UxForm :state="state" :fields="fields" submit-text="提交" ></UxForm>
</template>
