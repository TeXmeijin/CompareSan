<template lang="pug">
  .PostChoicePage
    transition(
      name="first"
    )
      .MenuBase(v-if="index === 1" :key="index")
        span.Heading ○○をえらぶ
        .Item(
          @click="index = 2"
          v-for="category in categories"
          :key="category.id"
        )
          figure.ImageContainer
            img(
              :src="require('~/assets/img/product_image/image_display_monitor.jpg')"
            ).Image
          span.Name.-afterImage {{ category.name }}
    transition(
      name="second"
    )
      .MenuBase(v-if="index === 2" :key="index")
        span.Heading ○○をえらぶ
        p.Confirm
          span ※XXXXXXXXXXXXXXXXXXX
          span ※XXXXXXXXXXXXXXXXXXX
        template(v-for="(state, index) in checkState")
          .Item(
            :class="{'-unChecked': !state}"
            @click="checkState.splice(index, 1, !checkState[index])"
          )
            .ItemInner
              span.Name テスト
              v-icon(
                name="check-circle"
                scale="2.2"
                :class="{'-checked': !!state}"
              ).CheckIcon
        .NextButton
          .ActionButton
            button.ActionButton__button(
              @click="index = 3"
            ) 次へ >
    transition(
      name="second"
    )
      .MenuBase(v-if="index === 3" :key="index")
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
              @click=""
            ) SUBMIT
</template>

<script lang="ts">
import Vue from 'vue'
import 'vue-awesome/icons/check-circle'
import Icon from 'vue-awesome/components/Icon.vue'

import {
  CompareCategory,
  GetMasterCategories,
} from '../../assets/javascript/types/masterCategories'
export default Vue.extend({
  components: {
    'v-icon': Icon,
  },
  layout: 'withoutFooter',
  data () {
    return {
      index: 1,
      checkState: [true, true, true, false, false, false],
      productInfoList: [
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
      ],
    }
  },
  computed: {
    categories (): CompareCategory[] {
      const categories = GetMasterCategories()
      return Object.keys(categories)
        .slice(1)
        .map((key) => {
          return categories[key]
        })
    },
  },
})
</script>

<style lang="scss">
.PostChoicePage {
  min-height: 100vh;
  position: relative;

  .MenuBase {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
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

.first-enter-active,
.first-leave-active,
.second-enter-active,
.second-leave-active {
  position: absolute;
  transition: 0.5s ease-in-out;
}

.first-leave-to,
.second-leave-to {
  transform: translateX(-100vw);
}

.second-enter {
  transform: translateX(100vw);
}
</style>
