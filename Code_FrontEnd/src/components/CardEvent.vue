<script setup>
defineProps({
  id: {},
  titre: {},
  debut: {},
  fin: {},
  classe: {},
  lieu: {},
  description: {},
});
</script>

<template>
  <article
    class="tile is-child notification is-warning-light has-text-left-mobile"
  >
    <p class="is-size-4 has-text-weight-bold">{{ titre }}</p>
    <p class="is-size-6">{{ debut }} - {{ fin }}</p>
    <p class="is-size-5">
      <span class="icon">
        <i class="fa fa-map-marker is-large"></i>
      </span>
      {{ lieu }}
    </p>
    <p class="is-size-5">{{ description }}</p>
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

.onClick{
  cursor: pointer;
}
</style>
