<template>
  <div id="app">
    <div id="gamebox">
      <router-view/>
    </div>
  </div>
</template>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #gamebox {
    width: 400px;
    height: 400px;
    border: 1px solid #42b983;
    border-radius: 12px;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
