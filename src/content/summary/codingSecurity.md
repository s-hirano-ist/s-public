---
heading: coding-security
description: コードを書くときに意識しているセキュリティ項目
draft: false
---

## Reactの場合

## XSS

### 対策

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

## SQLインジェクション

### 対策

1. [Prisma](https://www.prisma.io/)等のORMの機能を利用してデータベースにアクセスし、生のSQLや`$queryRaw`、`$executeRaw`を利用しない。どうしても利用する場合は、個別に調査する。

### 根拠

1. ORMのデフォルト機能として、SQLインジェクションの恐れのあるテキストはエスケープされるため（[Prisma](https://www.prisma.io/)以外のORMの場合念の為確認が必要）。

   > [Prisma公式ドキュメント](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#sql-injection-prevention)

### 仕組み化

1. 利用規約の策定 + [CodeRabbit](https://coderabbit.ai)等のGPTを利用して検知。

## CSRF

## 参考文献

- フロントエンド開発のためのセキュリティ入門、平野昌士
