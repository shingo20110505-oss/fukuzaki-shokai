# XServer deployment plan

Production URL remains `https://ayuto.xsrv.jp/`.

## Safety policy

1. Do not delete WordPress until the static site is verified.
2. Take an XServer web + database backup before switching.
3. First upload the static site to a test directory under the same domain.
4. Check desktop/mobile navigation, phone links, images, 404 page and SEO files.
5. Only after verification, switch the production document root contents.
6. Keep the WordPress backup until the static site has been stable for a while.

## GitHub Actions secrets required later

The manual test-deploy workflow expects these repository secrets:

- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_REMOTE_DIR`

`FTP_REMOTE_DIR` must initially point to a test directory whose path contains `git-test`, not the production root.
Do not put passwords, server credentials or `.user.ini` in this repository.

## Current deployment mode

The included workflow is manual (`workflow_dispatch`) only. It does not deploy on push.
Automatic production deployment should only be enabled after a successful test deployment.
