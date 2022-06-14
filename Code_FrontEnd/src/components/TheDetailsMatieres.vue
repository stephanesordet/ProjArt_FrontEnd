<script setup>
import { ref } from "vue";

defineProps({
  prof: {},
  matiere: {},
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
        <span>Responsable du cours : {{ prof }}</span>
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

.content h2 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
}
.content h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
</style>
