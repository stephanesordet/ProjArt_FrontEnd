<script setup>
function returnFonction(){
   history.back();
}
</script>

<template>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <button @click="returnFonction()" class="button is-white is-large is-responsive is-flex is-align-self-flex-end icon-text">
        <span class="icon">
            <i class="fa fa-arrow-left is-flex  has-text-black"></i>
        </span>
    </button>
</template>

<style scoped>
</style>