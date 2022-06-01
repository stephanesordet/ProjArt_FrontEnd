<script setup></script>

<template>
  <form
    class="box content is-half is-offset-one-quarter has-background-light has-text-left column"
  >
    <slot></slot>
  </form>
</template>

<style scoped>
form {
  background-color: #ebeeef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
