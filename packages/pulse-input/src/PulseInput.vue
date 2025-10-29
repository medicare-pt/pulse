<template>
    <div class="pulse-field"
        :class="{ 'err':error }">
        <label v-if="label"
            class="pulse-label">
            {{ label }}
        </label>
        <input v-bind="attrs"
            @input="onInput"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
            :id="id"
            :type="type"
            :name="name"
            :value="value"
            :disabled="disabled"
            :readonly="readonly"
            :required="required"
            :aria-invalid="error?'true':'false'"
            :aria-describedby="describedby"
            :aria-required="required || undefined"
            :autocapitalize="autocapitalize"
            :autocomplete="autocomplete"
            :autofocus="autofocus"
            :spellcheck="spellcheck"
            :placeholder="placeholder"
            :inputmode="inputmode as any"
            class="pulse-input"
        />
    </div>
    <p v-if="(typeof error === 'string') || hint" class="pulse-hint">
        {{ error || hint }}
    </p>
    <slot />
</template>

<style>
@reference "tailwindcss";

.pulse-field { @apply relative; }

.asd { @apply text-company-rose; }

.pulse-label {
    @apply block text-xs text-gray-400 font-semibold mb-1;
    @apply absolute top-0 left-0 ml-[18px] mt-2.5;
    .err & { @apply text-red-400; }
}

.pulse-input {
    @apply transition-all;
    @apply text-base font-semibold placeholder:text-gray-300;
    @apply bg-white border-2 border-gray-300;
    @apply rounded-lg w-full;
    @apply px-4 py-2;
    &:focus {
        @apply border-gray-200;
        @apply ring-2 ring-offset-1 ring-gray-600;
        @apply outline-none;
    }
    &:disabled {
        @apply opacity-75;
        @apply cursor-not-allowed;
    }
    .pulse-label + & { @apply pt-6.5 pb-2; }
    .err & { @apply ring-red-500 border-red-300; }
}

.pulse-hint {
    @apply text-gray-500 text-sm;
    @apply my-1 px-2;
    .err+& { @apply text-red-600; }
}

.pulse-input-wrapper {
    @apply flex items-center
}
</style>

<script setup lang="ts">
import { computed, useAttrs, useId } from 'vue'

defineOptions({
    inheritAttrs: false,
})

type PulseInputType =
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'search'
    | 'tel'
    | 'url'
    | 'date'
    | 'datetime-local'
    | 'time'
    | 'month'
    | 'week'

type PulseInputValue = string | number | null

interface PulseInputProps {
    modelValue?: PulseInputValue
    type?: PulseInputType
    label?: string
    id?: string
    name?: string
    placeholder?: string
    hint?: string
    error?: string | boolean
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    autocomplete?: string
    autocapitalize?: string
    autofocus?: boolean
    spellcheck?: boolean | 'true' | 'false'
    inputmode?: PulseInputType
}

const props = withDefaults(defineProps<PulseInputProps>(), {
    type: 'text',
    disabled: false,
    readonly: false,
    required: false,
    spellcheck: false,
    autocomplete: 'no',
    autocapitalize: 'no',
})

const emit = defineEmits<{
    (event: 'update:modelValue', value: PulseInputValue): void
    (event: 'focus', value: FocusEvent): void
    (event: 'blur', value: FocusEvent): void
    (event: 'change', value: Event): void
    (event: 'input', value: Event): void
}>()

const attrs = useAttrs()
const uid = useId()

const id = computed(() => props.id ?? `pulse-input-${uid}`)
const name = computed(() => props.name ?? undefined)
const hasLabel = computed(() => Boolean(props.label))
const value = computed(() => String(props.modelValue||''))
const describedby = computed(() => {
    const ids: string[] = []
    if (props.error) {
        ids.push(`${id.value}-error`)
    } else if (props.hint) {
        ids.push(`${id.value}-hint`)
    }
    return ids.length > 0 ? ids.join(' ') : undefined
})

const parseInputValue = (event: Event): PulseInputValue => {
    const target = event.target as HTMLInputElement
    if (props.type === 'number') {
        return target.value === '' ? null : target.valueAsNumber
    }
    return target.value
}

const onInput = (event: Event) => {
    emit('input', event)
    emit('update:modelValue', parseInputValue(event))
}

const onChange = (event: Event) => {
    emit('change', event)
    emit('update:modelValue', parseInputValue(event))
}

const onFocus = (event: FocusEvent) => {
    emit('focus', event)
}

const onBlur = (event: FocusEvent) => {
    emit('blur', event)
}
</script>
