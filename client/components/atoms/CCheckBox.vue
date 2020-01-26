<template lang="pug">
.CheckBox(
  @click="$emit('input', !value)"
)
  v-icon(
    :name="value ? 'check-square' : 'regular/square'"
  ).Icon
  span.Label {{ label }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

import 'vue-awesome/icons/check-square'
import 'vue-awesome/icons/regular/square'
import Icon from 'vue-awesome/components/Icon.vue'

@Component({
  components: {
    'v-icon': Icon,
  },
})
export default class CCheckBox extends Vue {
  @Prop({
    type: Boolean,
    required: true,
  })
  value

  @Prop({
    type: String,
    required: true,
  })
  label
}
</script>

<style lang="scss" scoped>
.CheckBox {
  display: flex;
  align-items: center;
  padding: 4px 0;
  cursor: pointer;

  .Icon {
    color: $primary;
  }

  .Label {
    margin-left: 4px;
  }
}
</style>
