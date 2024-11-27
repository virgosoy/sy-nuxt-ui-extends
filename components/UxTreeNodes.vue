<script setup lang="ts">
const props = withDefaults(defineProps<{
  nodeKey?: string
  labelKey?: string
  childrenKey?: string
}>(), {
  nodeKey: 'id',
  labelKey: 'label',
  childrenKey: 'children',
})

type Node = Record<string, any>
const nodes = defineModel<Node[]>('nodes', {required: true})
const expanded = defineModel<any[]>('expanded', { required: true })

function toggleExpand(node: Node){
  const nodeId = node[props.nodeKey]
  const index = expanded.value.indexOf(nodeId)
  if(index === -1){
    expanded.value.push(nodeId)
  }else{
    expanded.value.splice(index, 1)
  }
}
function isExpanded(node: Node){
  const nodeId = node[props.nodeKey]
  return expanded.value.includes(nodeId)
}
function canExpanded(node: Node){
  return node[props.childrenKey]?.length ?? 0 !== 0
}

// TODO: 处理选择的值
</script>

<template>
  <div v-for="node in nodes" 
    :key="node[props.nodeKey]">
    <div class="flex items-center space-x-1">
      <UButton color="gray" variant="ghost" 
        :class="{ 'invisible' : !canExpanded(node) }" 
        size="2xs"
        @click="toggleExpand(node)" 
        :icon="isExpanded(node) ? 'i-heroicons-chevron-down-16-solid' : 'i-heroicons-chevron-right-16-solid'"></UButton>
      <UCheckbox :ui="{base: 'cursor-pointer'}"></UCheckbox>
      <div>{{ node[props.labelKey] }}</div>
    </div>
    <div class="pl-6">
      <UxTreeNodes v-if="isExpanded(node)" 
          v-model:nodes="node[props.childrenKey]" 
          v-model:expanded="expanded"
          :node-key="props.nodeKey" 
          :label-key="props.labelKey" 
          :children-key="props.childrenKey"></UxTreeNodes>
    </div>
  </div>
</template>
