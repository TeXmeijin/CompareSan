<template lang="pug">
  header.Header
    a(href="/").ServiceLogo
      span.ServiceAbstract いろんな商品を自分で比較するツール
      span.ServiceName 比較さん
    .Spacer
    template(v-if="user")
      figure.Avatar
        img(:src="user.photoURL").AvatarImage
        figcaption プロフィール
    template(v-else)
      a(href="/login").Login ログイン
      a(href="/signup").SignUp 新規登録
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import * as auth from '~/store/auth'
const Auth = namespace(auth.name)
@Component
export default class TheHeader extends Vue {
  @Auth.State user
}
</script>

<style lang="scss" scoped>
.Header {
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-bottom: 1px solid $gray-light-4;
  box-shadow: 1px 0 2px 1px $gray-light-3;
  margin-bottom: 2px;

  .ServiceLogo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 4px;
    text-decoration: none;

    .ServiceAbstract {
      font-size: 0.7rem;
      margin-bottom: 4px;
    }

    .ServiceName {
      font-weight: bold;
      font-size: 1.6rem;
      color: $primary;
    }
  }

  .Spacer {
    flex: 1;
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

  .Login {
    margin: 0 4px;
  }

  .SignUp {
    border-radius: 4px;
    font-weight: bold;
    color: $white;
    background: $primary;
    padding: 4px 8px;
  }
}
</style>
