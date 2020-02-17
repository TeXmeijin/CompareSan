<template lang="pug">
  .CompareAllList
    h1.Title {{ category.name }}の比較一覧
    .CompareList
      compare-list-item(
        v-for="article in compareList"
        :key="article.id"
        :article="article"
      )
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import {
  CompareCategory,
  GetMasterCategoryById,
} from '../../../assets/javascript/types/masterCategories'
import { CompareArticle } from '~/assets/javascript/types/articleTypes'
import { FirestoreCompareTableRepository } from '~/assets/javascript/Repository/FirestoreCompareTableRepository'
import ICompareTableRepository from '~/assets/javascript/Repository/ICompareTableRepository'
import * as auth from '~/store/auth'

const Auth = namespace(auth.name)

@Component({
  components: {
    CompareListItem: () =>
      import('~/components/organisms/Compare/CompareListItem.vue'),
  },
  asyncData ({ route }) {
    const category = GetMasterCategoryById(parseInt(route.params.categoryId))

    return {
      category,
    }
  },
})
export default class CompareCategoryList extends Vue {
  @Auth.State uid
  compareList: CompareArticle[] = []
  compareRepository: ICompareTableRepository
  category: CompareCategory | null = null

  @Watch('uid', {
    immediate: true,
  })
  async function () {
    this.compareRepository = new FirestoreCompareTableRepository()
    this.compareList = await this.compareRepository.listByCategoryId(
      parseInt(this.$route.params.categoryId)
    )
  }

  async mounted () {
    this.compareRepository = new FirestoreCompareTableRepository()
    this.compareList = await this.compareRepository.listByCategoryId(
      parseInt(this.$route.params.categoryId)
    )
  }
}
</script>

<style lang="scss" scoped>
.CompareAllList {
  padding: 24px 16px;
}

.Title {
  font-size: 1.3rem;
  font-weight: bold;
}

.CompareList {
  margin-top: 24px;
}

.CompareListItem {
  &:not(:first-child) {
    margin-top: 24px;
  }
}
</style>
