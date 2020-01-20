<template lang="pug">
.PostChoicePage
  .PostMenu
    span.Heading 比較する商品をえらぶ
    nuxt-link.Item(
      :to="`/post/${category.id}`"
      v-for="category in categories"
      :key="category.id"
    )
      span.Name {{ category.name }}
      span.Description {{ category.description }}
</template>

<script lang="ts">
import Vue from 'vue'
import {
  CompareCategory,
  GetMasterCategories,
} from '../../assets/javascript/types/masterCategories'
export default Vue.extend({
  computed: {
    categories (): CompareCategory[] {
      const categories = GetMasterCategories()
      return Object.keys(categories).map((key) => {
        return categories[key]
      })
    },
  },
})
</script>

<style lang="scss">
.PostChoicePage {
  .PostMenu {
    padding: 16px 12px;
    background: $white;

    .Heading {
      display: block;
      font-weight: bold;
      text-align: center;
      font-size: 1.4rem;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }

    .Item {
      display: block;
      color: $gray-light-1;
      padding: 8px 0;
      text-decoration: underline;
      @include mq {
        transition: background 0.2s;
        &:hover {
          background: $gray-light-4;
        }
      }
    }
  }
}
</style>
