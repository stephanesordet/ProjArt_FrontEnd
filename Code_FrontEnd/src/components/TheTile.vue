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
    <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary has-text-left-mobile">
            <p class="title">{{ cours }}</p>
            <span class="icon">
                <i class="fa fa-map-marker is-large"></i>
            </span>
            <span class="subtitle">{{ debut }} - {{ fin }}</span><br><br>
            <p class="subtitle">{{ salle }}</p>
        </article>
    </div>
</template>
