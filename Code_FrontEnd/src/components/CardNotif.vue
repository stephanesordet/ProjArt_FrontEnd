<script setup>
defineProps({
  user: {},
  object: {},
  message: {},
  envoiHeure: {},
});
</script>
<template>
  <article class="tile is-child notification is-light has-text-left-mobile">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <span class="icon">
      <i class="fa fa-solid fa-circle fa-lg"></i>
    </span>
    <p class="is-size-4 has-text-weight-bold">{{ user }} - {{ object }}</p>
    <p class="is-size-6">{{ envoiHeure }}</p>
    <p class="is-size-5">
      {{ message }}
    </p>
    <slot></slot>
  </article>
</template>

<style scoped>
article {
  border-left-width: 15px;
  border-style: solid;
  border-color: #ff3860;
  border-right-width: 0px;
  border-top-width: 0px;
  border-bottom-width: 0px;
}
</style>
