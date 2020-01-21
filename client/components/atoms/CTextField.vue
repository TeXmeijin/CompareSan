<template lang="pug">
  input(
    type="text"
    :class="styleClass"
    :value="value"
    @input="$emit('input', $event.target.value)"
    placeholder="ここに入力"
  )
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class CTextField extends Vue {
  @Prop({
    default: '',
    type: [String, Number],
  })
  value

  @Prop({
    type: Boolean,
    default: false,
  })
  block

  @Prop({
    type: Boolean,
    default: true,
  })
  medium

  @Prop({
    type: Boolean,
    default: false,
  })
  small

  @Prop({
    type: Boolean,
    default: false,
  })
  large

  get styleClass () {
    return {
      TextField: true,
      medium: this.medium,
      small: this.small,
      large: this.large,
      block: this.block,
    }
  }
}
</script>

<style lang="scss" scoped>
.TextField {
  padding: 8px;
  font-size: 1rem;
  display: flex;
  border: 1px solid $gray-light-3;
  border-radius: 4px;
  max-width: 100%;

  &.block {
    width: 100%;
  }

  &::placeholder {
    font-size: 0.8rem;
    font-style: italic;
  }
}
</style>
