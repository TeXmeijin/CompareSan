<template lang="pug">
.Wrapper
  .PostChoicePage(:class="pageClass")
    .MenuBase
      span.Heading 比較したい家電を
        br
        | 選んでください
      .Item(
        @click="onClickedSelectProduct(category)"
        v-for="category in categories.slice(1)"
        :key="category.id"
      )
        figure.ImageContainer
          img(
            :src="getCategoryImage(category.id)"
          ).Image
        span.Name.-afterImage {{ category.name }}
      .OtherItem
        span.OtherItem__link(
          @click="onClickedOtherProduct()"
        ) その他の家電を比較する
      .BackAction
        nuxt-link(
          to="/"
        ) < トップに戻る
    .MenuBase
      span.Heading {{ selectedProductName }}を
        br
        | 比較するポイントを
        br
        | 選んでください
      p.Confirm
        span ※あとから比較するポイントを追加できます
        span ※価格は比較ポイントとは別で設定します
      template(v-for="(comparePoint, index) in comparePoints")
        .Item(
          :class="{'-unChecked': !checkState[index]}"
          @click="checkState.splice(index, 1, !checkState[index])"
        )
          .ItemInner
            .ItemInner__container
              span.Name {{ comparePoint.name }}
              span.ItemInnerDescription(
                v-if="comparePoint.description"
              ) {{ comparePoint.description }}
            v-icon(
              name="check-circle"
              scale="2.2"
              :class="{'-checked': !!checkState[index]}"
            ).CheckIcon
      .NextButton
        .ActionButton
          button.ActionButton__button(
            @click="index = 3"
          ) 次へ >
      .BackAction
        span(
          @click="index -= 1"
        ) < 戻る
    .MenuBase
      span.Heading いま比較している
        br
        | {{ selectedProductName }}の
        br
        | 情報を入力してください
      p.Confirm
        span ※あとから変更することも可能です
      .Item(
        v-for="productInfo in productInfoList"
        :key="productInfo.key"
      )
        .Form
          .FormContent.--no-border.--dense
            span.Label 名前
            c-text-field(
              v-model="productInfo.name"
              block
            )
          .FormContent.--no-border.--dense
            span.Label 価格
            c-text-field(
              v-model="productInfo.price"
              block
            )
      .NextButton
        .ActionButton
          button.ActionButton__button(
            @click="submit"
          ) 以上の内容で比較をはじめる
      .BackAction
        span(
          @click="index -= 1"
        ) < 戻る
</template>

<script lang="ts">
import 'vue-awesome/icons/check-circle'
import Icon from 'vue-awesome/components/Icon.vue'
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { ComparePoint } from '../../assets/javascript/factory/tableFactories/baseFactory'
import {
  CompareCategory,
  GetMasterCategories,
} from '../../assets/javascript/types/masterCategories'
import { FirestoreCompareTableRepository } from '../../assets/javascript/Repository/FirestoreCompareTableRepository'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    'v-icon': Icon,
  },
})
export default class Post extends Vue {
  // TODO: scrollToメソッドの型定義が面倒だった。要リファクタ
  '$scrollTo': any

  index = 1

  @Auth.State uid

  selectedCategoryId = null as number | null
  checkState = [] as boolean[]
  comparePoints = [] as ComparePoint[]
  productInfoList = [
    {
      name: '商品１',
      price: 0,
      key: 'first',
    },
    {
      name: '商品２',
      price: 0,
      key: 'second',
    },
  ]
  repository = new FirestoreCompareTableRepository()

  @Watch('index')
  scrollToTop () {
    this.$scrollTo('body')
  }

  get categories (): CompareCategory[] {
    const categories = GetMasterCategories()
    return Object.keys(categories).map((key) => {
      return categories[key]
    })
  }
  get pageClass (): any {
    return {
      [`pageTransform${this.index}`]: true,
    }
  }
  get selectedProductName (): string {
    if (this.selectedCategoryId === null) {
      return '商品'
    }
    return this.categories.find(el => el.id === this.selectedCategoryId)!.name
  }

