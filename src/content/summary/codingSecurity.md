---
heading: coding-security
description: コードを書くときに意識しているセキュリティ項目
draft: false
---

## Reactの場合

## クロスサイトスクリプティング（XSS）

### 対策方法

1. `dangerouslySetInnerHTML`の利用を禁止する。どうしても利用する必要がある場合は、[DOMPurify](https://github.com/cure53/DOMPurify)等を用いてサニタイジングして、[html-react-parser](https://github.com/remarkablemark/html-react-parser)等でパースすることで`dangerouslySetInnerHTML`と同様のことを実現可能。
2. `href`にURLを挿入する場合は、`http(s)`以外受け付けないようサニタイジングを行う。

   ```TypeScript
    const urlObj = new URL(url);
    if (urlObj.protocol === "http:" || urlObj.protocol === "https:") return url;
    throw new Error("Detected url which is not HTTPS");
   ```

3. [Next.js公式ドキュメント](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy#reading-the-nonce)を元にContent Security Policy (CSP)の適用。
   - 注意点: `script`タグを利用する場合は`nonce`の設定を忘れずに行う必要がある。

### 根拠

1. `dangerouslySetInnerHTML`を利用しない場合、ReactがHTMLとして解釈されないようにエスケープしてくれるため。

   > [React公式ドキュメント](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)

2. `href`に`javascript:脆弱性を生むコード`が指定されることは対策されないため手動でサニタイジングをする必要がある。
3. CSPを適用し、許可されていないソースからのスクリプトの読み込みをでき、安全性が高まる。

### 仕組み化

1. [Biome](https://biomejs.dev)や[ESLint](https://eslint.org/)で`dangerouslySetInnerHTML`を利用するとCIが失敗するようにする（デフォルトの設定で有効化済）。
2. 利用規約の策定 + [CodeRabbit](https://coderabbit.ai)等のGPTを利用して検知。
3. ヘッダーに記述する内容をテンプレート化して提供。

## 中間者攻撃・SSLストリッピング・（HTTP通信による）改ざん

### 対策方法

1. `HSTS`を利用 or 443番ポートのみ開放。

   ```bash
   strict-transport-security: max-age=31536000; includeSubdomains; preload
   ```

2. Mixed Contentのブロック（デフォルトでブラウザに搭載）。

### 根拠

1. `HSTS`を利用することで、通信のHTTPS化を強制でき、中間者による改ざんによる悪意あるスクリプトの埋め込みを防止できる。

### 仕組み化

1. ヘッダーに記述する内容をテンプレート化して提供。

## クリックジャッキング

### 対策方法

1. `X-Frame-Options`の設定。必要に応じて`DENY`以外に`SAMEORIGIN`等に変更する。

   ```bash
   X-Frame-Options: DENY
   ```

   あるいは

   ```bash
   Content-Security-Policy: frame-ancestors 'none'
   ```

### 根拠

1. `X-Frame-Options`を設定することで、`iframe`等で埋め込まれることを防止できるため。

### 仕組み化

1. ヘッダーに記述する内容をテンプレート化して提供。

## SQLインジェクション

### 対策方法

1. [Prisma](https://www.prisma.io/)等のORMの機能を利用してデータベースにアクセスし、生のSQLや`$queryRaw`、`$executeRaw`を利用しない。どうしても利用する場合は、個別に調査する。

### 根拠

1. ORMのデフォルト機能として、SQLインジェクションの恐れのあるテキストはエスケープされるため（[Prisma](https://www.prisma.io/)以外のORMの場合念の為確認が必要）。

   > [Prisma公式ドキュメント](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#sql-injection-prevention)

### 仕組み化

1. 利用規約の策定 + [CodeRabbit](https://coderabbit.ai)等のGPTを利用して検知。

## サイドチャネル攻撃（Spectre）

### 対策方法

1. Site isolation（デフォルトでブラウザに搭載）。
2. Cross-Origin Resource Sharing（CORS）（デフォルトでブラウザに搭載）。
3. Cross-Origin Isolation（`SharedArrayBuffer`や`performance.measureMemory()`を利用する場合のみ）（不用意に設定するとWebサイトが動かなくなることがあるため注意が必要））。

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

### 根拠

1. Site isolationでサイト（eTLD+1）単位でプロセスの分離、Cross-Origin Isolationでオリジンごとにプロセスの分離できるため。

### 仕組み化

1. ヘッダーに記述する内容をテンプレート化して提供。

## Refererの脆弱性

### 対策方法

1. `Referrer-Policy`の設定。

   ```bash
   Referrer-Policy: strict-origin-when-cross-origin
   ```

### 根拠

1. `Referrer-Policy`を適切に設定することで、遷移先が外部サイトの場合に`referrer`を送信しなくなる。

### 仕組み化

1. ヘッダーに記述する内容をテンプレート化して提供。

## TODO

- [ ] CSRF (none)
  - [ ] CSRFトークンでフォームの正当性の検証
- [ ] httpOnly属性 (s-tools)

## 参考文献

- フロントエンド開発のためのセキュリティ入門、平野昌士
