# My Hometown Guide

盛岡・北上・花巻のおすすめスポットを、結婚式ゲスト向けに紹介する地図付きガイドです。React/Vite のフロントエンドと CakePHP 5 の JSON API を組み合わせ、店舗情報をカード・フィルター・Leaflet マップで表示します。

## 目的

- 結婚式の前後に立ち寄れる思い出の場所・飲食店・観光スポットをゲストへ案内する。
- 地域（盛岡・北上・花巻）とジャンルで候補を絞り込み、地図上の位置と詳細カードを行き来できるようにする。
- お気に入りをブラウザの `localStorage` に保存し、ゲストごとに行きたい場所を控えられるようにする。

## 技術スタック

| レイヤー | 技術 | 主な役割 |
| --- | --- | --- |
| Frontend | React 19 / Vite 6 / Tailwind CSS / Leaflet | UI、絞り込み、お気に入り、地図表示 |
| Backend | CakePHP 5 / PHP 8.1 | 店舗 JSON API、DB アクセス、CORS |
| Database | MySQL 8.0 | `shops` テーブルの永続化 |
| Local runtime | Docker Compose | フロント・バックエンド・DB の起動 |
| Deploy target | GitHub Pages（frontend）/ PHP 実行環境（backend） | 公開環境 |

## ディレクトリ構成

```text
.
├── frontend/                 # React/Vite アプリ
│   ├── src/App.jsx           # 画面全体、API取得、フィルター、カード表示
│   ├── src/MapView.jsx       # Leaflet マップとマーカー制御
│   └── src/hooks/            # React hooks（お気に入り管理など）
├── backend/                  # CakePHP 5 API
│   ├── src/Controller/Api/   # JSON API コントローラ
│   ├── src/Model/            # Shops テーブル/エンティティ
│   ├── config/Migrations/    # shops スキーマ履歴
│   └── tests/                # PHPUnit テスト
├── docs/                     # アーキテクチャ・運用ドキュメント
├── .codex/skills/            # AI エージェント向け作業スキル
└── docker-compose.yml        # ローカル開発用サービス定義
```

## 主な機能

- 地域フィルター: `morioka` / `kitakami` / `hanamaki` を切り替える。
- ジャンルフィルター: 選択中の地域に存在するジャンルだけを表示する。
- お気に入り: ハートボタンで店舗 ID を `favoriteShops` として `localStorage` に保存する。
- 地図連携: 店舗カード選択で該当マーカーへズームし、マーカーのポップアップからカードへスクロールする。
- 店舗補足情報: コメント、公式 URL、Google Map URL、価格帯、駅からの徒歩時間、営業時間、画像を表示する。

## ローカル起動

### 1. 環境変数・設定

バックエンドのローカル設定を作成します。

```bash
cp backend/config/app_local.example.php backend/config/app_local.php
```

Docker Compose の MySQL を使う場合は、`backend/config/app_local.php` の `Datasources.default` を次の値に合わせてください。

```php
'host' => 'db',
'username' => 'user',
'password' => 'password',
'database' => 'my_hometown',
```

フロントエンドは API の起点を `VITE_API_URL` で参照します。必要に応じて `frontend/.env.local` を作成してください。

```bash
VITE_API_URL=http://localhost:8000
```

### 2. Docker Compose で起動

```bash
docker compose up --build
```

- Frontend: <http://localhost:5173/my-hometown-guid/>
- Backend API: <http://localhost:8000/api/shops.json>
- MySQL: `localhost:3306`

### 3. DB マイグレーション

バックエンドコンテナ内で migrations を実行します。

```bash
docker compose exec app bin/cake migrations migrate
```

必要に応じて `shops` テーブルへ店舗データを投入してください。スキーマの詳細は [`docs/architecture.md`](docs/architecture.md) を参照してください。

## 開発コマンド

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run lint
npm run build
```

### Backend

```bash
cd backend
composer install
composer test
composer cs-check
composer stan
```

## API 概要

### `GET /api/shops.json`

CakePHP の `Api/ShopsController::index()` が店舗一覧を JSON で返します。

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "店舗名",
      "address": "住所",
      "description": "紹介文",
      "lat": "39.7036000",
      "lng": "141.1527000",
      "area": "morioka",
      "genre": "カフェ",
      "chosen_by": "both"
    }
  ]
}
```

フロントエンドは `data` 配列をそのまま状態として保持します。API 項目を追加・変更するときは、DB migration、`Shop` entity、`ShopsTable` validation、フロントエンド表示をセットで確認してください。

## AI エージェント向けメンテナンス

このリポジトリには、AI で安全に保守するためのスキルを追加しています。

- `.codex/skills/hometown-guide-maintenance/`: フロントエンド・バックエンドを横断する実装/調査フロー。
- `.codex/skills/shop-data-curation/`: `shops` データの追加・更新・レビュー時の確認観点。

AI に依頼するときは、次のような依頼文にすると意図が伝わりやすくなります。

```text
hometown-guide-maintenance スキルを使って、店舗カードに定休日表示を追加してください。
shop-data-curation スキルを使って、盛岡のカフェデータを追加する migration を作ってください。
```

## アーキテクチャ資料

詳細は [`docs/architecture.md`](docs/architecture.md) を参照してください。データフロー、主要コンポーネント、スキーマ、運用時の注意点をまとめています。

## リリース・運用メモ

- `frontend/vite.config.js` の `base` は `/my-hometown-guid/` です。GitHub Pages 以外へ配信するときは公開パスに合わせて変更してください。
- Leaflet の marker assets は `/my-hometown-guid/marker-icon.png` などを参照します。公開パスを変える場合は `frontend/src/MapView.jsx` も確認してください。
- CORS は現状 `*` 許可です。公開 API として制限したい場合は `backend/src/Middleware/CorsMiddleware.php` を環境別に調整してください。
- API は全店舗を一括取得します。店舗数が増えた場合はバックエンド側のページネーションや地域/ジャンルクエリを検討してください。
