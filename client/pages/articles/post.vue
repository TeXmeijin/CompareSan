<template lang="pug">
  main.PageArticlePost
    section.Heading
      h1.HeadingHead
        span.HeadingHead__text コンテンツ記事を投稿する
      client-only
        vue-simplemde(
          v-model="content"
          :configs="configs"
        )
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit, Ref } from 'vue-property-decorator'

@Component({})
export default class PageArticlePost extends Vue {
  content: string = ''

  configs: any = {
    spellChecker: false,
    toolbar: [
      {
        name: 'image',
        className: 'md-upload-img fa fa-picture-o',
        action: (el) => {
          const self = this as any
          // add custom class
          el.classList.add('md-upload-img')
          // append input element
          const inputEle = document.createElement('input')
          inputEle.setAttribute('type', 'file')
          inputEle.setAttribute('multiple', 'true')
          inputEle.setAttribute('accept', 'image/*')
          el.appendChild(inputEle)

          inputEle.onchange = (evt: any) => {
            const imgs = evt.currentTarget.files
            if (imgs.length) {
              const xhr = new window.XMLHttpRequest()
              const formData = new window.FormData()
              for (let i = 0; i < imgs.length; i++) {
                formData.append('upload_img_' + i, imgs[i])
              }
              xhr.open('POST', 'http://localhost:3000/upload', true)
              xhr.onload = (event: any) => {
                if (xhr.status === 200) {
                  const cm = self.codemirror
                  const stat = self.getState()
                  const options = self.options
                  // const res = JSON.parse(event.target.response)
                  // const urls = res.urls
                  const urls = [
                    'https://avatars3.githubusercontent.com/u/7464929?s=460&v=4',
                    'https://avatars3.githubusercontent.com/u/7464929?s=460&v=4',
                  ]

                  urls.forEach((url) => {
                    self.replaceSelection(
                      cm,
                      stat.iamge,
                      options.insertTexts.image,
                      url
                    )
                  })
                } else {
                  console.log('fail')
                }
              }
              xhr.send(formData)
            }
          }
          return el
        },
      },
    ],
  }
}
</script>

<style lang="scss" scoped></style>
