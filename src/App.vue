<template>
  <div class="navigation">
    <router-link class="router-link" to="/list">Nimekiri</router-link>
    <router-link class="router-link" to="/article">Artikkel</router-link>
  </div>
  <div class="page">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
    background: #efefef;
}

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
    align-items: flex-end;
    padding-top: 60px;
  }

  .page {
    width: 80%;
    padding: 20px;
    max-width: 780px;

    .heading {
      font-weight: 700;
      font-size: 48px;
      text-align: center;
      color: #14cc76;
    }
  }
}

.router-link {
  text-decoration: none;
  color: #333;
  font-weight: 700;
  font-size: 24px;

  &.router-link-exact-active {
    color: #14cc76;
  }
}
</style>
