<script setup>
defineProps({
  cours: {},
  debut: {},
  fin: {},
  classe: {},
  salle: {},
  id: {},
});
</script>

<template>
  <article class="tile is-child notification is-light has-text-left-mobile">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <p class="is-size-4 is-size-5-mobile has-text-weight-bold my-y">{{ cours }}</p>
    <p class="is-size-6 is-size-7-mobile my-2">{{ debut }} - {{ fin }}</p>
    <p class="is-size-5 is-size-6-mobile my-2">
      <span class="icon">
        <i class="fa fa-map-marker mr-2"></i>
      </span>
      {{ salle }}
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
  padding-bottom: 40px;
}
</style>
