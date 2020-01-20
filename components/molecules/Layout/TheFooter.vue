<template lang="pug">
  footer.Footer
    nuxt-link.Home(
      to="/"
    )
      v-icon(
        name="home"
        scale="2"
      )
    .Post
      nuxt-link(
        to="/post"
      ).PostButton
        v-icon(
          name="balance-scale"
          scale="3"
        )
        span.Label 比較する
    nuxt-link(to="/profile").Profile
      v-icon(
        name="regular/user"
        scale="2"
      )
</template>

<script lang="ts">
import 'vue-awesome/icons/home'
import 'vue-awesome/icons/regular/user'
import 'vue-awesome/icons/balance-scale'
import Icon from 'vue-awesome/components/Icon.vue'
import { Vue, Component } from 'vue-property-decorator'

@Component({
  components: {
    'v-icon': Icon,
  },
})
export default class TheFooter extends Vue {}
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
</style>
