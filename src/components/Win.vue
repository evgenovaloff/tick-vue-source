<template>
  <div class="win">
    <div class="winner-text">
      <slot/>
    </div>
    <div class="buttons">
      <router-link to="/">
        <TickButton>Menu</TickButton>
      </router-link>
      <router-link to="/game">
        <TickButton>Try again</TickButton>
      </router-link>
    </div>
  </div>
</template>

<script>
  import TickButton from '@/components/TickButton.vue'

  export default {
    name: "win",
    components: {
      TickButton,
    },
  }
</script>

<style lang="scss" scoped>
  .win {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .buttons {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }

    .winner-text {
      padding: 24px;
      color: #42b983;
      font-size: 18px;
    }
  }
</style>