<script setup>
import { ref, watchEffect } from 'vue';

let hashUrl = ref(window.location.hash);
let bread = ref(null)
window.addEventListener('hashchange', () => {
  hashUrl.value = window.location.hash;
  bread.value = window.location.hash.slice(1)
});

</script>

<template>
  <nav class="main mx-1 my-1">
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><a :href="hashUrl" aria-current="page"> {{ bread }} </a></li>
      </ul>
    </nav>
  </nav>
</template>
  
<style scoped>
</style>