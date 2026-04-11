# コマンドリファレンス

## 開発・ビルド関連

- `pnpm dev` - ローカル開発サーバーを起動（localhost:4321）
- `pnpm build` - 本番用ビルドを実行
- `pnpm preview` - ビルド結果をローカルでプレビュー
- `pnpm check` - Astroの型チェックを実行
- `pnpm tsc` - TypeScriptの型チェック（noEmit）

## リンティング・フォーマット関連

- `pnpm lint` - ESLintでコードチェック
- `pnpm lint:fix` - ESLintで自動修正
- `pnpm fmt` - Prettierでフォーマットチェック
- `pnpm fmt:fix` - Prettierで自動フォーマット
- `pnpm lint:css` - Stylelintでスタイルチェック
- `pnpm lint:css:fix` - Stylelintで自動修正
- `pnpm lint:mark` - markdownlint-cli2でマークダウンチェック
- `pnpm lint:mark:fix` - markdownlint-cli2で自動修正
- `pnpm lint:secret` - secretlintでシークレット情報チェック

## テスト・品質チェック

- `pnpm snapshots` - Playwrightでビジュアルリグレッションテスト
- `pnpm snapshots:update` - スナップショットの更新
- `pnpm security` - pnpm auditでセキュリティチェック

## データ生成・更新

- `pnpm generate:book` - 書籍データの生成（Google Books APIを使用）
- `pnpm generate:photo` - 写真パスの生成
- `pnpm license:summary` - ライセンス一覧の生成
- `pnpm license:json` - ライセンスJSONの生成
