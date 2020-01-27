<template lang="pug">
.Wrapper
  .PostChoicePage(:style="pageClass")
    .MenuBase
      span.Heading ○○をえらぶ
      .Item(
        @click="onClickedSelectProduct(category)"
        v-for="category in categories"
        :key="category.id"
      )
        figure.ImageContainer
          img(
            :src="require('~/assets/img/product_image/image_display_monitor.jpg')"
          ).Image
        span.Name.-afterImage {{ category.name }}
    .MenuBase
      span.Heading ○○をえらぶ
      p.Confirm
        span ※XXXXXXXXXXXXXXXXXXX
        span ※XXXXXXXXXXXXXXXXXXX
      template(v-for="(comparePoint, index) in comparePoints")
        .Item(
          :class="{'-unChecked': !checkState[index]}"
          @click="checkState.splice(index, 1, !checkState[index])"
        )
          .ItemInner
            span.Name {{ comparePoint.name }}
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
      span.Heading ○○を入力
      p.Confirm
        span ※XXXXXXXXXXXXXXXXXXX
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
          ) SUBMIT
      .BackAction
        span(
          @click="index -= 1"
        ) < 戻る
</template>

<script lang="ts">
import 'vue-awesome/icons/check-circle'
import Icon from 'vue-awesome/components/Icon.vue'
import { Vue, Component } from 'vue-property-decorator'
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
  index = 1

  @Auth.State uid

  selectedCategory = null as number | null
  checkState = [] as boolean[]
  comparePoints = [] as ComparePoint[]
  productInfoList = [
    {
      name: 'テスト１',
      price: 0,
      key: 'first',
    },
    {
      name: 'テスト２',
      price: 0,
      key: 'second',
    },
  ]
  repository = new FirestoreCompareTableRepository()

  get categories (): CompareCategory[] {
    const categories = GetMasterCategories()
    return Object.keys(categories)
      .slice(1)
      .map((key) => {
        return categories[key]
      })
  }
  get pageClass (): any {
    return {
      transform: `translateX(${-1 * (this.index - 1) * 100}vw)`,
    }
  }

  onClickedSelectProduct (category: CompareCategory) {
    this.index = 2
    this.selectedCategory = category.id
    if (this.selectedCategory === null) {
      return null
    }
    this.comparePoints = this.categories.find(
      el => el.id === this.selectedCategory
    )!.factory.comparePoints
    this.checkState = Array(this.comparePoints.length).fill(true)
  }
  async submit (): Promise<boolean> {
    if (!this.selectedCategory) {
      return false
    }
    // TODO: validate number
    const table = this.categories
      .find(el => el.id === this.selectedCategory)!
      .factory.factory({
        productInfoList: this.productInfoList,
        comparePointKeys: this.comparePoints
          .filter((_, index) => {
            return this.checkState[index]
          })
          .map(el => el.key),
      })

    const docRef = await this.repository.create({
      table,
      title: '',
      content: '',
      is_public: true,
      uid: this.uid,
      created_at: Date.now(),
      categoryId: this.selectedCategory,
    })
    this.$router.push({
      name: 'compares-categoryId-compareId-edit',
      params: {
        categoryId: `${this.selectedCategory}`,
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
}
.PostChoicePage {
  display: flex;
  width: 300vw;
  min-height: 100vh;
  position: relative;

  transition: transform 0.5s ease-in-out;

  .MenuBase {
    box-sizing: border-box;
    width: 100vw;
    min-height: 100vh;
    padding: 84px 16px;
    background: $gray-light-4;

    .Heading {
      display: block;
      font-weight: bold;
      text-align: center;
      font-size: 1.4rem;
      padding-bottom: 8px;
      margin-bottom: 12px;
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
      }

      .CheckIcon {
        color: $gray;
        transition: color 0.1s;

        &.-checked {
          color: $accent;
        }
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
</style>
