<template>
  <div id="nav">
    <router-link to="/">List</router-link> |
    <router-link to="/article">Article</router-link>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
