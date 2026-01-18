# View Transitions の有効化

## 概要

現在コメントアウトされている View Transitions を有効化し、テーマ切り替えがページ遷移後も正常に動作するよう修正します。

## 現状

```astro
<!-- src/layouts/Layout.astro:47-48 --><!-- FIXME: enabling ViewTransitions will not change themes after moving page --><!-- <ViewTransitions /> -->
```

テーマ切り替えスクリプトは `DOMContentLoaded` イベントで初期化されていますが、View Transitions を使用するとページ遷移時に DOM が完全にリロードされないため、テーマ切り替えが動作しなくなります。

## 変更後

### 1. ViewTransitions を有効化

```astro
---
import { ViewTransitions } from "astro:transitions";
---

<head>
  <!-- ... other head content ... -->
  <ViewTransitions />
</head>
```

### 2. テーマ切り替えスクリプトを View Transitions 対応に修正

```astro
<script>
  function initTheme() {
    const themeController = document.querySelector(
      ".theme-controller",
    ) as HTMLInputElement;
    if (themeController) {
      themeController.addEventListener("change", function (e) {
        const target = e.target as HTMLInputElement;
        const isChecked = target.checked;
        const currentTheme = isChecked ? "myLight" : "myDark";

        document.documentElement.setAttribute("data-theme", currentTheme);
        localStorage.setItem("theme", currentTheme);
      });

      // Set initial state based on current theme
      const currentTheme = localStorage.getItem("theme") || "myDark";
      themeController.checked = currentTheme === "myLight";
    }
  }

  // Initialize on first load
  initTheme();

  // Re-initialize after View Transitions navigation
  document.addEventListener("astro:after-swap", initTheme);
</script>
```

### 3. Lenis スムーススクロールも View Transitions 対応に

```astro
<script>
  import Lenis from "lenis";

  function initLenis() {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Initialize on first load
  initLenis();

  // Re-initialize after View Transitions navigation
  document.addEventListener("astro:after-swap", initLenis);
</script>
```

## View Transitions イベント

| イベント                   | 説明                         |
| -------------------------- | ---------------------------- |
| `astro:before-preparation` | ナビゲーション開始時         |
| `astro:after-preparation`  | 新しいページのロード完了時   |
| `astro:before-swap`        | DOM 置換前                   |
| `astro:after-swap`         | DOM 置換後、トランジション前 |
| `astro:page-load`          | ページ読み込み完了時         |

## 代替案：transition:persist の使用

特定の要素をページ遷移間で維持したい場合は `transition:persist` を使用できます：

```astro
<input class="theme-controller" transition:persist />
```

## 影響範囲

- `src/layouts/Layout.astro`
- テーマ切り替え機能
- Lenis スムーススクロール

## 検証方法

1. `pnpm dev` で開発サーバーを起動
2. ページ間を遷移し、View Transitions アニメーションが動作すること
3. ページ遷移後もテーマ切り替えが正常に動作すること
4. スムーススクロールがページ遷移後も動作すること
5. ブラウザの戻る/進むボタンで正常に動作すること

## 参考

- [Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)
- [View Transitions Lifecycle Events](https://docs.astro.build/en/guides/view-transitions/#lifecycle-events)
- [Maintaining State with View Transitions](https://docs.astro.build/en/guides/view-transitions/#maintaining-state)
