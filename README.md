# 概要
ベターなTwitterログインとFirebaseへのユーザー情報保存機能を持ったWebサイトの構築

個人開発サービスを作るときに応用が効くようなテンプレートを目指して作成

# 技術
Nuxt v2.9.2
TypeScript
Firebase auth, firestore

# set up
ルートディレクトリにenv.development.jsを作成し、下記のような情報を書き込む
env.sample.jsを参照

```
module.exports = {
  APIKEY: "",
  AUTHDOMAIN: "",
  DATABASEURL: "",
  PROJECTID: "",
  STORAGEBUCKET: "",
  MESSAGINGSENDERID: "",
  APPID: ""
}
```
