<template lang="pug">
  button.EditButton(
    @click="$emit('click')"
  )
    v-icon(
      name="pencil-alt"
      scale="0.8"
    )
</template>

<script lang="ts">
import Vue from 'vue'
import 'vue-awesome/icons/pencil-alt'
import Icon from 'vue-awesome/components/Icon.vue'

export default Vue.extend({
  components: {
    'v-icon': Icon,
  },
})
</script>

<style lang="scss" scoped>
.EditButton {
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  color: $gray-light-1;
}
</style>
