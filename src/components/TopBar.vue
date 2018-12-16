<template>
  <div class="top-bar">
    <slot/>
  </div>
</template>

<script>
  export default {
    name: "top-bar"
  }
</script>

<style lang="scss" scoped>
  .top-bar {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-bottom: 1px solid #42b983;
  }
</style>