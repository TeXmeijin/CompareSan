<template lang="pug">
  .ReadOnlyUrlCell(:style="{ width: cellWidth }")
    span(v-if="url !== null")
      a(:href="url" rel="nofollow").Link {{ url }}
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { UrlCell } from '~/assets/javascript/types/tableTypes'
import * as tableSize from '~/store/tableSize'

const TableSize = namespace(tableSize.name)

@Component
export default class ReadOnlyUrlCellVue extends Vue {
  @Prop({
    required: true,
    type: Object,
  })
  cell: UrlCell

  url: string | null = null

  created () {
    this.url = this.cell.value
  }

  @TableSize.Getter cellWidth
}
</script>

<style lang="scss" scoped>
.ReadOnlyUrlCell {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  word-break: break-all;

  .Link {
    font-size: 0.8rem;
    text-decoration: underline;
  }
}
</style>
