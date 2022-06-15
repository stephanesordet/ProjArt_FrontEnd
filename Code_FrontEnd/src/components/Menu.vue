<script setup>
defineProps({
  starter: {},
  mainCourse: {},
  dessert: {},
});
</script>

<template>
  <article class="tile is-child notification is-light has-text-left-mobile">
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <p class="is-size-4 has-text-weight-bold">Menu</p>
    <p class="is-size-5"> <span class="icon">
        <i class="fa fa-cutlery" aria-hidden="true"></i>
      </span> Entrée</p>
    <p class="is-size-6">{{ starter }}</p>
    <p class="is-size-5"> <span class="icon">
       <i class="fa fa-cutlery" aria-hidden="true"></i>
      </span> Plat principal</p>
    <p class="is-size-6">{{ mainCourse }}</p>
    <p class="is-size-5"> <span class="icon">
        <i class="fa fa-cutlery" aria-hidden="true"></i>
      </span> Dessert</p>
    <p class="is-size-6">{{ dessert }}</p>
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
