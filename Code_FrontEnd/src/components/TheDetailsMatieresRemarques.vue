<script setup>
import { ref } from "vue";

defineProps({
  user_Email: {
    type: String,
  },
  Titre: {
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
      <span class="has-text-info">{{ user_Email }} </span>
      <span class="icon is-small">
        <i class="fa fa-eye"></i>
      </span>
    </div>
    <p>
      <span>{{ DateRemarque }} </span>
    </p>
    <p>
      <strong>{{ Titre }} : </strong><span>{{ Description }}</span>
    </p>
  </div>
</template>

<style scoped>
.icon-text {
  display: block;
  text-align: left;
}

div .column {
  margin-bottom: 1rem;
}

div .column > p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
