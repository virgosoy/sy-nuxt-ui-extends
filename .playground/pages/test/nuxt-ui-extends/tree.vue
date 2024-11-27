<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
}>(), {})
const router = useRouter()
const route = useRoute()

const nodes = [{
  id: '1',
  label: '1',
  children: [{
    id: '1-1',
    label: '1-1',
    children: [{
      id: '1-1-1',
      label: '1-1-1',
      children: [{
        id: '1-1-1-1',
        label: '1-1-1-1',
      }]
    }]
  },{
    id: '1-2',
    label: '1-2',
  },{
    id: '1-3',
    label: '1-3',
  }]
},{
  id: '2',
  label: '2',
  children: [{
    id: '2-1',
    label: '2-1',
    children: [{
      id: '2-1-1',
      label: '2-1-1',
      children: [{
        id: '2-1-1-1',
        label: '2-1-1-1',
      }]
    }]
  }]
}]
</script>

<template>
  <div>
    <UxTree :nodes="nodes"></UxTree>
  </div>
</template>
