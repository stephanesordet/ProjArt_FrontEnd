<script setup>
// defineProps({
//     titre: {
//         type: String,
//     },
//     description: {
//         type: String,
//     },
//
//     user: {
//         type: String,
//     },
//     date_début: {
//         type: Date,
//     },
//     date_fin: {
//         type: Date,
//     },
// lieu:{
//     type: String,
//}
//
// });
</script>

<template>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  />
  <div class="columns is-family-sans-serif is-responsive">
    <div
      class="
        box
        content
        is-half is-offset-one-quarter
        has-background-light has-text-left
        column
        is-responsive
      "
    >
      <h2>
        Soirée cultureG
        <!--{{titre}}-->
      </h2>
      <p class="is-size-6">
        AGE
        <!-- {{user}} -->
      </p>
      <h3>Description</h3>

      <p class="is-size-6">
        Soirée culture géréale, organisé par l’AGE à l’occasion de la fin des
        examens. Venez nombreux !
        <!-- {{description}} -->
      </p>

      <h3>Lieu</h3>

      <p class="is-size-6">
        Bar de la gare - Yverdon-les-Bains
        <!-- {{ lieu }} -->
      </p>

      <h3>Date de début</h3>
      <p class="is-size-6">
        30 mars 2022 - 19:00
        <!-- {{ date_début }} -->
      </p>

      <h3>Date de fin</h3>
      <p class="is-size-6">
        30 mars 2022 - 20:00
        <!-- {{ date_fin }} -->
      </p>

      <br />
      <br />
      <br />
      <div class="column buttons is-pulled-right  ">
        <button class="button is-danger is-rounded ">
          <span>Supprimer</span>
        </button>
        <button class="button is-danger is-rounded">
          <span>Modifer</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

div {
  background-color: #ebeeef;
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 20px;
}

div .buttons{
background-color:transparent;
  display:block;
  text-align: right;
}

</style>
