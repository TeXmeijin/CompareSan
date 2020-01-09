<template lang="pug">
  footer.Footer
    button(
      @click="isDisplayingPostMenu = !isDisplayingPostMenu"
    ).PostButton
      v-icon(
        name="balance-scale"
        scale="3"
      )
      span.Label 比較する
    template(v-if="isDisplayingPostMenu")
      .PostMenu
        span.Heading 比較する商品を選択する
        .Item(
          v-for="category in categories"
          :key="category.id"
        )
          span.Name {{ category.name }}
          span.Description {{ category.description }}
</template>

<script lang="ts">
import 'vue-awesome/icons/balance-scale'
import Icon from 'vue-awesome/components/Icon.vue'
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'
import {
  GetMasterCategories,
  CompareCategory,
} from '../../../assets/javascript/types/masterCategories'

@Component({
  components: {
    'v-icon': Icon,
  },
})
export default class TheFooter extends Vue {
  isDisplayingPostMenu = false

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
  height: 48px;
  background: $white;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;

  border-top: 1px solid $gray-light-3;

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
    width: 300px;
    overflow-y: scroll;
    background: $white;
    border-radius: 4px;
    z-index: 10;
    bottom: 90px;
    left: calc(50% - 150px);
  }
}
</style>
