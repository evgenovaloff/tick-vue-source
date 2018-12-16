<template>
  <div class="game-scene">
    <TopBar>
      <router-link to="/">
        <TickButton>Menu</TickButton>
      </router-link>
      <TickButton v-on:click.native="emitRestart">Restart</TickButton>
    </TopBar>
    <Grid/>
  </div>
</template>

<script>
  import TickButton from '@/components/TickButton.vue'
  import TopBar from '@/components/TopBar.vue'
  import Grid from '@/components/Grid.vue'
  import {EventBus} from '../types/EventBus'

  export default {
    name: 'home',
    components: {
      TickButton,
      TopBar,
      Grid
    },
    methods: {
      emitRestart() {
        EventBus.$emit('restart-game')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .game-scene {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }
</style>