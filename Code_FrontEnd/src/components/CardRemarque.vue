<script setup>

defineProps({
  titre: {
    type: String,
  },
  description: {
    type: String,
  },
  Visibilite: {
    type: String,
  },
  id: {
    type: Number,
  },
  matiere_id: {
    type: String,
  },
});

</script>

<template>
  <article class="tile is-child notification is-light has-text-left-mobile">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <p class="is-size-4 has-text-weight-bold">{{ titre }}</p>
    <p class="is-size-6">{{ description }}</p>
    <p class="is-size-5">
      {{ matiere_id }}
    </p>
    <span v-if="Visibilite == 'public'">
        <span id="eye" class="icon is-medium">
          <i class="fa fa-eye"></i>
        </span>
        <span>Publique</span>
      </span>
      <span v-else>
        <span id="eye" class="icon is-medium">
          <i class="fa fa-eye-slash"></i>
        </span>
        <span>Privée</span>
      </span>
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
