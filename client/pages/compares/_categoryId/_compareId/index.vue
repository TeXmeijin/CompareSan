<template lang="pug">
main.sec-main
  template(v-if="article")
    section.heading
      h1.heading__head {{ article.title }}
    section.dataTable(v-if="!article.table.isEmpty()")
      h2.subHeading 比較内容
      compare-table-view(
        :initialTable="article.table"
      )
    section.content
      h2.subHeading 比較メモ
      p {{ article.content }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import { CompareArticle } from '~/assets/javascript/types/articleTypes'
import { FirestoreCompareTableRepository } from '~/assets/javascript/Repository/FirestoreCompareTableRepository'
import ICompareTableRepository from '~/assets/javascript/Repository/ICompareTableRepository'
import CompareTableView from '~/components/organisms/ReadOnly/ReadOnlyCompareTableView.vue'

@Component({
  components: {
    CompareTableView,
  },
})
export default class ViewCompare extends Vue {
  article: CompareArticle | null = null

  public async created (): Promise<void> {
    const snapshot = await new FirestoreCompareTableRepository().findById(
      this.$route.params.compareId,
      parseInt(this.$route.params.categoryId)
    )

    if (!snapshot) {
      return
    }

    this.article = snapshot

    this.repository = new FirestoreCompareTableRepository()
  }

  repository: ICompareTableRepository
}
</script>

<style lang="scss" scoped>
.sec-main {
  background: $white;
  color: $body;
  padding: 40px 0;
  min-height: 100vh;

  @include mq {
    width: 600px;
    margin: 0 auto;
  }

  .heading {
    padding: 0 12px;

    .heading__head {
      font-weight: bold;
      font-size: 1.6rem;
    }
  }

  .subHeading {
    font-weight: bold;
    font-size: 1.3rem;
    padding: 8px 0;
  }

  .dataTable {
    padding: 24px 12px;
    overflow-x: scroll;
    color: $body;
  }

  .content {
    padding: 24px 12px;
  }

  .commit {
    padding: 12px;
  }
}
</style>