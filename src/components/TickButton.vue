<template>
  <button class="tick-button">
    <slot/>
  </button>
</template>

<script>
  export default {
    name: "tick-button",
    props: {
      text: {
        type: String,

      }
    }
  }
</script>

<style lang="scss" scoped>
  .tick-button {
    border-radius: 8px;
    color: #42b983;
    border: 1px solid #42b983;
    padding: 8px 12px;
    font-size: 18px;
  }
</style>