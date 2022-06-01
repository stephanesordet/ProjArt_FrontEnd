<script setup>

defineProps({
  element1: {
    type: String,
  },
  // element2: {
  //   type: String,
  // },
});

// let deuxElements = false;

// if (element2 === " ") {
//   deuxElements = false;
// } else {
//   deuxElements = true;
// }

</script>

<template>
  <!-- <nav class="breadcrumb column is-family-sans-serif is-responsive" aria-label="breadcrumbs">
    <h5 class="has-text-left">HEIG-VD</h5>
    <strong>
      <ul>
        <li>
          <a href="#">
            {{ element1 }}
          </a>
        </li>
           <li v-show="deuxElements" class="is-active">
            <a href="#" aria-current="page">
              {{ element2 }}
            </a>
          </li>
      </ul>
    </strong>
  </nav> -->
  <router-link></router-link>
</template>
  
<style scoped>
</style>