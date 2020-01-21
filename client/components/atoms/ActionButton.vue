<template lang="pug">
  div(
    @click="$emit('click')"
  ).ActionButton
    c-button(circle)
      span ＋
    span.label
      slot
</template>

<style lang="scss" scoped>
.ActionButton {
  display: flex;
  align-items: center;
  color: $primary;

  .label {
    margin-left: 4px;
    font-size: 0.9rem;
    font-weight: bold;
  }
}
</style>
