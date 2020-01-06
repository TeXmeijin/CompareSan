<template lang="pug">
  section.Heading
    template(v-if="user")
      h1.MainHeading
        span.MainHeading__text {{ user.displayName }}さんの比較一覧
      ul.CompareList(
        v-for="article in compareList"
        :key="article.id"
      )
        li.CompareListItem
          a(:href="articleDetailUrl(article)")
            h2 {{ article.title }}
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { CompareArticle } from '../../assets/javascript/types/articleTypes'
import { FirestoreCompareTableRepository } from '../../assets/javascript/Repository/FirestoreCompareTableRepository'
import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component
export default class TheHeader extends Vue {
  @Auth.State user
  @Auth.State uid

  @Watch('uid')
  async function () {
    this.compareList = await new FirestoreCompareTableRepository().listByUid(
      this.uid
    )
  }

  compareList: CompareArticle[] = []

  articleDetailUrl (article: CompareArticle): string {
    return `/compares/${article.categoryId}/${article.id}/edit`
  }
}
</script>

<style lang="scss" scoped></style>
