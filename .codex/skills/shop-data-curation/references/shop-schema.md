# Shop schema reference

Expected `shops` fields:

- Required: `id`, `name`, `address`, `description`, `lat`, `lng`, `created`, `modified`.
- Optional display/filter fields: `area`, `comment`, `official_url`, `genre`, `price_range`, `walk_minutes_from_station`, `image_url`, `chosen_by`, `google_map_url`, `open_time`, `end_time`.

Frontend assumptions:

- `area` values drive the area dropdown and map center.
- `genre` values are dynamically collected for the selected area.
- `chosen_by` maps to Japanese labels in `App.jsx`.
- `open_time` and `end_time` are displayed by slicing the first five characters.
- `id` is used for React keys, DOM IDs (`shop-card-{id}`), marker lookup, and favorites.
