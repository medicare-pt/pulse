<template>
    <div :class="{
        'pulse-error': error,
        'pulse-success': success,
        'pulse-disabled': disabled,
    }">
        <label :for="id" v-if="labelOutside||icon"
            class="pulse-label outside">
            {{ label }}
        </label>
        <label class="pulse-field">
            <span v-if="label&&!icon"
                class="pulse-label inside">
                {{ label }}
            </span>
            <div v-if="icon"
                class="pulse-input-icon left">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                </svg>
            </div>
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
            <div v-if="!icon && iconRight"
                class="pulse-input-icon right">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" />
                </svg>
            </div>
        </label>
        <div v-if="error || hint"
            class="pulse-hint">
            <svg v-if="hintIcon"
                viewBox="0 0 24 24" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
            <p>{{ hintMessage }}</p>
        </div>
        <slot />
    </div>
</template>

<style>
@reference "tailwindcss";
@config '../tailwind.config.js';

.pulse-label {
    & { @apply block label text-black pointer-events-none; }
    &.outside { @apply pl-1 mb-1; }
    &.inside { @apply absolute top-0 left-0 ml-5 mt-3; }
    &.inside + .pulse-input { @apply pt-7 pb-2; }
}

.pulse-field {
    & {
        @apply flex items-center relative;
        @apply bg-white text-base text-gray-500 placeholder:text-gray-400;
        @apply border border-gray-200;
        @apply rounded-lg w-full;
        @apply transition-all;
        @apply focus-within:border-gray-200;
        @apply focus-within:ring ring-offset-1 ring-gray-600;
    }
}

.pulse-input {
    & {
        @apply bg-white w-full;
        @apply text-base text-gray-500;
        @apply px-5 py-3 rounded-lg
    }
    &:focus { @apply outline-none; }
}

.pulse-input-icon {
    & {
        @apply absolute top-0;
        @apply flex items-center;
        @apply h-full pointer-events-none;
    }
    & svg { @apply flex-none size-5 }
    & + input { @apply pl-9; }
    &.left { @apply left-0 pl-3; }
    &.left + input { @apply pl-10; }
    &.right { @apply right-0 justify-end pr-4; }
    input:has(+ &.right) { @apply pr-13; }
}

.pulse-hint {
    & {
        @apply flex mt-1 px-0.5;
        @apply text-gray-600 caption-sm whitespace-pre-line;
    }
    & svg { @apply flex-none size-5 mr-1 mt-px; }
    & p { @apply mt-0.75; }
}

.pulse-disabled {
    .pulse-label { @apply text-gray-500; }
    .pulse-field, .pulse-input { @apply bg-gray-100 border-gray-200; }
    .pulse-input { @apply text-gray-400 cursor-not-allowed; }
}

.pulse-success {
    .pulse-field { @apply border-green-400; }
}

.pulse-error {
    .pulse-field { @apply bg-red-50 border-red-400; }
    .pulse-input { @apply bg-red-50 text-red; }
    .pulse-input-icon svg[fill="currentColor"] { @apply fill-red; }
    .pulse-input-icon svg[stroke="currentColor"] { @apply stroke-red }
    .pulse-hint { @apply text-red; }
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
    modelValue?: PulseInputValue,
    value?: string,
    type?: PulseInputType
    label?: string
    labelOutside?: boolean
    id?: string
    name?: string
    placeholder?: string
    hint?: string
    hintIcon?: string
    hintError?: string
    error?: boolean
    success?: boolean
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    autocomplete?: string
    autocapitalize?: string
    autofocus?: boolean
    spellcheck?: boolean | 'true' | 'false'
    inputmode?: PulseInputType
    iconRight?: string
    icon?: string
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

const uid = useId()
const attrs = useAttrs()

const id = computed(() => props.id ?? `pulse-input-${uid}`)
const name = computed(() => props.name ?? undefined)
const value = computed(() => String(props.value ?? props.modelValue ?? ''))
const hintMessage = computed(() => (props.error && String(props.hintError ?? '').length > 0) ? props.hintError : props.hint)
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
