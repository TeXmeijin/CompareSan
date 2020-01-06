<template lang="pug">
  header.Header
    a(href="/").ServiceLogo
      img(:src="require('@/assets/img/brand/compare-san-logo-v0_4.svg')").ServiceLogo_image
    .Spacer
    template(v-if="user")
      figure.Avatar
        img(:src="user.photoURL").AvatarImage
        figcaption プロフィール
    template(v-else)
      a(href="/login").Login 比較をはじめる
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
  padding: 6px 12px;
  border-bottom: 1px solid $gray-light-4;
  box-shadow: 1px 2px 2px 1px $gray-light-3;
  margin-bottom: 3px;

  .ServiceLogo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    height: 48px;

    .ServiceLogo_image {
      max-height: 100%;
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
    border-radius: 4px;
    font-weight: bold;
    color: $primary;
    background: $white;
    border: 1px solid $primary;
    padding: 8px 12px;
    font-size: 0.9rem;
    text-decoration: none;
  }
}
</style>
