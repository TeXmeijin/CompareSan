<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head
      span(v-if="category") {{ category.name }}の
      br
      span 比較をはじめる
  compare-form(
    v-if="table"
    :table="table"
    :title="title"
    :content="content"
    :isPublic="isPublic"
    @on-submitted="save"
  )
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
import {
  GetMasterCategoryById,
  CompareCategory,
} from '~/assets/javascript/types/masterCategories'
import { CompareTableClass } from '~/assets/javascript/types/tableTypes'
import { FirestoreCompareTableRepository } from '~/assets/javascript/Repository/FirestoreCompareTableRepository'
import ICompareTableRepository from '~/assets/javascript/Repository/ICompareTableRepository'

import { CompareArticle } from '~/assets/javascript/types/articleTypes'
import { SimpleTableFactory } from '~/assets/javascript/factory/tableFactories/simpleTableFactory'
import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    CompareForm: () => import('~/components/organisms/CompareForm.vue'),
  },
  validate ({ params }) {
    // 生きたカテゴリIDじゃないと404にする
    const category = GetMasterCategoryById(parseInt(params.categoryId))
    return /^\d+$/.test(params.categoryId) && category !== null
  },
})
export default class Post extends Vue {
  table: CompareTableClass = new SimpleTableFactory().factory()

  repository: ICompareTableRepository

  @Auth.State user

  title: string = ''
  content: string = ''
  isPublic: boolean = true

  created () {
    if (!this.user) {
      this.$router.push(`/login?category_id=${this.$route.params.categoryId}`)
    }

    if (this.category) {
      this.table = this.category.factory.factory({})
    }
    this.repository = new FirestoreCompareTableRepository()
  }

  async save (article: CompareArticle) {
    if (this.category) {
      article.categoryId = this.category.id
    } else {
      return
    }
    const docRef = await this.repository.create(article)
    this.$router.push({
      name: 'compares-categoryId-compareId',
      params: {
        categoryId: `${this.category!.id}`,
        compareId: docRef.id,
      },
    })
  }

  get category (): CompareCategory | null {
    return GetMasterCategoryById(parseInt(this.$route.params.categoryId))
  }
}
</script>

<style lang="scss" scoped>
.sec-main {
  background: $white;
  color: $body;
  padding: 0 0 40px;
  min-height: 100vh;

  @include mq {
    width: 1000px;
    margin: 0 auto;
  }

  .heading {
    text-align: center;
    padding: 32px 12px;
    background-image: url(~assets/img/top/catch_background.svg);
    background-position: center calc(100% + 24px);
    background-size: cover;
    background-repeat: no-repeat;

    .heading__head {
      font-weight: bold;
      font-size: 1.4rem;
    }
  }
}
</style>
