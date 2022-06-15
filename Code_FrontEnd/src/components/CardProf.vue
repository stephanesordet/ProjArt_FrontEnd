<script setup>
defineProps({
  info: {},
  email: {},
  acronyme: {},
});
</script>

<template>
  <article class="notification is-light has-text-left-mobile">
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <p class="is-size-6">{{ acronyme }}</p>
    <p class="is-size-4 has-text-weight-bold">{{ info }}
    <span class="is-size-6 has-text-weight-bold info">
    <a :href="'mailto:'+ email">
      <i class="fa fa-envelope" aria-hidden="true"></i>
    </a>
    </span></p>
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
  text-align: left !important;
  margin-bottom: 50px;
}
.info {
  position: absolute;
  right: 40px;
  top: 40px;
}
</style>
