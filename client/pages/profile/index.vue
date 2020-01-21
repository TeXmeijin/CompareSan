<template lang="pug">
article.Profile
  template(v-if="user")
    section.Heading
        h1.MainHeading
          span.MainHeading__text {{ user.displayName }}さんの比較一覧
    section.List
      ul.CompareList
        li.CompareListItem(
          v-for="article in compareList"
          :key="article.id"
        )
          .Card
            a(:href="articleDetailUrl(article)")
              h2.Card__title {{ article.title }}
            p.Card__content(
              v-if="article.content"
            ) {{ article.content.substr(0, 30) }}
            .Card__actions
              a(:href="articleDetailUrl(article)")
                c-button(
                  size="small"
                ) 編集
              c-button(
                size="small"
                @click="onClickedDeleteButton(article)"
              ) 削除
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
  },
})
export default class Profile extends Vue {
  @Auth.State user
  @Auth.State uid

  @Auth.Action logout

  isShowingDeleteModal = false
  deleteTarget: CompareArticle | null = null

  compareRepository: ICompareTableRepository

  @Watch('uid')
  async function () {
    this.compareList = await this.compareRepository.listByUid(this.uid)
  }

  created () {
    if (!this.user) {
      this.$router.push(`/login`)
    }

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
  padding: 0 12px;
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
      display: flex;

      &:not(:first-child) {
        margin-top: 12px;
      }

      .Card {
        width: 100%;
        padding: 12px;
        border: 1px solid $gray-light-3;
        border-radius: 4px;

        &__title {
          margin-bottom: 16px;
          font-size: 1.2rem;
        }

        &__content {
          font-size: 0.9rem;
          color: $gray;
        }

        &__actions {
          margin-top: 12px;
          display: flex;
          justify-content: flex-end;

          .Button {
            &:not(:first-child) {
              margin-left: 8px;
            }
          }
        }
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
