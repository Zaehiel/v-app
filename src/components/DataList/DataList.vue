<template>
  <table class="data-list">
    <tbody>
      <tr>
        <th class="data-list__col" @click="toggledColumn(1)">
          Eesnimi
        </th>
        <th class="data-list__col" @click="toggledColumn(2)">
          Perekonnanimi 
        </th>
        <th class="data-list__col" @click="toggledColumn(3)">
          Sugu
        </th>
        <th class="data-list__col" @click="toggledColumn(4)">
          Sünnikuupäev
        </th>
        <th class="data-list__col" @click="toggledColumn(5)">
          Telefon
        </th>
      </tr>
    </tbody>
    <tbody v-for="item in list" :key="item.id">
       <tr
        class="data-list__row"
        @click="toggleActiveItem(item.id)"
        :class="item.id === activeItemId ? 'data-list__row--active' : ''"
      >
         <td class="data-list__col">
           {{ item.firstname }}
         </td>
         <td class="data-list__col">
           {{ item.surname }}
         </td>
         <td class="data-list__col">
           {{ item.sex === 'm' ? 'Mees' : 'Naine' }}
         </td>
         <td class="data-list__col">
           {{ item.personal_code }}
         </td>
         <td class="data-list__col">
          {{ item.phone }}  
         </td>
       </tr>
       <tr v-if="item.id === activeItemId">
         <td class="data-list__col" colspan="5">
           <div class="data-list__col_details">
            <div class="data-list__col_image">
              <img :src="item.image.medium">
            </div>
            <div class="data-list__col_intro">{{ stripTags(item.intro).slice(0, 293) }}... </div>
           </div>
        
         </td>
       </tr>
    </tbody>
  </table>
</template>

<script>
import { defineComponent } from 'vue';
import { useStripTags } from '@/composables';

export default defineComponent({
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const { stripTags } = useStripTags();
    
    return {
      stripTags
    };
  },
  data() {
    return {
      currentPage: 1,
      activeItemId: '',
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
    toggledColumn(columnNumber) {
      this.$emit('toggled-column', columnNumber);
    },
    toggleActiveItem(itemId) {
      if (this.activeItemId === itemId) {
        this.activeItemId = null;
      } else {
        this.activeItemId = itemId;
      }
    }
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
.data-list {
  width: 100%;
  border-collapse: collapse;

  th {
    border-bottom: 1px solid #ccc;
    text-align: left;
    cursor: pointer;
  }

  td {
    border-top: 1px solid #ccc;
  }

  &__col {
    padding: 10px;
    font-size: 16px;
    line-height: 16px;

    &_details {
      display: flex;
    }

    &_image {
      width: 25%;
      height: auto;

      img {
        width: 100%;
      }
    }

    &_intro {
      width: 75%;
      padding-left: 20px;
      font-size: 16px;
    }
  }

  &__row {
    td {
      cursor: pointer;
    }

    &--active {
      background: #ff57a2;
      color: #fff;
    }
  }

  &__item {
    padding: 8px 4px;
    border-left: 1px solid black;
    border-bottom: 1px solid black;

    &--active {
      background: #ff57a2;
    }
  }
}
</style>
