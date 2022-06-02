<script setup>
    defineEmits(['confirm', 'cancel']);
</script>

<template>
    <div class="modal">
        <div class="modal-background"></div>
        <div class="modal-content box has-background-light is-rounded">
            <p><strong>Etes vous sûr(e) de vouloir annoncer votre retard ?</strong></p>
            <p>Votre classe ainsi que votre professeur sera notifié de votre retard</p>
            <button class="button is-danger is-rounded is-pulled-right" @click="$emit('confirm')">Confirmer</button>
        </div>
        <button class="button modal-close is-large is-danger is-right is-rounded" aria-label="close" @click="$emit('cancel')"></button>
    </div>
</template>

<style scoped>
</style>