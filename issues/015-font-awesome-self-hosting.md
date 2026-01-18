# Font Awesome セルフホスティング

## ステータス: 未着手

## 優先度: 低

## 難易度: 低

## 概要

現在 CDN 経由で読み込んでいる Font Awesome を、セルフホスティングに移行することで外部依存を削減し、パフォーマンスを改善する。

## 現状

```astro
<!-- src/layouts/Layout.astro (135-138行目) -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
  integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

### 問題点

1. **外部依存**: CDN のダウンタイムに影響される
2. **プライバシー**: 外部リソースへのリクエストが発生
3. **キャッシュ制御**: CDN のキャッシュポリシーに依存

## 提案内容

### 1. パッケージのインストール

```bash
pnpm add @fortawesome/fontawesome-free
```

### 2. Layout.astro の変更

```astro
---
// src/layouts/Layout.astro
import "@fortawesome/fontawesome-free/css/all.min.css";
---

<!-- CDN リンクを削除 -->
```

### 3. 最適化（オプション）

使用しているアイコンのみをインポートする場合:

```astro
---
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "@fortawesome/fontawesome-free/css/brands.min.css";
// regular は使用していなければ省略
---
```

## メリット

| 項目           | CDN                    | セルフホスティング   |
| -------------- | ---------------------- | -------------------- |
| 外部依存       | あり                   | なし                 |
| 初回読み込み   | CDN キャッシュ利用可能 | サイトと同一オリジン |
| バージョン管理 | 手動更新               | pnpm で管理          |
| プライバシー   | 外部リクエスト         | 同一オリジン         |

## デメリット

1. **バンドルサイズ増加**: 約 200KB（all.min.css）
2. **更新の手間**: Renovate で自動化可能

## 変更対象ファイル

- `src/layouts/Layout.astro` - CDN リンク削除、import 追加
- `package.json` - @fortawesome/fontawesome-free 追加

## 検証手順

1. `pnpm add @fortawesome/fontawesome-free`
2. `Layout.astro` を更新
3. `pnpm build && pnpm preview`
4. 以下を確認:
   - すべてのアイコンが正常に表示される
   - ネットワークタブで外部 CDN へのリクエストがないこと

## 代替案

### A. 使用アイコンのみ SVG 化

```astro
---
// src/components/Icon.astro
const icons = {
  github: "<svg>...</svg>",
  twitter: "<svg>...</svg>",
};
---

<span set:html={icons[name]} />
```

- 最小限のバンドルサイズ
- 移行コスト: 高

### B. astro-icon の使用

```bash
pnpm add astro-icon
```

```astro
---
import { Icon } from "astro-icon/components";
---

<Icon name="fa6-brands:github" />
```

- Iconify を通じて多数のアイコンセットにアクセス可能
- 移行コスト: 中

## 結論

セルフホスティングへの移行は低コストで外部依存を削減できるため推奨。ただし、現状で問題が発生していなければ優先度は低い。

## 参考

- [Font Awesome - Self Hosting](https://fontawesome.com/docs/web/setup/host-yourself/webfonts)
- [@fortawesome/fontawesome-free](https://www.npmjs.com/package/@fortawesome/fontawesome-free)
- [astro-icon](https://github.com/natemoo-re/astro-icon)
