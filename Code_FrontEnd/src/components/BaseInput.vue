<script setup></script>

<template>
  <div class="field">
    <label class="label">
      <slot name="label"></slot>
    </label>

    <div class="control">
      <slot name="input"></slot>
    </div>
  </div>
</template>

<style scoped>
div :slotted(*) {
  width: 300px;
}
</style>
