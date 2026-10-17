# Atlas data provenance

`tsx scripts/generate-atlas.ts` deterministically derives the checked-in manifest from installed `cldr-core@48.2.0` (`supplemental/codeMappings.json`, `territoryContainment.json`) and `cldr-localenames-full@48.2.0` (English/Indonesian `territories.json`). Input paths and SHA-256 values are committed in `src/features/atlas/data/provenance.json`; `--check` rejects stale generated files. CLDR is used under Unicode License v3.

The 195 membership policy is fixed: 193 UN members plus PS and VA. CLDR containment supplies geographic grouping (not an independent UNSD M49 extract): `region` is the first continent ancestor and `subregion` its direct descendant; codes are CLDR's numeric M49-style identifiers. Names are CLDR territory display names with Indonesian fallback to English only when CLDR lacks an Indonesian display name.

Geometry is `world-atlas@2.0.2` / Natural Earth 110m and has its pinned SHA-256 in the same provenance manifest. The 29 documented small entities are list-only; their `geometryId` is null and they never borrow neighbor geometry. Topology IDs outside canonical mapping are explicitly inert. No language or script claims are shipped.
