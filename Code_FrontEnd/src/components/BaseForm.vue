<script setup></script>

<template>
  <form class="main my-4 mx-4">
    <div class="containerInputs">
      <slot></slot>
    </div>
  </form>
</template>

<style scoped>
form {
  background-color: #ebeeef;
  padding: 20px;
}

.containerInputs {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
</style>
