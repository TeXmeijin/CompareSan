<template lang="pug">
  button(
    type="button"
    @click="$emit('click', $event)"
    :disabled="disabled"
    :class="computedClass"
  ).Button
    slot
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
    },
    type: {
      type: String,
      default: null,
    },
    block: {
      type: Boolean,
      default: false,
    },
    circle: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    computedClass () {
      const style: any = {
        '--block': this.block,
      }

      if (this.type) {
        style[this.type] = true
      }

      if (this.size === 'medium') {
        style['--medium'] = true
      }
      if (this.size === 'small') {
        style['--small'] = true
      }
      if (this.size === 'large') {
        style['--large'] = true
      }
      if (this.circle) {
        style['--circle'] = true
      }
      return style
    },
  },
})
</script>

<style lang="scss" scoped>
.Button {
  white-space: nowrap;
  color: $primary;
  background-color: $white;
  border: 1px solid $primary;
  border-radius: 4px;

  transition: background 0.2s;

  &.--block {
    display: block;
    width: 100%;
  }

  &:disabled {
    color: $gray !important;
    background: $gray-light-3 !important;
    border-color: $gray-light-2 !important;
  }

  &.--small {
    font-size: 0.7rem;
    padding: 2px 12px;
    text-align: center;
    border: 1px solid $gray-light-3;
    border-radius: 4px;
  }

  &.--medium {
    font-size: 0.9rem;
    font-weight: bold;
    text-align: center;
    padding: 4px 12px;
    border-radius: 4px;
  }

  &.--large {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    padding: 12px 24px;
    border-radius: 8px;
  }

  &.--circle {
    padding: 0;
    border-radius: 50%;
    font-size: 1.2rem;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &.primary {
    background: $primary;
    color: $white;
    border: 0;
  }

  &.gray {
    background: $gray;
    color: $white;
    border: 0;
  }

  &.error-outlined {
    color: $error;
    border-color: $error;
  }
}
</style>
