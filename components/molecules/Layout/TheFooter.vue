<template lang="pug">
  footer.Footer
    a.Home(
      href="/"
    )
      v-icon(
        name="home"
        scale="2"
      )
    .Post
      button(
        @click="isDisplayingPostMenu = !isDisplayingPostMenu"
      ).PostButton
        v-icon(
          name="balance-scale"
          scale="3"
        )
        span.Label 比較する
    a(href="/profile").Profile
      v-icon(
        name="regular/user"
        scale="2"
      )
    transition(
      name="postMenu"
      appear
    )
      template(v-if="isDisplayingPostMenu")
        .PostMenu
          span.Heading 比較する商品をえらぶ
          a.Item(
            :href="`/post/${category.id}`"
            v-for="category in categories"
            :key="category.id"
          )
            span.Name {{ category.name }}
            span.Description {{ category.description }}
</template>

<script lang="ts">
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/regular/user'
import 'vue-awesome/icons/balance-scale'
import Icon from 'vue-awesome/components/Icon.vue'
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import {
  GetMasterCategories,
  CompareCategory,
} from '../../../assets/javascript/types/masterCategories'
import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  components: {
    'v-icon': Icon,
  },
})
export default class TheFooter extends Vue {
  isDisplayingPostMenu = false

  @Auth.State user

  get categories (): CompareCategory[] {
    const categories = GetMasterCategories()
    return Object.keys(categories).map((key) => {
      return categories[key]
    })
  }
}
</script>

<style lang="scss" scoped>
.Footer {
  width: 100%;
  height: 56px;
  background: $white;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  z-index: $zIndexOfFixedFooter;

  border-top: 1px solid $gray-light-3;

  .Home,
  .Profile {
    flex: 1;
  }

  .Post {
    display: flex;
    justify-content: center;
    width: 80px;
  }

  .Home,
  .Profile {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $gray-light-1;
  }

  .PostButton {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: $primary;
    color: $white;
    margin: -24px;
    border: 0;

    box-shadow: 0px 2px 2px 2px $gray-light-2;

    .Label {
      font-weight: bold;
      margin-top: 4px;
      font-size: 0.7rem;
    }
  }

  .PostMenu {
    position: fixed;
    max-height: 300px;
    width: calc(100% - 48px);
    padding: 16px 12px;
    overflow-y: scroll;
    background: $white;
    border: 2px solid $primary;
    border-radius: 8px;
    z-index: $zIndexOfNewPostMenu;
    bottom: 90px;
    left: calc(50% - (100% - 48px) / 2);
    .Heading {
      display: block;
      font-weight: bold;
      text-align: center;
      font-size: 1.4rem;
      padding-bottom: 8px;
      margin-bottom: 12px;
    }

    .Item {
      display: block;
      color: $gray-light-1;
      padding: 8px 0;
      text-decoration: underline;
      @include mq {
        transition: background 0.2s;
        &:hover {
          background: $gray-light-4;
        }
      }
    }
  }
  .Avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.7rem;

    .AvatarImage {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-bottom: 4px;
    }
  }
}

// オーバーレイのトランジション
.postMenu-enter-active,
.postMenu-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.postMenu-enter,
.postMenu-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
