# System map

- React fetches `${import.meta.env.VITE_API_URL}/api/shops.json` once in `App.jsx`.
- API returns `{ success: true, data: shops }` from CakePHP `Api/ShopsController::index()`.
- Client filters by `area`, `genre`, and local favorites.
- Favorite shop IDs are stored in `localStorage.favoriteShops`.
- Leaflet markers are recreated whenever filtered shops change.
- Current areas: `morioka`, `kitakami`, `hanamaki`.
- Current chooser labels: `groom`, `bride`, `both`.
