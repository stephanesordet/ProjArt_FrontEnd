<script setup>
// defineProps({
//     titre: {
//         type: String,
//     },
//     description: {
//         type: String,
//     },
//     visibilite: {
//         type: Boolean,
//     },
//     user: {
//         type: String,
//     },
//     date: {
//         type: Date,
//     },
//     matiere :{
//         type: String,
// }
// });
import TheModal from './TheModal.vue';

function envoieRetard(){
    console.log(4);
}

function showModal(etat){
    if(etat){
        document.getElementById('modal').classList.add('is-active');
    }else{
        document.getElementById('modal').classList.remove('is-active');
    }
    
}
</script>

<template>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="columns is-family-sans-serif is-responsive">
        <div class="box content is-half is-offset-one-quarter has-background-light has-text-left column">
            <h2>LabVeilSoc <!--{{matiere}}--></h2>
            <p class="is-size-6"><em>Saskia Faulk</em></p>
            <h3>Remarques</h3>
            <div class="column is-flex-direction-column is-align-content-space-evenly">
                <div class="icon-text">
                    <span class="icon is-small">
                        <i class="fa fa-circle fa-solid has-text-info"></i>
                    </span>
                    <span class="has-text-info is-size-5">Saskia Faulk <!-- {{ user }} - {{ titre }} --></span>
                    <span class="icon is-small">
                        <i class="fa fa-eye"></i>
                    </span>
                </div>
                <p><em>30 mars 2022 <!-- {{ date }} --></em></p>
                <p><strong>Rendre article film <!--  {{ description }} --></strong></p>
            </div>
            <div class="column">
                <div class="icon-text">
                    <span class="icon is-small has-text-primary-dark">
                        <i class="fa fa-circle fa-solid"></i>
                    </span>
                    <span class="has-text-primary-dark is-size-5">Eloi Coquoz</span>
                    <span class="icon is-small">
                        <i class="fa fa-eye"></i>
                    </span>
                </div>
                <p><em>30 mai 2022</em></p>
                <p><strong>Rendre infographie</strong></p>
            </div>
            <div class="column">
                <div class="icon-text">
                    <span class="icon is-small has-text-danger-dark">
                        <i class="fa fa-circle fa-solid"></i>
                    </span>
                    <span class="has-text-danger-dark is-size-5">Neyla Sanjuan</span>
                    <span class="icon is-small">
                        <i class="fa fa-eye-slash"></i>
                    </span>
                </div>
                <p><em>30 mai 2022</em></p>
                <p><strong>Rendre infographie</strong></p>
            </div>
            <div class="column buttons">
                <button class="button is-danger">
                    <span class="icon is-medium has-text-danger-dark">
                        <i class="fa fa-solid fa-plus"></i>
                    </span>
                    <span>Ajouter une remarque</span>
                </button><br>
                <button class="button is-danger" @click="showModal(true)" id="show-modal">
                    <span class="icon is-medium has-text-danger-dark">
                        <i class="fa fa-solid fa-rotate-right"></i>
                    </span>
                    <span>Annoncer un retard</span>
                </button>
                <the-modal id='modal' @confirm="envoieRetard(), showModal(false)" @cancel="showModal(false)"></the-modal>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>