<script setup lang="ts">
    import PulseInput from '../../pulse-input/src/PulseInput.vue'
</script>

<template>
    <main class="w-full mx-auto max-w-2/3 p-11 border-2 border-dashed border-[#7b61ff] rounded-xl flex flex-col gap-6">

        <PulseInput
            placeholder="Name Ipsum"
            label="Label Ipsum"
            hint="Hint Ipsum"
            hint-icon="TBD"
            inputmode="tel"
            icon="TBD"
        />

        <PulseInput
            placeholder="Name Ipsum"
            label="Label Ipsum"
            hint="Hint Ipsum"
            hint-icon="TBD"
            icon-right="TBD"
            :autofocus="true"
        />

        <PulseInput success
            placeholder="Name Ipsum"
            label="Label Ipsum"
            hint="Error Ipsum"
            hint-icon="TBD"
            icon="TBD"
            :autofocus="true"
        />

        <PulseInput disabled
            placeholder="Name Ipsum"
            label="Label Ipsum"
            hint="Hint Ipsum"
            hint-icon="TBD"
            icon="TBD"
            :autofocus="true"
        />

        <PulseInput error
            placeholder="Name Ipsum"
            label="Label Ipsum"
            hint="Hint Ipsum"
            hint-error="Error Ipsum"
            hint-icon="TBD"
            icon="TBD"
            :autofocus="true"
        />

    </main>
</template>

<style>
@reference "tailwindcss";
/* @config '../tailwind.config.js'; */
</style>
