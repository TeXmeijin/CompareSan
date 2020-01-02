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

import {
  GetMasterCategoryById,
  CompareCategory,
} from '../../../assets/javascript/types/masterCategories'
import { CompareTableClass } from '~/assets/javascript/types/tableTypes'
import { FirestoreCompareTableRepository } from '~/assets/javascript/Repository/FirestoreCompareTableRepository'
import ICompareTableRepository from '~/assets/javascript/Repository/ICompareTableRepository'

import { CompareArticle } from '~/assets/javascript/types/articleTypes'
import { simpleTableFactory } from '~/assets/javascript/factory/simpleTableFactory'

@Component({
  components: {
    CompareForm: () => import('~/components/organisms/CompareForm.vue'),
  },
})
export default class Post extends Vue {
  table: CompareTableClass = simpleTableFactory()

  repository: ICompareTableRepository

  title: string = ''
  content: string = ''
  isPublic: boolean = true

  created () {
    if (this.category) {
      this.table = this.category.factory()
    }
    this.repository = new FirestoreCompareTableRepository()
  }

  save (article: CompareArticle) {
    if (this.category) {
      article.categoryId = this.category.id
    }
    this.repository.create(article).then((docRef) => {
      console.log('Document written with ID: ', docRef.id)
      this.$router.push({
        name: 'compares-categoryId-compareId',
        params: {
          categoryId: this.category!.id,
          compareId: docRef.id,
        },
      })
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
  padding: 40px 0;
  min-height: 100vh;

  .heading {
    text-align: center;
    padding: 0 12px;

    .heading__head {
      font-weight: bold;
      font-size: 1.4rem;
    }
  }
}

.TextArea {
  font-size: 1rem;
  border: 1px solid $gray-light-3;
  border-radius: 4px;
}
</style>
