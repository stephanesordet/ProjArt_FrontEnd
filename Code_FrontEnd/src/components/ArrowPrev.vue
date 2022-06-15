<template>
  <a @click="$emit('click', 'previous')" class="previous round">&#8249;</a>
  <span @click="$emit('click', 'previous')" class="dateSemaine">{{
      span
  }}</span>
</template>

<script>
export default {
  name: "ArrowPrev",
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
  margin-right: 30px;
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
</style>
