<template lang="pug">
.TopPage
  .Catch
    .Catch__message いろんな商品をあなたが比較！
    .Catch__description どの商品を買うべきか
      br
      | あなただけの比較表を作れるツール
    .Catch__action
      .CatchAction
        button.CatchAction__button さっそく比較する >
  .Feature
    .Feature__message どの商品を買うか迷ったとき、
      br
      | あなただけの比較表を作れます
    .Feature__point
      figure.FeaturePoint--compareTable
        img(
          :src="require('~/assets/img/top/compare_sample_table.svg')"
        ).FeaturePoint--compareTable__image
  .Feature
    .Feature__message 何で比較するか迷ったら
      br
      | デフォルトの比較ポイントを利用！
    .Feature__point
      .FeaturePoint--default__desc たとえば...
      .FeaturePoint--default__title デジタルカメラ
      figure
        img(
          :src="require('~/assets/img/top/degital_camera.jpg')"
        ).FeaturePoint--default__image
      .FeaturePoint--default__comparePoints
        ul.FeaturePointComparePoints
          li.FeaturePointComparePoints__item
            .FeaturePointComparePointsItem
              span.FeaturePointComparePointsItem__icon ●
              span.FeaturePointComparePointsItem__label 画素数
          li.FeaturePointComparePoints__item
            .FeaturePointComparePointsItem
              span.FeaturePointComparePointsItem__icon ●
              span.FeaturePointComparePointsItem__label ズーム倍率
          li.FeaturePointComparePoints__item
            .FeaturePointComparePointsItem
              span.FeaturePointComparePointsItem__icon ●
              span.FeaturePointComparePointsItem__label ISO感度
          li.FeaturePointComparePoints__item
            .FeaturePointComparePointsItem
              span.FeaturePointComparePointsItem__icon ●
              span.FeaturePointComparePointsItem__label 連射性能
      .FeaturePoint--default__comparePointsDesc などの比較ポイントがデフォルトであります
      .FeaturePoint--default__comparePointsLets 他にも加湿器、ディスプレイモニタ、掃除機、電子レンジなどが設定済み！！
      .FeaturePoint--default__action
        .FeaturePointAction
          button.FeaturePointAction__button さっそく比較する >
  .Feature
    .Feature__message 比較した結果は保存して
      br
      | 家族・友人にシェアできる！
    .Feature__description 一緒に購入を検討している家族や友人にURLをシェアして、一緒に検討しましょう
    .Feature__point
      figure.FeaturePoint--share
        img(
          :src="require('~/assets/img/top/smartphone_share.jpg')"
        ).FeaturePoint--share__image
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

import * as auth from '~/store/auth'
const Auth = namespace(auth.name)

@Component
export default class Index extends Vue {
  @Auth.Action login
  @Auth.Action logout

  @Auth.State user
  @Auth.State uid

  public get isLogined (): boolean {
    return !!this.user && !!this.uid
  }
}
</script>

<style lang="scss" scoped></style>
