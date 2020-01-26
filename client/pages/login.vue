<template lang="pug">
  .Login
    h1.LoginTitle
      span.LoginTitle__text 比較さんにログイン
    .LoginArea
      .LoginByThirdParty
        button(
          @click="login"
        ).LoginByThirdParty__button
          img(
            :src="require('~/assets/img/third-party/google-signin.png')"
          ).LoginByThirdParty__image
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component
export default class Index extends Vue {
  @Auth.Action login
  @Auth.Action logout

  @Auth.State user

  @Watch('user')
  function (newUser) {
    if (newUser) {
      if (this.$route.query.category_id) {
        this.$router.push(`/post/${this.$route.query.category_id}`)
        return
      }
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
.Login {
  .LoginTitle {
    padding: 24px 0;
    display: flex;
    justify-content: center;

    &__text {
      font-size: 1.5rem;
      font-weight: bold;
    }
  }

  .LoginArea {
  }

  .LoginByThirdParty {
    padding: 0 24px;
    display: flex;
    justify-content: center;

    &__button {
      display: flex;
      height: 60px;
      border: 0;
      padding: 0;
      background: transparent;
    }

    &__image {
      height: 60px;
      width: auto;
    }
  }
}
</style>
