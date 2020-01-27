<template lang="pug">
main.sec-main
  section.heading
    h1.heading__head
      span 比較を編集する
  compare-form(
    v-if="!table.isEmpty()"
    :table="table"
    :title="title"
    :content="content"
    :isPublic="isPublic"
    @on-submitted="save"
  )
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
import { emptyTableFactory } from '~/assets/javascript/factory/tableFactories/emptyTableFactory'
import {
  GetMasterCategoryById,
  CompareCategory,
} from '~/assets/javascript/types/masterCategories'
import { CompareTableClass } from '~/assets/javascript/types/tableTypes'
import { FirestoreCompareTableRepository } from '~/assets/javascript/Repository/FirestoreCompareTableRepository'
import ICompareTableRepository from '~/assets/javascript/Repository/ICompareTableRepository'

import { CompareArticle } from '~/assets/javascript/types/articleTypes'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    CompareForm: () => import('~/components/organisms/CompareForm.vue'),
  },
})
export default class Post extends Vue {
  table: CompareTableClass = emptyTableFactory()

  repository: ICompareTableRepository

  title: string = ''
  content: string = ''
  isPublic: boolean = true

  @Auth.State uid

  created () {
    this.repository = new FirestoreCompareTableRepository()
  }

  @Watch('uid')
  async function () {
    const article = await this.repository.findById(
      this.$route.params.compareId,
      parseInt(this.$route.params.categoryId),
      this.uid
    )

    if (!article) {
      return
    }

    this.table = article.table
    this.title = article.title
    this.content = article.content
    this.isPublic = article.is_public
  }

  async save (article: CompareArticle) {
    if (this.category) {
      article.categoryId = this.category.id
    } else {
      return
    }
    await this.repository.update(this.$route.params.compareId, article)
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
</style>
