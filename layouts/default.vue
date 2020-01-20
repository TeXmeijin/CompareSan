<template lang="pug">
  main.Main
    the-header
    nuxt
    the-footer
    transition(
      name="postMenuBackground"
    )
      .PostMenuBackground(
        v-if="isDisplayingPostMenu"
        @click.self="isDisplayingPostMenu = false"
      )
        transition(
          name="postMenu"
          appear
        )
          .PostMenu(v-if="isDisplayingPostMenu")
            span.Heading 比較する商品をえらぶ
            a.Item(
              :href="`/post/${category.id}`"
              v-for="category in categories"
              :key="category.id"
            )
              span.Name {{ category.name }}
              span.Description {{ category.description }}
</template>

<script lang="ts">
import Vue from 'vue'
import TheHeader from '../components/molecules/Layout/TheHeader.vue'
import TheFooter from '../components/molecules/Layout/TheFooter.vue'
import {
  CompareCategory,
  GetMasterCategories,
} from '../assets/javascript/types/masterCategories'

export default Vue.extend({
  components: {
    TheHeader,
    TheFooter,
  },
  data () {
    return {
      isDisplayingPostMenu: false,
    }
  },
  computed: {
    categories (): CompareCategory[] {
      const categories = GetMasterCategories()
      return Object.keys(categories).map((key) => {
        return categories[key]
      })
    },
  },
  created () {
    this.$nuxt.$on('onClickedOpeningModal', (_) => {
      this.isDisplayingPostMenu = !this.isDisplayingPostMenu
    })
  },
})
</script>

<style lang="scss" scoped>
.Main {
  padding-bottom: 80px;
}

.PostMenuBackground {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
}

.PostMenu {
  max-height: 300px;
  width: calc(100% - 48px);
  padding: 16px 12px;
  overflow-y: scroll;
  background: $white;
  border-radius: 8px;
  z-index: $zIndexOfNewPostMenu;

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

// オーバーレイのトランジション
.postMenu-enter-active,
.postMenuBackground-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.postMenu-enter,
.postMenu-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.postMenuBackground-leave-to {
  opacity: 0;
}
</style>
