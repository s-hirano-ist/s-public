---
heading: coding-security
description: コードを書くときに意識しているセキュリティ項目
draft: false
---

## Next.js・Reactで行うべきセキュリティの対策

フロントエンド開発を行うに当たり最低限行うべき対策について説明する。

※ 下記を満たすことで脆弱性がなくなるわけではないことには注意せよ。また、以下の対策が難しい場合には、寄り入念な柔軟な対策を検討するべきである。

### クロスサイトスクリプティング（XSS）

<details>
<summary>用語説明</summary>

- XSS: リクエストに含まれる文字列をそのままHTMLへ挿入すると、意図せぬJavaScriptが実行される恐れがある。

  - 反射型XSS: 罠サイト経由でアクセスした際、URLのパラメータ等に悪意あるコードを埋め込まれ、SSRでレンダリングされたHTMLから実行される。
  - 蓄積型XSS: 攻撃者が投稿したフォームを他のユーザーが閲覧時に実行される。
  - DOM-based XSS: DOMツリーを書き換える系の操作で悪意あるスクリプトを挿入。クライアントサイドで起こるため、検知が難しい。対策として、DOM操作用の関数を利用する。

    ```JavaScript
    li.textContent = name;
    ```

  - ソース（原因）

    - location.hash
    - location.search
    - location.href
    - document.referrer
    - postMessage
    - Webストレージ
    - IndexedDB

  - シンク（実行箇所）
    - innerHTML
    - eval
    - location.href
    - document.write
    - jQuery()

- CSP: 許可されていないJavaScriptの実行やリソースの読み込みをブロック。metaタグに埋め込み or レスポンスヘッダーに付与することで適用される。

  - base-uri: baseURLを変更されないようにする。
  - object-src: Flash等のプラグインに対する制限を付与。
  - trusted types: 文字列を安全な型として扱う。DOMPurifyで検査可能。
  - Strict CSP: CSPを適用させると、HTML内にインラインJavaScriptは禁止される。回避方法として、`unsafe-inline`を使うのではなく、`nonce-source`や`hash-source`を利用すると安全にインライン記述ができる。
    - `nonce-source`: script要素に指定したランダムなトークンがCSPヘッダーに指定されたものと同一でないとエラーを吐くもの。
    - `script-source`: script要素のhash値を計算し、それをCSPヘッダーに指定して、同一でないとエラーを吐くもの。
    - `strict-dynamic`: 上記を指定しても許可されないscript要素の作成が必要な場合に利用。※ `innerHTML`や`document.write`は機能しない。

</details>

#### 対策方法

