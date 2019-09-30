<template lang="pug">
div 投稿画面
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace, Action } from 'vuex-class'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component({
  middleware: 'auth'
})
export default class Post extends Vue {
}
</script>
