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
//     date: {
//         type: Date,
//     },
//   
//   
//     matiere :{
//         type: String,
//     }
// });

</script>

<template>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <div class="columns is-family-sans-serif is-responsive">
        <div class="box content is-half is-offset-one-quarter has-background-light has-text-left column is-responsive">
            <h2>MetRech - Regarder Film
                <!-- {{matiere}}-{{titre}}-->
            </h2>
            <p class="is-size-6">Neyla Sanjuan 
                <!-- {{user}} -->
           </p>

           <hr>

            <h3>Date</h3>
                <p class="is-size-6" >30 mars 2022 
                        <!-- {{ date }} -->
                    </p>
            <h3>Description</h3>
    
                <p class="is-size-6">  Regarder Film sur les 5 sens. Lien : https://www.youtube.com/watch?v=F-2MJ961DfM
                    <!-- {{description}} -->
                </p>

               
                    <div class="column buttons is-pulled-right">
                <button class="button is-danger is-rounded">
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