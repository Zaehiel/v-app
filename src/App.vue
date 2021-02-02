<template>
  <div class="navigation">
    <router-link to="/list">Nimekiri</router-link>
    <router-link to="/article">Artikkel</router-link>
  </div>
  <div class="page">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;

  .navigation {
    padding: 20px;
    width: 20%;
    display: flex;
    flex-direction: column;
  }

  .page {
    width: 80%;
    padding: 20px;

    .heading {
      text-align: center;
    }
  }
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
