<template lang="pug">
main.sec-main
  template(v-if="article")
    section.heading
      h1.heading__head {{ article.title }}
    section.dataTable(v-if="article.table")
      h2.subHeading 比較内容
      compare-table-view(
        :initialTable="article.table"
      )
    .content
      section(v-html="$md.render(article.content)")
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

import { namespace } from 'vuex-class'
import { CompareArticle } from '~/assets/javascript/types/articleTypes'
import { FirestoreCompareTableRepository } from '~/assets/javascript/Repository/FirestoreCompareTableRepository'
import ICompareTableRepository from '~/assets/javascript/Repository/ICompareTableRepository'
import CompareTableView from '~/components/organisms/ReadOnly/ReadOnlyCompareTableView.vue'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

async function init ({ route }) {
  const snapshot = await new FirestoreCompareTableRepository().findById(
    route.params.compareId,
    parseInt(route.params.categoryId)
  )

  if (!snapshot) {
    return
  }

  snapshot.content = snapshot.content.replace(/(\n|#)# /g, '$1## ').replace(/^# /, '## ')

  return {
    article: snapshot,
    repository: new FirestoreCompareTableRepository(),
  }
}

@Component({
  components: {
    CompareTableView,
  },
  async asyncData ({ route }) {
    try {
      return await init({ route })
    } catch (error) {}
  },
})
export default class ViewCompare extends Vue {
  article: CompareArticle | null = null

  @Auth.State user

  async mounted () {
    if (this.article === null) {
      const initData = await init({ route: this.$route })

      if (!initData) {
        return
      }

      this.article = initData.article
      this.repository = initData.repository
    }
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
    width: 800px;
    margin: 0 auto;
  }

  .heading {
    padding: 0 16px;

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
    padding: 24px 16px;
    overflow-x: scroll;
    color: $body;
  }

  .content {
    padding: 24px 16px;
  }

  .commit {
    padding: 16px;
  }
}
</style>
