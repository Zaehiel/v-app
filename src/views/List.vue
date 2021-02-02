<template>
  <div class="list">
    <h1 class="heading">Nimekiri</h1>
    <div class="list-body">
      <div class="list-body__items">
        rendered list here
      </div>
      <div class="list-body__pagination">
        <Pagination :pages="10" @page-navigation="updateActivePage" />
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Pagination from '@/components/Pagination/Pagination';
import { useStripTags } from '@/composables';
import api from '@/api';

export default defineComponent({
  components: {
    Pagination,
  },
  setup() {
    const { stripTags } = useStripTags();
    
    return {
      stripTags
    };
  },
  data() {
    return {
      isLoading: true,
      listData: [],
      stats: {},
    }
  },
  async created() {
    const { response } = await api('list');
    this.isLoading = false;
    this.stats = response.stats;
    this.listData = { ...response.list };
  },
  methods: {
    updateActivePage(pageNumber) {
      console.log(pageNumber); // todo: placeholder
    }
  }
})
</script>
