<template>
  <div class="article">
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else>
      {{ article.title }}
      {{ article.author }}
      {{ article.date }}

      {{ article.intro }}
      {{ article.body }}
      {{ article.tags }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import api from '@/api';

export default defineComponent({
  data() {
    return {
      isLoading: true,
      article: null,
    }
  },
  async mounted() {
    const { response } = await api('article');
    this.article = response;
    this.isLoading = false;
  }
  
});
</script>
