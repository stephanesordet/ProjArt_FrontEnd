<script setup>
import { ref } from "vue";

defineProps({
  prof: {
    type: String,
  },
  matiere: {
    type: String,
  },
});
</script>

<template>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div class="columns is-family-sans-serif is-responsive">
    <div
      class="box content is-half is-offset-one-quarter has-background-light has-text-left column"
    >
      <h2>
        {{ matiere }}
      </h2>
      <p class="is-size-6">
        <em>{{ prof }}</em>
      </p>
      <h4>Remarques pour les cours de {{ matiere }} :</h4>

      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.icon-text {
  display: block;
  text-align: left;
}
</style>
