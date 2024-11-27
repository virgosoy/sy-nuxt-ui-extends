<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
}>(), {})
const router = useRouter()
const route = useRoute()

const model = ref('')
</script>

<template>
  <div>
    {{ model }}
    <UxStateChange v-model="model"></UxStateChange>
  </div>
</template>
