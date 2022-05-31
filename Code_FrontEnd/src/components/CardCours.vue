<script setup>
defineProps({
    cours: {
        type: String,
    },
    debut: {
        type: String,
    },
    fin: {
        type: String,
    },
    classe: {
        type: String,
    },
    salle: {
        type: String,
    },
});
</script>

<template>
    <article class="tile is-child notification is-primary has-text-left-mobile">
        <p class="is-size-4 has-text-weight-bold">{{ cours }}</p>
        <p class="is-size-6">{{ debut }} - {{ fin }}</p>
        <p class="is-size-5">
            <span class="icon">
                <i class="fa fa-map-marker "></i>
            </span>
            {{ salle }}
        </p>
    </article>
</template>

<style scoped>
</style>