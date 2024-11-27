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

const nodes = defineModel<Record<string, any>[]>('nodes', {required: true})
/**
 * 值类型是 node[props.nodeKey]
 */
const expanded = defineModel<any[]>('expanded', {
  default: () => reactive([])
})

</script>

<template>
  <div>
    a {{ expanded }}
    <UxTreeNodes 
        v-model:nodes="nodes"
        v-model:expanded="expanded"
        :nodeKey="props.nodeKey" 
        :labelKey="props.labelKey" 
        :childrenKey="props.childrenKey">
    </UxTreeNodes>
  </div>
</template>
