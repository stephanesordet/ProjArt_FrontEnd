<script setup></script>

<template>
  <div class="field is-grouped">
    <div class="control">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
div :slotted(*) {
  margin-bottom: 20px;
  margin-top: 20px;
}
</style>
