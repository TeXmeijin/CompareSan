<template lang="pug">
.TopPage
  .Catch
    .CatchMessage
      span.CatchMessage__text いろんな商品をあなたが比較！
    .CatchDescription
      .CatchDescription__text どの商品を買うべきか
        br
        | あなただけの比較表を作れるツール
    figure.CatchLogo
      img(
        :src="require('~/assets/img/brand/simple_logo.svg')"
      ).CatchLogo__image
    .CatchAction
      .ActionButton
        nuxt-link(
          to="/post"
        ).ActionButton__button さっそく比較する >
  .Feature
    .Feature__message どの商品を買うか迷ったとき、
      br
      | あなただけの比較表を作れます
    .FeaturePoint
      figure.FeaturePoint--compareTable
        img(
          :src="require('~/assets/img/top/compare_sample_table.svg')"
        ).FeaturePoint--compareTable__image
  .Feature
    .Feature__message 何で比較するか迷ったら
      br
      | デフォルトの比較ポイントを利用！
    .FeaturePoint
      .FeaturePointTitle
        span.FeaturePoint--default__title たとえばデジタルカメラの比較ポイントは...
      .FeaturePointCard
        figure.FeaturePointImage--default
          .FeaturePointImage--default__image
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
            li.FeaturePointComparePoints__item--full
              .FeaturePointComparePointsItem
                span.FeaturePointComparePointsItem__desc などが設定済みです
      .FeaturePoint--default__comparePointsLets 他にも加湿器、ディスプレイモニタ、掃除機、電子レンジなども比較できます！
  .Feature
    .Feature__message 比較した結果は保存して
      br
      | 家族・友人にシェアできる！
    .FeatureDescription 一緒に購入を検討している家族や友人にURLをシェアして、一緒に検討しましょう
    .FeaturePoint
      figure.FeaturePointImage--share
        img(
          :src="require('~/assets/img/top/smartphone_share.jpg')"
        ).FeaturePointImage--share__image
  .Lets
    .LetsMessage
      .LetsMessage__text さあ、「比較する」を押して
        br
        | 買いたい商品の比較をはじめましょう！
</template>

<style lang="scss">
.TopPage {
  .Catch {
    padding: 48px 0 0;
    background-image: url(~assets/img/top/catch_background.svg);
    background-position: center center;
    background-repeat: repeat;
    margin-bottom: 24px;

    @include mq('sp') {
      background-size: cover;
    }

    @include mq {
      background-size: contain;
    }
  }

  .CatchMessage {
    display: flex;
    justify-content: center;

    &__text {
      font-size: 1.1rem;
      font-weight: bold;
      position: relative;

      &::before {
        position: absolute;
        top: -6px;
        left: -16px;
        content: '';
        display: block;
        border-left: 2px solid $body;
        height: 40px;
        transform: rotate(-10deg);
      }

      &::after {
        position: absolute;
        top: -6px;
        right: -16px;
        content: '';
        display: block;
        border-left: 2px solid $body;
        height: 40px;
        transform: rotate(10deg);
      }
    }
  }

  .CatchDescription {
    margin-top: 40px;
    display: flex;
    justify-content: center;

    &__text {
      text-align: center;
      font-weight: bold;
      font-size: 1.2rem;
    }
  }

  .CatchLogo {
    display: flex;
    justify-content: center;
    margin-top: 16px;

    &__image {
      width: 242px;
      height: 72px;
    }
  }

  .CatchAction {
    margin: 0 12px;
    margin-top: 64px;
    margin-bottom: -16px;
  }

  .ActionButton {
    display: flex;
    justify-content: center;
    @include mq('sp') {
      width: 100%;
    }

    &__button {
      font-weight: bold;
      color: $white;
      background: $primary;
      font-size: 1.3rem;
      padding: 16px 0;
      text-align: center;
      border-radius: 8px;
      box-shadow: 1px 2px 2px 1px $gray-light-2;

      @include mq('sp') {
        flex: 1;
      }
      @include mq {
        padding: 16px 48px;
        max-width: 320px;
      }
    }
  }

  .Feature {
    padding: 32px 12px;

    @include mq {
      max-width: 520px;
      margin: 0 auto;
    }

    &:nth-child(odd) {
      background: $gray-light-4;
    }

    &__message {
      font-weight: bold;
      font-size: 1.3rem;

      @include mq {
        text-align: center;
      }
    }

    .FeatureDescription {
      margin-top: 16px;
    }

    .FeaturePoint {
      margin-top: 16px;

      .FeaturePoint--compareTable {
        margin-top: 16px;

        @include mq {
          display: flex;
          justify-content: center;
        }
      }

      &--default {
        margin-top: 24px;

        &__title {
        }

        &__image {
        }

        &__comparePoints {
          padding: 8px 8px 8px 16px;
        }

        &__comparePointsLets {
          margin-top: 16px;
          font-size: 0.9rem;
        }
      }
    }

    .FeaturePointTitle {
      display: flex;
      align-items: center;
      margin-top: 4px;
    }

    .FeaturePointCard {
      margin: 8px 0;
      display: flex;
      align-items: center;
      border-radius: 8px;
      overflow: hidden;
    }

    .FeaturePointImage {
      &--default {
        &__image {
          width: 120px;
          height: 108px;
          background-image: url(~assets/img/top/degital_camera.jpg);
          background-size: cover;
        }
      }

      &--share {
        width: 100%;

        &__image {
          border-radius: 8px;
          width: 100%;
        }
      }
    }

    .FeaturePointComparePoints {
      display: flex;
      flex-wrap: wrap;

      &__item {
        width: 50%;

        &--full {
          width: 100%;
        }
        padding: 4px 0;
      }
    }

    .FeaturePointComparePointsItem {
      display: flex;
      align-items: center;

      &__icon {
        margin-right: 4px;
        color: $primary;
      }

      &__label {
        font-weight: bold;
        font-size: 0.9rem;
      }

      &__desc {
        font-size: 0.8rem;
      }
    }

    .FeaturePointAction {
      margin-top: 24px;
    }
  }

  .Lets {
    display: flex;
    justify-content: center;
    padding: 12px 0 24px;

    .LetsMessage {
      border: 2px solid $primary;
      border-radius: 8px;
      padding: 16px;
      position: relative;

      &:before {
        position: absolute;
        content: '';
        bottom: -19px;
        left: calc(50% - 10px);
        border-top: 18px solid $primary;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }

      &:after {
        position: absolute;
        content: '';
        bottom: -15px;
        left: calc(50% - 10px);
        border-top: 18px solid $white;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
      }

      .LetsMessage__text {
        font-weight: bold;
        text-align: center;
      }
    }
  }
}
</style>
