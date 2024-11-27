<script setup lang="ts">
/**
 * 状态改变组件 \
 * 用于单击切换多个状态。
 */

interface State {
  state: string,
  icon?: string,
  color?: string,
  bgColor?: string,
}
const props = withDefaults(defineProps<{
  /**
   * 所有状态，默认为 Y,N,A
   */
  states?: State[]
  /**
   * 是否有边框
   */
  border?: boolean
}>(), {
  states: () => [{
    state: 'Y',
    icon: 'i-heroicons-check-16-solid',
    color: 'white',
    bgColor: 'green-500',
  },{
    state: 'N',
    icon: 'i-heroicons-x-mark-16-solid',
    color: 'white',
    bgColor: 'red-500',
  },{
    state: 'A',
  }],
  border: true,
})

const model = defineModel<string>()

function doToggle(){
  let newIndex = currentStateIndex.value + 1
  if(newIndex >= props.states.length){
    newIndex = 0
  }
  model.value = props.states[newIndex].state
}

const currentStateIndex = computed(() => {
  const index = props.states.findIndex(s => s.state === model.value)
  return index === -1 ? 0 : index
})
const currentState = computed(() => props.states[currentStateIndex.value])
</script>

<template>
  <div class="inline-block w-6 h-6 cursor-pointer"
        :class="[
          props.border ? 'border-2' : '',
          currentState.bgColor ? `bg-${currentState.bgColor}` : '', 
          currentState.color ? `text-${currentState.color}` : '',
        ]"
      @click="doToggle">
    <UIcon v-if="currentState.icon" 
        class="w-full h-full "
        :name="currentState.icon"></UIcon>
  </div>
</template>
