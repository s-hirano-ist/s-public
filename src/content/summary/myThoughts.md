---
heading: my-thoughts
description: コーディングに対しての自分自身の考え
draft: false
---

## 負債をため込まないために重視していること

### Auto generate

#### Types

型安全にバックエンドサーバ、Databaseにアクセスすることで、実際にコードを動かす前に、型チェックで明らかなエラーを検知できる。
また、SQLインジェクション等のセキュリティ対策も同時に行うライブラリもあり、セキュリティの担保にもなる場合がある。

例

ORM

- [Prisma](https://www.prisma.io/), [TypeORM](https://typeorm.io/): Databaseのテーブル定義からTypeScript型定義を自動作成。SQL文を書く必要がなくなり、型安全にDatabaseにアクセスできる。また、テーブル定義からDatabaseのテーブルを作成ができ、DBの設定、マイグレーションも自動で行える。

GraphQL codegenerator

- [GraphQL Code Generator](https://graphql-code-generator.com/): GraphQLのQuery/Mutation/Subscriptionの型定義を自動作成。型安全にGraphQLサーバにアクセスできる。

#### Documentation

自動でドキュメントを生成できるようにする。
CIと連携して、常にAPIのドキュメントが最新の状態であることが担保できる。

ドキュメントを挟まないことで、ドキュメントの更新忘れによる不整合を防ぐ。

例

REST API(Open API)

- [tsoa](https://github.com/lukeautry/tsoa)+[Swagger UI](https://swagger.io/tools/swagger-ui/): tsoaを利用し、ExpressのControllerからSwagger UIのドキュメントを自動生成し、Swagger UIで確認可能。

GraphQL

- [Apollo Sandbox](https://www.apollographql.com/docs/graphos/explorer/sandbox/): 動いているGraphQLサーバにpost可能なQuery/Mutationのドキュメントを確認可能。

### CI

コードの体裁を守ることによって品質管理がしやすくなる。

また、パッケージのアップデートに伴う不具合をある程度未然に防ぐことができる。

- formatter
  - [prettier](https://prettier.io/)
- linter
  - [ESLint](https://eslint.org/)
  - [stylelint](https://stylelint.io/)
  - [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2)
- test
  - [Playwright Test](https://playwright.dev/docs/test-intro)
  - [Jest](https://jestjs.io/)
  - [Vitest](https://vitest.dev/)

### CD

Github/GitlabのMainブランチへのマージや、タグの付与をトリガーに自動デプロイを行うことで、コードと環境のコードの不整合を防ぐ。

- Vercel bot: Vercelへのデプロイを自動化。
- Render bot: Renderへのデプロイを自動化。
- AWS CDK: AWSのリソースをコードベースで管理し、差分を自動デプロイ。

### Container service

開発環境にdocker composeを利用することで、開発環境を即時に作成できる。

また、フルマネージなコンテナサービス（AWS Elastic Container Service等）を利用することで、容易にk8sのようにコンテナの管理を自動化できる。

### Update and Security alerts

常に最新の状態のライブラリを使うことで、脆弱性を防いだり、メンテナンスがしやすくなる。

- Renovate: 定期的にパッケージのアップデートのPRを自動作成。
- Dependabot alerts: 脆弱性を自動で検知し、パッケージのアップデートのPRを自動作成。

### Git

- [Husky](https://typicode.github.io/husky/): コミット前にlinterを実行し、コードの品質を担保する。
- Squash Commit by default: Pull Requestをマージする際に、コミットをsquashすることで、コミット履歴をきれいに保つ。

## コードレビューで重視していること

### コードレビューにおけるコメントの接頭詞

- must: 修正必須。
- want: 修正推奨。
- nits: 細かな修正。
- imo: 自分はこう思うが、いかがでしょうか?
- ask: 単純にわからないので教えてください。

### コミットメッセージの書き方で参考にできるもの

[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)

[ロジカルなコミットメッセージの書き方](https://zenn.dev/mi0256/articles/1332e1d041cab4)

### 破壊的変更

ライブラリ作成時に破壊的変更を行う場合、ライブラリを利用しているプロジェクトのCIのビルドが失敗するように設計しなければならない。
ChangeLogの記入のみだと、その破壊的変更に気づかない可能性がある。

## 質問/学習時重視していること

### 質問フォーマット

- 今発生していること
- 解決したいこと
- 調べたこと・考えてた仮説

### 公式ドキュメントのすゝめ

なぜ推奨されるのか? 一人前になるためには必須事項。適切な実装（セキュリティ、実行速度等）や迅速なディバッグを行うためには必須事項。

[私たちはどうして公式ドキュメントが読めないのか？](https://qiita.com/hiraike32/items/f0a211cceb0ecc516b6c)

[公式ドキュメントを攻略するための手引き](https://zenn.dev/nameless_sn/articles/how_to_read_official_documents)

### プログラマの三大美徳

- 怠惰
- 短気
- 傲慢

[プログラマーのための原則](https://qiita.com/yokarikeri/items/cbdef66fca460253cc7f)