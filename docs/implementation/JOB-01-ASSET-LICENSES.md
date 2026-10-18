# JOB-01: Asset Licenses & Provenance

**Date:** 2026-10-18  
**Job:** World Atlas 3D Engine

## Earth Texture

**File:** `public/assets/earth-day.jpg`  
**Size:** 2.45 MB  
**Resolution:** 5400×2700 (2K equirectangular)

**Source:** NASA Visible Earth  
**URL:** https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg  
**Title:** Blue Marble: Land Surface, Shallow Water, and Shaded Topography (December 2004)

**License:** Public Domain  
**Credit:** NASA's Earth Observatory

**Description:** Monthly composite Blue Marble image combining land surface, ocean color, sea ice, and clouds. Based on MODIS satellite observations.

**Attribution (used in footer):** "Boundaries are illustrative and follow the published source dataset."

**Notes:**
- No attribution legally required (public domain)
- NASA encourages credit for scientific courtesy
- Texture provided in equirectangular projection suitable for `three-globe.globeImageUrl()`
- Resolution appropriate for web use without excessive file size

## Alternative Texture Sources Considered

1. **Natural Earth 1:10m Physical** — Public domain, lower resolution
2. **Solar System Scope Textures** — Free for non-commercial, watermark issue
3. **three-globe examples CDN** — Not suitable for production (hotlinking)

**Chosen NASA Visible Earth for:**
- Clear public domain status
- High quality at web-appropriate resolution
- No watermarks or attribution requirements
- Official source suitable for educational/competition use
