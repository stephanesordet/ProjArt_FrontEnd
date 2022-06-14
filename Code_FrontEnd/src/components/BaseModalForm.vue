<script setup></script>

<template>
  <div id="modal-js-example" class="modal">
    <div class="modal-background"></div>

    <div class="modal-content">
      <div class="box">
        <slot></slot>
      </div>
    </div>

    <button
      class="modal-close is-large"
      aria-label="close"
      @click="$emit('close')"
    ></button>
  </div>

  <!--   <button class="js-modal-trigger" data-target="modal-js-example">
    BUTTON FOR MODAL
  </button> -->
</template>

<style>
</style>
