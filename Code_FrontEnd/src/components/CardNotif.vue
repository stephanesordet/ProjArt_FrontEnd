<script setup>
defineProps({
  user: {
    type: String,
  },
  object: {
    type: String,
  },
  message: {
    type: String,
  },
  envoiHeureDate: {
    type: String,
  },
});
</script> 

<template>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

<!-- <div class="columns">
  <div class="is-half is-offset-one-quarter has-text-left column">
<div class="box">
        <p>
          <strong> {{ user}} - {{ object}} </strong>  <small>{{envoiHeureDate}}</small>
          <br>
          {{message}}
        </p>
        </div>
    </div>
    </div> -->

  
<!-- <div class="columns ">
  <div class="is-half is-offset-one-quarter has-text-left column">

<div class="box is-child notification is-primary has-text-left-mobile has-icons-right">
             
          <p>
               

          <strong>AGE - Soirée CultureG</strong>  <small>13:05</small>     
  <span class="icon is-right">

            <i class="fa fa-solid fa-circle"></i>
  </span>
         
          <br>
          
          Venez nous rejoindre pour une soirée culturel général !


        </p>
     

        </div>



    </div>
    </div>
 -->

 <article class="tile is-child notification is-primary has-text-left-mobile has-icons-right">
   <span class="icon is-right">
                <i class="fa fa-solid fa-circle "></i>
            </span>
        <p class="is-size-4 has-text-weight-bold">{{ user }}- {{object}}</p>
        <p class="is-size-6">{{envoiHeure}}</p>
        <p class="is-size-5">
            
            {{ message }}
        </p>
    </article>

  
</template>


<style scoped>
</style>