  getCategoryImage (id: number) {
    switch (id) {
    case 1:
      return require('~/assets/img/product_image/image_display_monitor.jpg')

    case 2:
      return require('~/assets/img/product_image/image_digital_camera.jpg')

    case 3:
      return require('~/assets/img/product_image/note_pc.jpg')

    default:
      break
    }
  }
  onClickedSelectProduct (category: CompareCategory) {
    if (!this.uid) {
      this.$router.push('/login')
      return
    }

    this.index = 2
    this.selectedCategoryId = category.id
    if (this.selectedCategoryId === null) {
      return null
    }
    this.comparePoints = this.categories.find(
      el => el.id === this.selectedCategoryId
    )!.factory.comparePoints
    this.checkState = Array(this.comparePoints.length)
      // 4つ以上の選択肢はあってもしんどいだけなのでデフォルトは外す※UX
      .fill(true, 0, 4)
      .fill(false, 5)
  }
  async onClickedOtherProduct () {
    this.selectedCategoryId = 0
    await this.submit()
  }
  async submit (): Promise<boolean> {
    if (this.selectedCategoryId === null) {
      return false
    }
    // TODO: validate number
    const table = this.categories
      .find(el => el.id === this.selectedCategoryId)!
      .factory.factory({
        productInfoList: this.productInfoList,
        comparePointKeys: this.comparePoints
          .filter((_, index) => {
            return this.checkState[index]
          })
          .map(el => el.key),
      })

    const docRef = await this.repository.create({
      table: table.data,
      title: `${this.categories[this.selectedCategoryId].name}の比較`,
      content: '',
      is_public: true,
      uid: this.uid,
      created_at: Date.now(),
      categoryId: this.selectedCategoryId,
    })
    this.$router.push({
      name: 'compares-categoryId-compareId-edit',
      params: {
        categoryId: `${this.selectedCategoryId}`,
        compareId: docRef.id,
      },
    })
    return true
  }
}
</script>

<style lang="scss">
.Wrapper {
  overflow: hidden;

  @extend %pc-centering-page;
}
.PostChoicePage {
  display: flex;
  width: 300vw;
  @include mq {
    width: calc(3 * 720px);
  }
  min-height: 100vh;
  position: relative;

  transition: transform 0.5s ease-in-out;

  .MenuBase {
    box-sizing: border-box;
    width: 100vw;
    @include mq {
      width: 720px;
    }

    min-height: 100vh;
    padding: 56px 16px 80px;
    background: $gray-light-4;

    .Heading {
      display: block;
      font-weight: bold;
      text-align: center;
      font-size: 1.4rem;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }

    .Confirm {
      display: flex;
      flex-direction: column;
      margin-top: 8px;
      font-size: 0.8rem;
      line-height: 1.5;
      color: $gray-light-1;
    }

    .Item {
      display: flex;
      align-items: center;
      color: $body;
      background: $white;
      padding: 0;
      border-radius: 12px;
      box-shadow: 2px 2px 5px 2px $gray-light-c;
      overflow: hidden;
      transition: background 0.1s;
      cursor: pointer;

      @include mq {
        &:hover {
          background: $gray-light-4;
        }
      }

      &:not(:first-child) {
        margin-top: 24px;
      }

      &.-unChecked {
        background: $gray-light-3;
      }

      .ImageContainer,
      .Image {
        height: 80px;
        width: 100px;
      }

      .Name {
        font-weight: bold;

        &.-afterImage {
          margin-left: 20px;
        }
      }

      .ItemInner {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;

        &__container {
          display: flex;
          flex-direction: column;
        }

        &Description {
          color: $gray;
          font-size: 0.8rem;
          margin-top: 4px;
        }
      }

      .CheckIcon {
        color: $gray;
        transition: color 0.1s;

        &.-checked {
          color: $accent;
        }
      }
    }

    .OtherItem {
      margin-top: 24px;
      text-align: center;
      padding: 16px 0;

      &__link {
        cursor: pointer;
        font-weight: bold;
        color: $gray-light-1;
        text-decoration: underline;
      }
    }

    .NextButton {
      padding: 24px 0 32px;
    }

    .BackAction {
      margin-top: 24px;
      margin-bottom: 24px;
      font-size: 0.8rem;
      color: $gray;
    }

    .Form {
      flex: 1;
    }
  }
}

.pageTransform1 {
  transform: translateX(0);
}

.pageTransform2 {
  transform: translateX(-100vw);
  @include mq {
    transform: translateX(-720px);
  }
}

.pageTransform3 {
  transform: translateX(-200vw);
  @include mq {
    transform: translateX(-1440px);
  }
}
</style>
