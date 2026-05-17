# Frontend

React/Vite 製の My Hometown Guide フロントエンドです。CakePHP API から店舗一覧を取得し、地域・ジャンル・お気に入りで絞り込んだカードと Leaflet マップを表示します。

## Stack

- React 19
- Vite 6
- Tailwind CSS 3
- Axios
- Leaflet

## Setup

```bash
npm install
```

API の起点は `VITE_API_URL` で指定します。ローカル API を使う場合は `frontend/.env.local` を作成してください。

```bash
VITE_API_URL=http://localhost:8000
```

## Commands

```bash
npm run dev      # 開発サーバー
npm run lint     # ESLint
npm run build    # 本番ビルド
npm run preview  # dist のプレビュー
npm run deploy   # gh-pages へ dist を公開
```

## Key files

| File | Role |
| --- | --- |
| `src/App.jsx` | API fetch、フィルター状態、店舗カード、お気に入り UI。 |
| `src/MapView.jsx` | Leaflet map lifecycle、marker、popup、カードへのスクロール連携。 |
| `src/hooks/useFavoriteShops.js` | `localStorage.favoriteShops` でお気に入り ID を永続化。 |
| `vite.config.js` | GitHub Pages 向け `base: '/my-hometown-guid/'`。 |
| `tailwind.config.js` | wedding-themed colors/font settings。 |

## API contract

`src/App.jsx` は次の形式を期待します。

```json
{
  "success": true,
  "data": []
}
```

各 shop の主なフィールドは `id`, `name`, `address`, `description`, `lat`, `lng`, `area`, `genre`, `chosen_by`, `official_url`, `google_map_url`, `open_time`, `end_time` です。

## Implementation notes

- `area` は `morioka`, `kitakami`, `hanamaki` を想定しています。
- `selectedArea` が変わると `selectedGenre` は `all` に戻ります。
- `open_time` / `end_time` は先頭 5 文字を表示するため、`HH:MM` または `HH:MM:SS` の形式にしてください。
- 公開パスを変える場合は `vite.config.js` の `base` と `MapView.jsx` の marker asset path を同時に確認してください。
