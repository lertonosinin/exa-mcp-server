# Maintenance review — 2026-09-05

Optional numeric inputs previously coerced null, booleans and arrays to zero. In tools where zero forces a live crawl, omitted/invalid model arguments could therefore change request behavior. The validator now accepts finite numbers and nonblank numeric strings; other optional inputs fall back to undefined. Fourteen regression cases cover those inputs and non-finite numbers.

Removed unused `whoami` (and its vulnerable shelljs chain), upgraded agnost to 0.2.1 and refreshed compatible dependency resolutions. Vite is explicitly constrained to the patched 6.4.3 line, within Vitest's supported range. `npm audit --omit=dev` reports zero affected packages at review time. `npm run ci` passes type checking and all 101 tests in nine files; the stdio bundle builds.

The full dependency audit still reports 18 affected development packages (2 low, 7 moderate, 9 high), including transitive Vercel CLI packages. Trial Vercel major upgrades did not clear the advisory set and were reverted; the existing 37.x major is retained. No forced cross-major transitive overrides or live deployment were performed. Remaining work: replace or upgrade the development deployment chain once compatible patched resolutions can be verified, then run a Vercel development/deployment smoke test. Production audit success does not certify development-tool security or actual exploitability.

Recheck with `npm ci`, `npm run ci`, `npm run build` and `npm audit --omit=dev`. The complete development audit is `npm audit`; advisory counts change over time.
