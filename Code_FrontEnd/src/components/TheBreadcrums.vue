<script setup>
defineProps({
    element1: {
        type: String,
    },
//     element2: {
//         type: String,
//     },
});

</script>

<template>
  <nav class="breadcrumb column is-family-sans-serif is-responsive" aria-label="breadcrumbs">
    <h5 class="has-text-left">HEIG-VD</h5>
    <strong><ul>
      <li><a href="#">{{element1}}</a></li>
      <li class="is-active"><a href="#" aria-current="page"><!--{{element2}}--></a></li>
    </ul></strong>
  </nav>
</template>
  
<style scoped>
</style>