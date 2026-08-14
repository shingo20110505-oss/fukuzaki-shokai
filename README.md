# フクザキ商会

公式サイトの静的HTML/CSS/JSソース管理リポジトリです。

- Production: https://ayuto.xsrv.jp/
- Blog: https://fukuzakisyoukai.blog.fc2.com/
- Hosting: XServer
- Source/Version control: GitHub

## Deployment notes

Production deployment is performed to XServer over SSH. Test deployments use `/public_html/git-test/`.

Before production cutover, the current `public_html` is archived on the server for rollback safety.
