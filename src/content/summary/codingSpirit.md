---
heading: coding-spirit
description: より良いコードを書くための心構え
draft: true
---

## つよつよエンジニアになるために

1. 非機能要件が考慮されている。
2. プログラミングの原理原則が守られている。
3. レポジトリ内に無駄なコードがない（`.DS_Store`等）。
4. CI/CD pipelineが初期から整備されている。
5. テストコードが（高確率で）存在する。

> https://qiita.com/lazy-kz/items/727299cae893ab3442a0

### プログラマの三大美徳

- 怠惰
- 短気
- 傲慢

> https://qiita.com/yokarikeri/items/cbdef66fca460253cc7f

### 公式ドキュメントのすゝめ

なぜ推奨されるのか? 一人前になるためには必須事項。適切な実装（セキュリティ、実行速度等）や迅速なディバッグを行うためには必須事項。

> https://qiita.com/hiraike32/items/f0a211cceb0ecc516b6c
>
> https://zenn.dev/nameless_sn/articles/how_to_read_official_documents

### 質問 フォーマット

- 今発生していること
- 解決したいこと
- 調べたこと・考えてた仮説

### 尋ねるな、命じろ

呼び出し側はメソッドを通じて処理を命ずるのみで、オブジェクトの内部状態やその状態に応じて呼び出し側の判断を行ってはならない。

### 読みやすいコード

> https://zenn.dev/arsaga/articles/ba9ec8c004511c

## チーム開発のノウハウ

GitHub通知: 適切に設定しないと、自分に Assign されたコードレビュー等を見逃してしまうよ

> https://zenn.dev/siketyan/articles/you-are-not-using-github-correctly

README やテンプレートについて

> https://zenn.dev/sutamac/articles/5a262f0096176a

コードレビューで気をつけること google-eng-practices-ja

> https://fujiharuka.github.io/google-eng-practices-ja/ja/review/reviewer/standard.html

コードを色分けして、良いコード、悪いコードの分析

> https://zenn.dev/suzuki_hoge/books/2022-12-colored-code-e73c0f9c56464c

GitHub の PR の作成とその後の議論方法

> https://zenn.dev/keitakn/articles/github-code-review-reviewee

コードレビューで嫌われる人

> https://qiita.com/emjo1804/items/48f6e78237a04684ab38

新人プログラマをコードレビューで殺さない方法

> https://qiita.com/hiraike32/items/32840b11536fa1b78621

気をつけるべきところ

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
13. ミュータブル or 位ミュータブル
14. 整合性の撮れてない並行、並列処理

> https://qiita.com/ouauai/items/d38eeef9f0af5a4a87da

### コミットメッセージの指針

conventional commits

> https://www.conventionalcommits.org/ja/v1.0.0/

我流な流行的なもの

> https://zenn.dev/mi0256/articles/1332e1d041cab4

### レビュー単語

- must: 修正必須
- want: 修正推奨
- nits: 修正必須。本筋とは関係ない nitpick
- imo: 修正しない場合、説明必要。in my opinion
- ask: 詳細説明願う
- LGTM
- FYI
- PTAL
