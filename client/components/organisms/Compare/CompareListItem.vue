<template lang="pug">
  section.CompareListItem
    .CompareTag
      .CompareTag__container
        .CompareTagItem
          nuxt-link.CompareTagItem__text(
            :to="{ name: 'compares-categoryId', params: { categoryId: article.categoryId } }"
          ) {{ categories[article.categoryId].name }}
    nuxt-link.CompareLink(
      :to="{ name: 'compares-categoryId-compareId', params: { categoryId: article.categoryId, compareId: article.id } }"
    )
      .CompareTitle
        h3.CompareTitle__text {{ article.title }}
      .ComparingItem
        .ComparingItem__text {{ comparingItemText }}
      .CompareBody
        p.CompareBody__text {{ article.content.substr(0, 100) }}
      .CompareMeta
        .CompareMeta__container
          .CompareDate
            v-icon.CompareDate__icon(
              name="calendar"
            )
            .CompareDate__text {{ createdAtText }}
    .CompareActions(v-if="showActions")
      .CompareActions__container
        .CompareAction
          c-button(
            size="small"
            block
            type="error-outlined"
            @click.stop="$emit('on-clicked-delete', article)"
          ) 削除
        nuxt-link.CompareAction(
          :to="{ name: 'compares-categoryId-compareId-edit', params: { categoryId: article.categoryId, compareId: article.id } }"
        )
          c-button(
            size="small"
            type="accent"
            block
          ) 編集
</template>

<script lang="ts">
import 'vue-awesome/icons/calendar'
import Icon from 'vue-awesome/components/Icon.vue'

import dayjs from 'dayjs'
import 'dayjs/locale/ja'

import { Vue, Component, Prop } from 'vue-property-decorator'
import { CompareArticle } from '../../../assets/javascript/types/articleTypes'
import {
  GetMasterCategories,
  CompareCategory,
} from '../../../assets/javascript/types/masterCategories'

@Component({
  components: {
    'v-icon': Icon,
  },
})
export default class CompareListItem extends Vue {
  @Prop({
    type: Object,
    required: true,
  })
  article: CompareArticle

  @Prop({
    type: Boolean,
    default: false,
  })
  showActions

  get categories (): CompareCategory[] {
    const categories = GetMasterCategories()
    return Object.keys(categories).map((key) => {
      return categories[key]
    })
  }

  get comparingItemText (): string {
    const items = this.article.table.header.slice(0, 2)
    if (items.length === 0) {
      return '比較中の商品はありません'
    }
    let text = `比較中：${items.map(item => item.name).join('、')}`

    if (this.article.table.header.length > 2) {
      text += '　' + `他${this.article.table.header.length - 1}点`
    }

    return text
  }

  get createdAtText (): string {
    return dayjs(this.article.created_at).format('YYYY/MM/DD')
  }
}
</script>

<style lang="scss" scoped>
.CompareListItem {
  @extend %box-shadow;
  border-radius: 8px;
  background: $white;
  padding: 12px;

  .CompareLink {
    display: block;
  }

  .CompareTag {
    &__container {
      display: flex;
      align-items: center;
    }
  }

  .CompareTagItem {
    padding: 2px 12px;
    background: lighten($primary, 40%);
    border-radius: 12px;

    &__text {
      line-height: 0.8;
      font-size: 0.8rem;
    }
  }

  .CompareTitle {
    margin-top: 8px;

    &__text {
      font-weight: bold;
      font-size: 1.5rem;
    }
  }

  .ComparingItem {
    margin-top: 4px;
    &__text {
      font-size: 0.8rem;
      color: $accent;
    }
  }

  .CompareBody {
    margin-top: 16px;

    &__text {
      font-size: 0.9rem;
      color: $gray;
    }
  }

  .CompareMeta {
    margin-top: 4px;

    &__container {
      display: flex;
      justify-content: flex-end;
    }
  }

  .CompareDate {
    display: flex;
    align-items: center;

    &__icon {
      font-size: 0.8rem;
      color: $gray;
      margin-right: 4px;
    }

    &__text {
      color: $gray;
      font-size: 0.8rem;
    }
  }

  .CompareActions {
    margin-top: 16px;

    &__container {
      width: 100%;
      display: flex;
      align-items: center;
    }
  }

  .CompareAction {
    flex: 1;

    &:not(:first-child) {
      margin-left: 8px;
    }
  }
}
</style>
