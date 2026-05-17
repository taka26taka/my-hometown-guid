---
name: hometown-guide-maintenance
description: Use this skill when maintaining the My Hometown Guide React/CakePHP application, including frontend UI changes, backend API changes, docs updates, release checks, or architecture-aware refactors.
---

# Hometown Guide Maintenance

Use this skill for code and documentation work in this repository.

## First checks

1. Read `README.md` and `docs/architecture.md` for current architecture.
2. Inspect the files related to the requested layer:
   - Frontend: `frontend/src/App.jsx`, `frontend/src/MapView.jsx`, `frontend/src/hooks/useFavoriteShops.js`.
   - Backend API: `backend/src/Controller/Api/ShopsController.php`, `backend/src/Model/Table/ShopsTable.php`, `backend/src/Model/Entity/Shop.php`.
   - Schema: `backend/config/Migrations/`, `backend/tests/Fixture/ShopsFixture.php`.
3. Avoid changing generated dependencies or ignored runtime directories such as `frontend/node_modules`, `backend/vendor`, `backend/tmp`, and `backend/logs`.

## Frontend workflow

- Keep `App.jsx` as the owner of API data and filter state unless a change clearly needs extraction.
- Keep Leaflet instances in refs, not React state.
- If changing the public path, update both `frontend/vite.config.js` and marker asset paths in `frontend/src/MapView.jsx`.
- When adding UI fields, handle nullable API values gracefully and keep Japanese guest-facing copy concise.

## Backend workflow

- Keep `/api/shops.json` response shape compatible unless the task explicitly requests a breaking API change.
- For new shop fields, update migration, entity, table validation, fixtures/tests, frontend rendering, and docs together.
- Treat CORS and CSRF settings carefully; write APIs need an explicit security review.
- Prefer CakePHP conventions for controllers, table validation, and tests.

## Validation

Run the narrowest relevant checks first, then broader checks before finalizing.

```bash
cd frontend && npm run lint
cd frontend && npm run build
cd backend && composer test
cd backend && composer cs-check
```

If a check cannot run because dependencies or services are missing, report the exact limitation and the command attempted.

## References

- For a compact system overview, read `references/system-map.md`.
- For schema/API field expectations, read `../shop-data-curation/references/shop-schema.md`.
