<script setup>
defineProps({
  titre: {},
  description: {},
  Visibilite: {},
  id: {},
  matiere_id: {},
});
</script>

<template>
  <article class="tile is-child notification is-light has-text-left-mobile">
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="is-size-4 has-text-weight-bold columns is-mobile my-1">
      <span class="is-size-5 column"
        >{{ matiere_id }} - {{ titre }} : {{ description }}</span
      >

      <span v-if="Visibilite == 'public'">
        <span id="eye" class="icon is-small">
          <i class="fa fa-eye"></i>
        </span>
      </span>
      <span v-else>
        <span id="eye" class="icon is-small">
          <i class="fa fa-eye-slash"></i>
        </span>
      </span>
    </div>
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
  padding: 0px;
}

article div {
  padding: 1rem;
}
#eye {
  margin-right: 1rem;
}
</style>
