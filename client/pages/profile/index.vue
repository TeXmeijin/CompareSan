<template lang="pug">
article.Profile
  template(v-if="user")
    section.Heading
        h1.MainHeading
          span.MainHeading__text {{ user.displayName }}さんの比較一覧
    section.List
      ul.CompareList
        compare-list-item(
          v-for="article in compareList"
          :key="article.id"
          :article="article"
          :show-actions="true"
          @on-clicked-delete="deleteTarget = $event; isShowingDeleteModal = true"
        )
    section.Auth
      .Logout
        c-button(
          type="gray"
          size="large"
          block
          @click="onClickedLogout"
        ) ログアウトする
  modal(
    :isShowing="isShowingDeleteModal"
    @on-closed="isShowingDeleteModal = false; deleteTarget = null"
  )
    template(v-if="deleteTarget")
      .DeleteModal
        span.DeleteComfirmMessage {{ deleteTarget.title }}を削除しますか？
        c-button(
          block
          @click="deleteArticle"
        ) はい
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { CompareArticle } from '../../assets/javascript/types/articleTypes'
import { FirestoreCompareTableRepository } from '../../assets/javascript/Repository/FirestoreCompareTableRepository'
import ICompareTableRepository from '../../assets/javascript/Repository/ICompareTableRepository'
import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    Modal: () => import('~/components/atoms/Modal.vue'),
    CompareListItem: () =>
      import('~/components/organisms/Compare/CompareListItem.vue'),
  },
})
export default class Profile extends Vue {
  @Auth.State user
  @Auth.State uid

  @Auth.Action logout

  isShowingDeleteModal = false
  deleteTarget: CompareArticle | null = null

  compareRepository: ICompareTableRepository

  @Watch('uid', {
    immediate: true,
  })
  async function () {
    this.compareRepository = new FirestoreCompareTableRepository()
    if (this.uid) {
      try {
        this.compareList = await this.compareRepository.listByUid(this.uid)
      } catch (error) {}
    }
  }

  created () {
    this.compareRepository = new FirestoreCompareTableRepository()
  }

  async onClickedLogout () {
    await this.logout()
    this.$router.push('/')
  }

  compareList: CompareArticle[] = []

  articleDetailUrl (article: CompareArticle): string {
    return `/compares/${article.categoryId}/${article.id}/edit`
  }

  onClickedDeleteButton (article: CompareArticle) {
    this.deleteTarget = article
    this.isShowingDeleteModal = true
  }

  async deleteArticle () {
    this.isShowingDeleteModal = false
    await this.compareRepository.deleteArticle(this.deleteTarget!)
    this.compareList = this.compareList.filter((compare) => {
      return compare.id !== this.deleteTarget!.id
    })
  }
}
</script>

<style lang="scss" scoped>
.Profile {
  padding: 0 12px 80px;
}

.Heading {
  margin-top: 40px;

  .MainHeading {
    text-align: center;
    font-weight: bold;

    .MainHeading__text {
      font-size: 1.4rem;
    }
  }
}

.List {
  padding: 24px 0;

  .CompareList {
    .CompareListItem {
      &:not(:first-child) {
        margin-top: 12px;
      }
    }
  }
}

.DeleteModal {
  padding: 16px 0;

  .DeleteComfirmMessage {
    display: block;
    font-weight: bold;
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
}
</style>
