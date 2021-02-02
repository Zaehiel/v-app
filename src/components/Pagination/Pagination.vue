<template>
  <div class="pagination">
    <a
      class="pagination__previous-page pagination-link"
      @click="previousPage"
    >
      &lt;
    </a>
    <div class="pagination__pages">
      <a
        v-for="page in pageList"
        :key="page"
        class="pagination__pages_link"
        :class="page === currentPage ? 'pagination__pages_link--active' : ''"
        @click="setPage(page)"
      >
      {{ page }}
      </a>
    </div>
    <a
      class="pagination__next-page pagination-link"
      @click="nextPage"
    >
      &gt;
    </a>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    pages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
    }
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.pages) {
        this.currentPage++;
        this.pageNavigation();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.pageNavigation();
      }
    },
    pageNavigation() {
      this.$emit('page-navigation', this.currentPage);
    },
    setPage(pageNumber) {
      this.currentPage = parseInt(pageNumber);
      this.pageNavigation();
    },
  },
  computed: {
    pageList() {
      const pageList = [];
      for (let i = 1; i <= this.pages; i++) {
        pageList.push(i);
      }

      let start = Math.max(0, this.currentPage - 3);
      let end = Math.min(pageList.length, start + 5);

      if (this.currentPage <= 1) {
        start = 0;
        end = 5;
      }

      if (this.currentPage > pageList.length - 2) {
        start = pageList.length - 5;
        end = pageList.length;
      }

      return pageList.slice(start, end);
    }
  }
});
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: center;

  &__pages {
    display: flex;
  }
}
.pagination-link,
.pagination__pages_link {
  cursor: pointer;
  padding: 5px;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  text-align: center;
}

.pagination-link {
  background: #ff57a2;
  color: #fff;
}

.pagination__pages_link {
  margin: 0 5px;

  &:hover {
    box-shadow: inset 0 0 0 2px #666;
  }

  &--active {
    color: #ff57a2;
  }
}

</style>
