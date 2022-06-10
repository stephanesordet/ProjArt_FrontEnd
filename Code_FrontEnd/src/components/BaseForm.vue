<script setup></script>

<template>
  <form class="box content is-half is-offset-one-quarter has-background-light has-text-centered column">
    <slot></slot>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
