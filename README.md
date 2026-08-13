# フクザキ商会 公式サイト

フクザキ商会公式サイト `https://ayuto.xsrv.jp/` のソース管理用リポジトリです。

- 本番公開先: XServer / `https://ayuto.xsrv.jp/`
- GitHub Pagesへの本番移行は行いません。
- canonical / OGP / sitemap / robots の本番URLは `ayuto.xsrv.jp` を維持します。
- 静的HTML / CSS / JavaScriptで管理します。
- WordPressは静的サイトのテストと本番切替が完了するまで削除しません。

## 現在の状態

サイト本体をGitHubへ保管し、XServerへの切替準備を進めています。
`.user.ini`、WordPress本体、認証情報、データベースはGitHubに保存しません。

## 主なファイル

- `index.html` — トップページ
- `sales.html` — 販売・中古卓
- `repair.html` — 修理・整備
- `models.html` — 取扱機種
- `works.html` — 実績
- `company.html` — 会社概要
- `faq.html` — よくある質問
- `contact.html` — お問い合わせ
- `privacy.html` — プライバシーポリシー
- `404.html` — 404ページ
- `css/style.css` — デザイン
- `js/main.js` — UI動作
- `images/` — favicon / OGP画像
- `sitemap.xml`, `robots.txt` — SEO関連

## デプロイ

`.github/workflows/deploy-test.yml` はXServerのテスト用ディレクトリへ手動で送るための準備済みワークフローです。
認証情報をRepository Secretsへ設定するまでは実行しません。
詳細は `docs/XSERVER-DEPLOY.md` を参照してください。
