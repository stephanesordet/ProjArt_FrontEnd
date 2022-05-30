<script setup>
defineProps({
    cours: {
        type: String
    },
    heure:{
        type: String
    },
    classe:{
        type: String
    },
    salle:{
        type: String
    }
})
</script>

<template>
    <div>
        <div class="box">
            {{classe }}
        <br>
            {{ cours }}
        <br>
            {{ salle }}
        <br>
            {{ heure }}
        </div>
    </div>
</template>