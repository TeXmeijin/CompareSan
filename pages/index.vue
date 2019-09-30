<template lang="pug">
.sec-page
  h1 top page
  p(v-if="isLogined")
    span {{ user.displayName }}
    button(@click="logout(uid)") ログアウト
  p(v-else)
    button(@click="login") ログイン
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace, Action } from 'vuex-class'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component
export default class Index extends Vue {
  @Auth.Action login;
  @Auth.Action logout;

  @Auth.State user;
  @Auth.State uid;
  @Auth.State credential;

  public get isLogined (): boolean {
    return !!this.user && !!this.uid && !!this.credential
  }
}
</script>
