---
heading: code-review
description: コードレビューとチーム開発のMyベストプラクティス集
draft: false
---

## コードレビューで重視していること

### レビュースラング用語

- LGTM
- FYI
- PTAL

### コードレビューにおけるコメントの接頭詞

- must: 修正必須。
- want: 修正推奨。
- nits: 細かな修正。
- imo: 自分はこう思うが、いかがでしょうか?
- ask: 単純にわからないので教えてください。

```md
![must](https://img.shields.io/badge/review-must-red.svg)
![imo](https://img.shields.io/badge/review-imo-orange.svg)
![ask](https://img.shields.io/badge/review-ask-blue.svg)
![nits](https://img.shields.io/badge/review-nits-green.svg)
![suggestion](https://img.shields.io/badge/review-suggestion-blue.svg)
```

[プルリクエストへのコメントでは Text Blaze でラベルバッジをつけよう！](https://qiita.com/iganin/items/aee297eade84849cc9cd)

### コミットメッセージの書き方で参考にできるもの

[Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)

[ロジカルなコミットメッセージの書き方](https://zenn.dev/mi0256/articles/1332e1d041cab4)

### 破壊的変更

ライブラリ作成時に破壊的変更を行う場合、ライブラリを利用しているプロジェクトのCIのビルドが失敗するように設計しなければならない。
ChangeLogの記入のみだと、その破壊的変更に気づかない可能性がある。

### 尋ねるな、命じろ

呼び出し側はメソッドを通じて処理を命ずるのみで、オブジェクトの内部状態やその状態に応じて呼び出し側の判断を行ってはならない。

### 読みやすいコード

[読みやすいコードを書くためのガイドライン](https://zenn.dev/arsaga/articles/ba9ec8c004511c)

### チェック項目

1. 複数の機能がある関数
2. 不要なコードを削除していない
3. 例外処理を行っていない
4. マジックナンバーの使用
5. 組み込み関数に代入
   - `max`等、デフォルトで提供されている関数
6. 境界値での動作
7. オリジナリティのあるコード
   - **揺らぎを減らそう**
8. ネストが深い
9. クラスや関数を使用していない
10. 識別子の命名が雑
    - 動詞で始める
      - x: `securelySendMessage()`
      - o: `sendMessageSecurely()`
11. 実行時間、計算量
12. 適切でないコメント
    - 急いで開発する際に手が及ばなかった
    - 普通の書き方に従わない場合の理由
    - うまくいかなかった方法
13. ミュータブル or イミュータブル
14. 整合性の撮れてない並行、並列処理

[知らないと恥ずかしいコードレビューで指摘されがちなポイント14選](https://qiita.com/ouauai/items/d38eeef9f0af5a4a87da)

### else if より enum and switch

`else if`は抜け落ちが生じてミスが生じやすいから気をつけよう。

[else ifが複数回出てきたら考えること](https://zenn.dev/aldagram_tech/articles/8df77a8edb519c)

## チーム開発のノウハウ

改善デー・やさしさデー

[後回しにされがちな問題を改善するための「改善デー」「やさしさデー」のご紹介](https://tech.layerx.co.jp/entry/2023/12/27/171319)

GitHub通知: 適切に設定しないと、自分にAssignされたコードレビュー等を見逃してしまうよ

[GitHub を使うなら通知くらいまともに設定してくれ](https://zenn.dev/siketyan/articles/you-are-not-using-github-correctly)

READMEやテンプレートについて

[エンジニアが開発しやすい環境作りをする](https://zenn.dev/sutamac/articles/5a262f0096176a)

コードレビューで気をつけること

[google-eng-practices-ja](https://fujiharuka.github.io/google-eng-practices-ja/ja/review/reviewer/standard.html)

コードを色分けして、良いコード、悪いコードの分析

[実践 よくないコードに立ち向かう整理術](https://zenn.dev/suzuki_hoge/books/2022-12-colored-code-e73c0f9c56464c)

GitHubのPRの作成とその後の議論方法

[GitHubのコードレビューを受ける際に気をつける事](https://zenn.dev/keitakn/articles/github-code-review-reviewee)

コードレビューで嫌われる人

[コードレビューで嫌われる人の特徴7選](https://qiita.com/emjo1804/items/48f6e78237a04684ab38)

新人プログラマをコードレビューで殺さない方法

[新人プログラマをレビューで殺さない方法](https://qiita.com/hiraike32/items/32840b11536fa1b78621)

円滑なコミュニケーションを育むための聴く技術

[話を聴く技術](https://speakerdeck.com/kaminashi/listening-skills)

プルリクエストを小さくする技術

[Pull Requestを小さくする戦略](https://agilejourney.uzabase.com/entry/2023/07/31/103000)
