---
name: shop-data-curation
description: Use this skill when adding, reviewing, or changing shop records, shop fields, migrations, seed data, fixtures, or data-quality rules for My Hometown Guide.
---

# Shop Data Curation

Use this skill for changes that affect shop data or the `shops` schema.

## Data quality rules

- `area` should be one of `morioka`, `kitakami`, or `hanamaki` unless the product scope changes.
- `chosen_by` should be `groom`, `bride`, or `both`.
- `lat` and `lng` must be valid coordinates and precise enough for map markers.
- `open_time` and `end_time` should use `HH:MM` or `HH:MM:SS` consistently with the UI slicing behavior.
- External links should be full HTTPS URLs where possible.
- Guest-facing `description` and `comment` should avoid private information and be understandable without wedding-party context.

## Schema/data change workflow

1. Read `references/shop-schema.md`.
2. Update CakePHP migration(s) and schema dump only if the project convention requires it.
3. Update `Shop` entity accessible fields and PHPDoc.
4. Update `ShopsTable` validation.
5. Update fixtures and tests.
6. Update frontend display or filters if the field is visible to users.
7. Update `README.md` and `docs/architecture.md` if the public data contract changes.

## Review checklist

- Does the API still return `success` and `data`?
- Are nullable fields handled in React without rendering broken labels or links?
- Are map fields present for every visible shop?
- Will the new data work with existing filters and favorites?
