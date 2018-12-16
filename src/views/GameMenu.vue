<template>
  <div class="game-menu">
    <router-link to="/game">
      <TickButton>Start</TickButton>
    </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
import TickButton from '@/components/TickButton.vue'

export default {
  name: 'game-menu',
  components: {
    TickButton
  }
}
</script>

<style lang="scss">
  .game-menu {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
