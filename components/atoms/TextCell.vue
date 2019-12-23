<template lang="pug">
  .TextCell.BaseCell
    input(
      type="text"
      class="--stringField --head"
      :value="cell.value"
    )
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { TextCell } from '../../assets/javascript/types/tableTypes'

export default Vue.extend({
  name: 'TextCell',
  props: {
    cell: {
      type: Object,
      required: true
    } as PropOptions<TextCell>
  }
})
</script>
