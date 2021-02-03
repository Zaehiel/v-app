<template>
  <div class="list">
    <h1 class="heading">Nimekiri</h1>
    <h3 class="" v-if="isLoading">Loading...</h3>
    <div class="list-body" v-else>
      <div class="list-body__items">
        <DataList :list="renderedList" @toggled-column="onColumnToggle"/>
      </div>
      <div class="list-body__pagination">
        <Pagination :pages="pages" @page-navigation="updateActivePage" />
      </div>
    </div>

  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Pagination from '@/components/Pagination/Pagination';
import DataList from '@/components/DataList/DataList';
import api from '@/api';

const sortingType = ['asc', 'desc', 'none'];

export default defineComponent({
  components: {
    Pagination,
    DataList,
  },
  data() {
    return {
      isLoading: true,
      listData: [],
      sortedListData: [],
      stats: {},
      activePage: 1,
      sortingColumn: null,
      currentSorting: 'none',
    }
  },
  async created() {
    const { response } = await api('list');
    this.isLoading = false;
    this.stats = response.stats;
    this.listData = [ ...response.list ];
    this.sortedListData = [ ...response.list ];
  },
  methods: {
    updateActivePage(pageNumber) {
      this.activePage = pageNumber;
    },
    updateSortingByColumn(columnNumber) {
       if (this.sortingColumn !== columnNumber) {
        this.sortingColumn = columnNumber;
        this.currentSorting = sortingType[0];
      } else if (this.sortingColumn === columnNumber && this.currentSorting === sortingType[0]) {
        this.currentSorting = sortingType[1];
      } else {
        this.currentSorting = sortingType[2];
        this.sortingColumn = null;
      }
    },
    sortListData() {
      let columnName = '';
      let compareType = String;

      switch(this.sortingColumn) {
        case 1:
          columnName = 'firstname';
          break;
        case 2:
          columnName = 'surname';
          break;
        case 3:
          columnName = 'sex';
          break;
        case 4:
          columnName = 'personal_code';
          compareType = Number;
          break;
        case 5:
          columnName = 'phone';
          compareType = Number;
          break;
      }

      this.sortListByColumn(columnName, compareType);
    },
    sortListByColumn(columnName, compareType) {
      switch(this.currentSorting) {
        case sortingType[0]:
          this.sortedListData = this.sortedListData.sort((a, b) => {
            if (compareType === String) {
               return a[columnName].localeCompare(b[columnName]);
            } 
            return a[columnName] - b[columnName]
          });
          break;
        case sortingType[1]:
            this.sortedListData = this.sortedListData.sort((a, b) => {
              if (compareType === String) {
                 return b[columnName].localeCompare(a[columnName]);
              }
              return b[columnName] - a[columnName]
            });
          break;
        case sortingType[2]:
          this.sortedListData = [ ...this.listData ];
          break;
      }
    },
    onColumnToggle(columnNumber) {
      this.updateSortingByColumn(columnNumber);
      this.sortListData();
    }
  },
  computed: {
    pages() {
      return this.listData.length / 10;
    },
    renderedList() {
      const start = Math.max(0, this.activePage - 1) * 10;
      const end = this.activePage * 10;
      
      return this.sortedListData.slice(start, end);
    }
  }
})
</script>

<style lang="scss">
.list-body__pagination {
  margin: 30px 0;
}
</style>