1. `dangerouslySetInnerHTML`の利用を禁止する。どうしても利用する必要がある場合は、[DOMPurify](https://github.com/cure53/DOMPurify)等を用いてサニタイジングして、[html-react-parser](https://github.com/remarkablemark/html-react-parser)等でパースすることで`dangerouslySetInnerHTML`の利用を回避する。
2. `href`にURLを挿入する場合は、`http(s)`以外受け付けないようサニタイジングを行う。

   ```TypeScript
    const urlObj = new URL(url);
    if (urlObj.protocol === "http:" || urlObj.protocol === "https:") return url;
    throw new Error("Detected an href which is not a http(s) request.");
   ```

3. [Next.js公式ドキュメント](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy#reading-the-nonce)を元にContent Security Policy (CSP)の適用。

   - 注意点: `script`タグを利用する場合は`nonce`の設定を忘れずに行う必要がある（通常パッケージマネージャーによってライブラリの導入を行うため、使う場面は限られる）。
   - `Trusted Types`はReactの実装内で類似のことがなされるため不要。

4. HTTPのレスポンスヘッダの「Content-Type」フィールドに明示的にcharset=UTF-8を指定。

   - ブラウザに搭載されている文字コード判定を悪用して悪意あるコードの実行が可能なため。

   > 例: UTF-7の悪用 等

#### 根拠

1. `dangerouslySetInnerHTML`を利用しない場合、ReactがHTMLとして解釈されないようにエスケープしてくれるため。

   > [React公式ドキュメント](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)

2. `href`に`javascript:脆弱性を生むコード`が指定されることは対策されないため手動でサニタイジングをする必要がある（2024年9月現在）。
3. CSPを用いることで許可されていないソースからのスクリプトの読み込みを制限でき、安全性が高まる。

#### 仕組み化

1. [Biome](https://biomejs.dev)や[ESLint](https://eslint.org/)で`dangerouslySetInnerHTML`を利用するとCIが失敗するようにする（デフォルトの設定で有効化済）。
2. 利用規約の策定 + [CodeRabbit](https://coderabbit.ai)等のGPTを利用して検知。
3. ヘッダーに記述する内容をテンプレート化して提供。

### クロスサイトリクエストフォージェリ（CSRF）

<details>
<summary>用語説明</summary>

- CSRF: 攻撃者の罠によってWebアプリケーションの持っている機能がユーザーの意思と関係なく実行されてしまうこと。formから送信されるリクエストは同一オリジンポリシーで制限されないため生じる。
- Double submit cookie: HttpOnly属性のついていないCSRF対策専用のCookieをformを送るときに、headerに入れる。同一のtokenがformにも入れてあればOK。HttpOnly属性がついていなくても、異なるドメインからはCookieにアクセスできないため対策になる。

</details>

#### 対策方法

1. Next.js v14.0以上を利用することで基本的な対策はされている。ただし、Custom Route Handlers（`route.tsx`）を利用する場合は下記対策が必要になる。

<details>
<summary>基本的に不要な対策</summary>

1. バックエンドサーバーで`origin`ヘッダーを検証。
2. SameSite Cookieを設定し、クロスサイトサイトへCookieを付与しない。
3. formのPOST等で`CSRF_TOKEN`を使い、フォームの正当性の検証。
4. Double submit cookieを利用し、フォームの正当性を検証。

   ```bash
   Set-Cookie: session=123456789abcdef; httpOnly; Secure; SameSite=Lax;
   ```

5. `X-Requested-With`等の（CORS安全とされるリクエストヘッダー以外の）任意のヘッダーを付与して、そのヘッダーがリクエストに含まれているか検証。
   - 注意点: プリフライトリクエスト内でチェックするため、リクエスト回数が増える。他の方法がない場合に利用。

</details>

#### 根拠

1. Next.jsのv14.0以上では`Origin`ヘッダーの検証が自動で行われる。
2. SameSite Cookieは最新版のChrome等のブラウザでデフォルト搭載されている。

#### 仕組み化

1. 利用規約の策定 + [CodeRabbit](https://coderabbit.ai)等のGPTを利用して検知。

### 中間者攻撃・SSLストリッピング・（HTTP通信起因の）改ざん

<details>
<summary>用語説明</summary>

- HSTS: HTTPで初回通信しても、次からはHTTPS通信を強制する。
  - max-age: HTTPS通信を行う有効期限。
  - includeSubdomains: サブドメインに対してもHTTPSを強制するか。
  - preload: HTTPS preloadに登録されているドメインか確認して、初回からHTTPS通信を強制する。
- サブリソース完全性: 読み込むリソースの内容のハッシュ値のbase64エンコードされたものをintegrity属性に指定することで改ざんを検知する仕組み。

</details>

#### 対策方法

1. `HSTS`を利用 or 443番ポートのみ開放。

   ```bash
   strict-transport-security: max-age=31536000; includeSubdomains; preload
   ```

<details>
<summary>基本的に不要な対策</summary>

1. Mixed Contentのブロック。
2. サブリソース完全性の利用。

</details>

#### 根拠

1. `HSTS`を利用することで、通信のHTTPS化を強制でき、中間者による改ざんによって生じる悪意あるスクリプトの埋め込みを防止できる。
2. Mixed Contentのブロックはブラウザでデフォルト搭載。
3. ビルド時に`npm`からパッケージをインポートし、scriptタグによる読み込みをしなければ問題なし。ライブラリの脆弱性検知ツールによる対応で十分。

#### 仕組み化

1. ヘッダーに記述する内容をテンプレート化して提供。
2. [hstspreload.org](https://hstspreload.org/)をチェックすることで設定を確認。

### クリックジャッキング

<details>
<summary>用語説明</summary>

- クリックジャッキング: iframeで透明なボタンを配置して、ユーザーの操作を促す。

</details>

#### 対策方法

1. `X-Frame-Options`の設定。必要に応じて`DENY`以外に`SAMEORIGIN`等に変更する。

   ```bash
   X-Frame-Options: DENY
   ```

   あるいは

   ```bash
   Content-Security-Policy: frame-ancestors 'none'
   ```

#### 根拠

1. `X-Frame-Options`を設定することで、`iframe`等で埋め込まれることを防止できるため。

#### 仕組み化

1. ヘッダーに記述する内容をテンプレート化して提供。

### SQLインジェクション

#### 対策方法

1. [Prisma](https://www.prisma.io/)等のORMの機能を利用してデータベースにアクセスし、生のSQLや`$queryRaw`、`$executeRaw`を利用しない。どうしても利用する場合は、個別に調査して無害化する。
2. [TypedSQL](https://www.prisma.io/blog/announcing-typedsql-make-your-raw-sql-queries-type-safe-with-prisma-orm)の利用。

#### 根拠

1. ORMのデフォルト機能として、SQLインジェクションの恐れのあるテキストはエスケープされるため（[Prisma](https://www.prisma.io/)以外のORMの場合念の為確認が必要）。

   > [Prisma公式ドキュメント](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#sql-injection-prevention)

#### 仕組み化

1. 利用規約の策定 + [CodeRabbit](https://coderabbit.ai)等のGPTを利用して検知。

### サイドチャネル攻撃（Spectre）

<details>
<summary>用語説明</summary>

- CORS: ブラウザ上で異なるオリジン間の安全なリソース共有を可能にする仕組み。HTTPヘッダにOriginや Access-Control-Allow-Originなどを使用して動作させる。
  - 注意点: Originヘッダの値をそのままAccess-Control-Allow-Originヘッダに設定するとすべてのオリジンを許可していることと同一なため使用不可。
- サイドチャネル攻撃: CPU・メモリ等、ハードウェアの特性を悪用した攻撃。
  - 例: Spectre: 高精度なタイマーを使い、徐々にメモリ内の内容を推測するもの。
- CORP: ヘッダが指定されたリソースの読み込みを同一オリジンまたは同一サイトに制限可能。
- COEP: すべてのリソースに対して、CORP or CORSヘッダを設定することを強制。
- COOP: a要素やwindow.open関数で開いたクロスオリジンのページからのアクセスを制限可能。

</details>

#### 対策方法

1. `SharedArrayBuffer`や`performance.measureMemory()`を利用しない。
2. Cross-Origin Isolation（`SharedArrayBuffer`や`performance.measureMemory()`を利用する場合のみ）（不用意に設定するとWebサイトが動かなくなることがあるため注意が必要））。

   1. Cross-Origin Resource Policy（CORP）

      ```bash
      Cross-Origin-Resource-Policy: same-origin
      ```

   2. Cross-Origin Embedder Policy（COEP）

      ```bash
      Cross-Origin-Embedder-Policy: require-corp
      ```

   3. Cross-Origin Opener Policy（COOP）

      ```bash
      Cross-Origin-Opener-Policy: same-origin
      ```

      - 注意点: 決済やソーシャルログイン等を利用している場合はブロックされるので`same-origin-allow-popups`を指定する。

<details>
<summary>基本的に不要な対策</summary>

1. Site isolation。
2. Cross-Origin Resource Sharing（CORS）

</details>

#### 根拠

1. Site isolationでサイト（eTLD+1）単位でプロセスの分離、Cross-Origin Isolationでオリジンごとにプロセスの分離できるため。
2. Site isolation・CORSの仕組みはデフォルトでブラウザに搭載されている。

#### 仕組み化

1. ヘッダーに記述する内容をテンプレート化して提供。

### Referrerの脆弱性

#### 対策方法

1. `Referrer-Policy`の設定。

   ```bash
   Referrer-Policy: strict-origin-when-cross-origin
   ```

#### 根拠

1. `Referrer-Policy`を適切に設定することで、遷移先が外部サイトの場合に`referrer`を送信しなくなる。

#### 仕組み化

1. ヘッダーに記述する内容をテンプレート化して提供。

### 認証情報・サーバーサイドのロジックの漏洩

#### 対策方法

1. httpOnly属性の付与 or Cookieによる認証をしない（bearer token等の利用）。
2. `import 'server-only';`の利用によるサーバーサイドのロジックの明示的な分離。
3. 本番環境では本番モードで起動する。
4. ブラウザから見えてもいい環境変数以外の名称に`NEXT_PUBLIC_`接頭詞をつけない。

#### 根拠

1. `httpOnly`属性を付与することで、JavaScriptからCookieにアクセスできないようにできる。ページ遷移時やフォーム送信時等のリクエストにおいて、ブラウザはCookieを自動的にサーバへ送信するため、対策が必要。
2. Client Componentは開発者ツールから内部のコードが見れてしまう。`import 'server-only';`を付与することで、サーバーサイドからしかコードが実行されなくなる。
3. 本番モードでは、Reactはエラーや拒否されたプロミスをクライアントに送信しないため、エラーハンドルの実装により機密情報が漏洩することは対策済み。
4. `NEXT_PUBLIC`接頭詞をつけない環境変数をクライアントサイドから読み込むとエラーになるため、機密情報がクライアントサイドに流出することは対策可能。

#### 仕組み化

1. 利用規約の策定 + [CodeRabbit](https://coderabbit.ai)等のGPTを利用して検知。

### オープンリダイレクト

#### 対策方法

1. リダイレクト設定を記述する場合は、特定のURLのみリダイレクトが可能なようにバリデーションを行う。

#### 根拠

1. リダイレクト先の設定でバリデーションを行うと、悪意あるリダイレクト先は排除できる。

#### 仕組み化

1. 利用規約の策定 + [CodeRabbit](https://coderabbit.ai)等のGPTを利用して検知。

### その他基本的に不要な対策や技術

1. Sanitize API: 同様のことをDompurifyやReactのデフォルトの機能でできるため不要とする。

### チェックリスト

- [ ] データアクセス層：独立したデータアクセス層の確立された慣行があるかどうか要確認。データベースパッケージや環境変数がデータアクセス層の外でインポートされていないことを要確認。
- [ ] "use client"ファイル：コンポーネントのpropsにプライベートデータを期待していないか？型のシグネチャが過度に広範ではないか？
- [ ] "use server"ファイル：アクションの引数がアクション内、またはデータアクセス層内で検証されているか？アクション内でユーザーが再認証されているか？
- [ ] `/[param]/`：角括弧が付いているフォルダはユーザー入力を表す。パラメータが検証されているか？
- [ ] `middleware.tsx`および`route.tsx`：従来の技術を使って要追加の監査。定期的にペネトレーションテストや脆弱性スキャンを実施するか、チームのソフトウェア開発ライフサイクルに従って実施。
- [ ] Server ActionsのPropsにユーザーに操作されたくない引数を入れてないか（userIdはsessionから取得する等の方法を取る必要がある）。
- [ ] `layout`で認証チェックをしていないか。`middleware`、`page`、`server actions`で行うべきである。

### その他

- OSコマンドインジェクション
- パス名パラメータの未チェック・ディレクトリトラバーサル
- セッション管理
- HTTPヘッダインジェクション: 直接ヘッダをいじらず、ヘッダ出力用のAPIを利用することで、意図せぬヘッダの書き換えが行われないようにする。
- メールヘッダインジェクション: メールヘッダを固定できない場合には、メール送信用のAPIを利用して意図せぬヘッダの書き換えが行われないようにする。
- バッファオーバーフロー: 直接メモリを操作できるプログラミング言語の利用によって発生しうる。脆弱性のあるライブラリを利用しないことに注意が必要である。

#### アンチパターン

- セッションIDをURLパラメータに格納しない
  - Referrer送信機能によりセッションIDが外部サイトに送信させるため。

### ライブラリの脆弱性自動検知ツール

- [audit](https://docs.npmjs.com/cli/v10/commands/npm-audit)
- [Dependabotアラート](https://docs.github.com/ja/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)
- [Snyk](https://go.snyk.io/jp.html)
- [yamori](https://yamory.io/)

## 参考文献

- [フロントエンド開発のためのセキュリティ入門、平野昌士](https://www.shoeisha.co.jp/book/detail/9784798169477)
- [安全なウェブサイトの作り方](https://www.ipa.go.jp/security/vuln/websecurity/about.html)
- [How to Think About Security in Next.js](https://nextjs.org/blog/security-nextjs-server-components-actions>)
- [知らないとあぶない、Next.js セキュリティばなし](https://zenn.dev/moozaru/articles/d270bbc476758e)
