<template>
  <div class="article">
    <div v-if="isLoading">
      <h1 class="heading">Loading...</h1>
    </div>
    <div v-else>
      <h1 class="heading">{{ article.title  }}</h1>
      <p class="article-intro">{{ article.intro }}</p>
      <div
        class="article-images"
        v-for="image in article.images"
        :key="image.small"
      >
        <img
          class="article-images__item"
          :src="image.medium"
          :alt="image.alt"
          :title="image.title"
        >
      </div>
      <p class="article-body">{{ article.body }}</p>
      <div class="article-tags">
        <div
          class="article-tags__item"
          v-for="tag in article.tags"
          :key="tag"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStripTags } from '@/composables';
import api from '@/api';

export default defineComponent({
  setup() {
    const { stripTags } = useStripTags();
    
    return {
      stripTags
    };
  },
  data() {
    return {
      isLoading: true,
      article: null,
    }
  },
  async created() {
    const { response } = await api('article');
    this.article = {
      ...response,
      title: this.stripTags(response.title),
      intro: this.stripTags(response.intro),
      body: this.stripTags(response.body),
    };
    this.isLoading = false;
  },  
});
</script>

<style lang="scss">
.article-images {
  display: flex;
  flex-direction: column;

  &__item {
    width: 100%;
    padding: 20px 0;
  }
}

.article-tags {
  display: flex;

  &__item {
    background: #ff57a2;
    color: #fff;
    padding: 5px 10px;
    border-radius: 50px;
    margin: 0 10px 0 0;
  }
}
</style>
