<template>
  <span @click="$emit('click', 'next')" class="dateSemaine">{{ span }}</span>
  <a @click="$emit('click', 'next')" class="next round">&#8250;</a>
</template>

<script>
export default {
  name: "ArrowNext",
  inheritAttrs: false,
  props: {
    span: {
      required: true,
    },
  },
};
</script>

<style scoped>
.round {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  margin-left: 30px;

}

.round:hover {
  background-color: #ddd;
  color: black;
}

.previous {
  background-color: #f1f1f1;
  color: black;
}

.next {
  background-color: #f1f1f1;
  color: black;
}

.round {
  border-radius: 50%;
}

.dateSemaine {
  text-align: center;
}
</style>
