<script setup>
    defineEmits(['confirm', 'cancel']);
</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content has-background-light">
            <p><strong>Etes vous sûr(e) de vouloir annoncer votre retard ?</strong></p>
            <p>Votre classe ainsi que votre professeur sera notifié de votre retard</p>
            <button class="button is-danger" @click="$emit('confirm')">Confirmer</button>
        </div>
        <button class="button modal-close is-large is-danger" aria-label="close" @click="$emit('cancel')"></button>
    </div>
</template>

<style scoped>
</style>