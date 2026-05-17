# Backend

CakePHP 5 製の My Hometown Guide API です。MySQL の `shops` テーブルから店舗情報を取得し、フロントエンド向けに JSON を返します。

## Stack

- PHP 8.1+
- CakePHP 5.2
- cakephp/migrations 4
- MySQL 8.0
- PHPUnit / PHPCS / PHPStan

## Setup

```bash
composer install
cp config/app_local.example.php config/app_local.php
```

Docker Compose の DB を使う場合は `config/app_local.php` の datasource を次に合わせます。

```php
'host' => 'db',
'username' => 'user',
'password' => 'password',
'database' => 'my_hometown',
```

マイグレーションを実行します。

```bash
bin/cake migrations migrate
```

## Commands

```bash
composer test      # PHPUnit
composer cs-check  # CakePHP coding standard
composer cs-fix    # 自動整形
composer stan      # PHPStan
```

## API

### `GET /api/shops.json`

`src/Controller/Api/ShopsController.php` の `index()` が次の JSON を返します。

```json
{
  "success": true,
  "data": []
}
```

`data` には `Shop` entity の一覧が入ります。フロントエンドとの互換性を保つため、レスポンスのトップレベルキーを変更するときは `frontend/src/App.jsx` も更新してください。

## Main files

| File | Role |
| --- | --- |
| `src/Controller/Api/ShopsController.php` | 店舗一覧 JSON API。 |
| `src/Model/Table/ShopsTable.php` | `shops` validation と Timestamp behavior。 |
| `src/Model/Entity/Shop.php` | shop fields と mass assignment 設定。 |
| `src/Middleware/CorsMiddleware.php` | API 用 CORS headers。 |
| `config/routes.php` | `/api` prefix と `.json` extension routing。 |
| `config/Migrations/` | `shops` table の schema history。 |
| `tests/Fixture/ShopsFixture.php` | shops テストデータ。 |

## Change checklist

店舗フィールドを変更するときは、以下を同じ変更セットで確認してください。

1. migration
2. `Shop` entity PHPDoc / `$_accessible`
3. `ShopsTable` validation
4. fixture / tests
5. frontend display/filter logic
6. `README.md` / `docs/architecture.md` / `.codex/skills` の必要箇所

## Security notes

- `/api/` は CSRF check を skip しています。write API を追加するときは認証・CSRF・CORS の方針を明示してください。
- CORS は現状 `*` です。公開環境では許可 origin の限定を検討してください。
