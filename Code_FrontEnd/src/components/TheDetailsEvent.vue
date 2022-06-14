<script setup>
defineProps({
  Titre: {},
  Description: {},
  Lieu: {},
  Debut: {},
  Fin: {},
  user_Email: {},
});
</script>

<template>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div class="columns is-family-sans-serif is-responsive">
    <div
      class="box content is-half is-offset-one-quarter has-background-light has-text-left column"
    >
      <h2 class="is-size-1">
        {{ Titre }}
      </h2>
      <p class="is-size-6">Créateur de l'évènement : {{ user_Email }}</p>
      <h3>Description de l'événement</h3>

      <p class="is-size-6">
        {{ Description }}
      </p>

      <h3>Lieu</h3>

      <p class="is-size-6">
        {{ Lieu }}
      </p>

      <h3>Date de début</h3>
      <p class="is-size-6">
        {{ Debut }}
      </p>

      <h3>Date de fin</h3>
      <p class="is-size-6">
        {{ Fin }}
      </p>

      <!--       <div class="column buttons is-pulled-right">
        <button class="button is-danger is-rounded">
          <span>Supprimer</span>
        </button>
        <button class="button is-danger is-rounded">
          <span>Modifer</span>
        </button>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.icon-text {
  display: block;
  text-align: left;
}

.content h2 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}
.content h4 {
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.box.content.is-half.is-offset-one-quarter.has-background-light.has-text-left.column {
  padding-bottom: 30px;
}
</style>
