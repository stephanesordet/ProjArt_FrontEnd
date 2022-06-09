<script setup>
import { ref } from "vue";

defineProps({
  user_Email: {
    type: String,
  },
  Description: {
    type: String,
  },
  DateRemarque: {
    type: Date,
  },
});
</script>

<template>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div class="column">
    <div class="icon-text">
      <span class="icon is-small">
        <i class="fa fa-circle fa-solid has-text-info"></i>
      </span>
      <span class="has-text-info is-size-5">{{ user_Email }} </span>
      <span class="icon is-small">
        <i class="fa fa-eye"></i>
      </span>
    </div>
    <p>
      <em>{{ DateRemarque }} </em>
    </p>
    <p>
      <strong>{{ Description }} </strong>
    </p>
  </div>
</template>

<style scoped>
.icon-text {
  display: block;
  text-align: left;
}
</style>
