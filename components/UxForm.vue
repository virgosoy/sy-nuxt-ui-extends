<!-- <script setup lang="ts">
const props = defineProps<{
  modelValue?: boolean
}>()
const router = useRouter()
const route = useRoute()

</script>

<template>
  <div>
    <slot />
  </div>
</template> -->



<script setup lang="ts" generic="K extends string">
// @ts-ignore
import type { ZodSchema } from 'zod'
// @ts-ignore
import type { ValidationError as JoiError, Schema as JoiSchema } from 'joi'
// @ts-ignore
import type { ObjectSchema as YupObjectSchema, ValidationError as YupError } from 'yup'
// @ts-ignore
import type { ObjectSchemaAsync as ValibotObjectSchema } from 'valibot'
import type { FormError, FormEventType } from '#ui/types'
// import type { UForm } from '#build/components';

import { upperFirst } from 'scule'

export type UxFormPropsFields<K extends string = string> = FieldMeta<K>[]

export interface FieldMeta<K> {
  /**
   * 改为 key 与 UTable.columns[].key 统一
   */
  key: K
  /**
   * 默认 {@link FieldMeta.key} 的首字母大写
   */
  label?: string
}

// type a = typeof UForm['__defaults']

type UFormProps = {
  // state: Record<string, any>
  schema?: // any
    | ZodSchema
    | YupObjectSchema<any>
    | JoiSchema
    | ValibotObjectSchema<any>
  validate?: 
    | ((state: any) => Promise<FormError[]>)
    | ((state: any) => FormError[])
  validateOn?: FormEventType[]
}

type UFormEmits = {
  (e: 'submit', args: any): any
  (e: 'error', args: any): any
}

type InnerProps<K extends string> = UFormProps & {
  state: Record<K, any>
  fields?: UxFormPropsFields<K>
  submitText?: string
}

const props = defineProps<InnerProps<K>>()

const emit = defineEmits<UFormEmits>()

const fields = computed(() => {
  return props.fields ?? Object.keys(props.state ?? {}).map(key => ({
    key: key as K,
    label: upperFirst(key),
  }))
})
</script>

<template>
  <UForm :state="props.state" 
      @submit="emit('submit', $event)" 
      @error="emit('error', $event)">
    <UFormGroup 
        v-for="fieldMeta in fields" 
        :label="fieldMeta.label ?? upperFirst(fieldMeta.key)" :name="fieldMeta.key">
      <UInput v-model="props.state[fieldMeta.key]"></UInput>
    </UFormGroup>
    <slot name="action">
      <UButton type="submit">{{ submitText ?? 'Submit' }}</UButton>
    </slot>
  </UForm>
</template>
