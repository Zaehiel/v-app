<template>
  <div>hello</div>
  <div>hello</div>
  <div>hello</div>
  <div>hello</div>
  <div>hello</div>
  <div>{{ list }}</div>
  <div>{{ article }}</div>



</template>

<script>
import api from '@/api';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      list: {},
      article: {},
    }
  },
  async mounted() {
    let { response } = await api('article');
    this.list = response;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
