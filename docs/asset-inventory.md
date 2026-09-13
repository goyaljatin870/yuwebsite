# Asset Inventory

This document records the source-of-truth asset locations. `build/` and `node_modules/` are generated or installed content and are intentionally excluded.

## Confirmed In Use

| Location | Evidence |
| --- | --- |
| `public/yu-logo.png` | Used by `src/constants/branding.js`, `public/index.html`, and `public/manifest.json`. |
| `public/images/home/home-about-main-20260214.jpg` | Used by `src/constants/media.js` and the home about section. |
| `public/images/home/home-group-bg.jpg` | Used by `src/constants/media.js` and the home page. |
| `public/images/events/*.jpg` and `la-fiesta-home-2026.jpeg` | Event records, the events preview, and the event detail page reference these files. |
| `public/team/faculty/*` | Faculty records in `src/data/members.js` reference both files. |
| `public/team/faces/*` | Executive member records in `src/data/members.js` reference all six current files. |

The hero also uses an external Unsplash URL from `src/constants/media.js`.

## Safe Duplicate Candidates

Every file in `Event pics with event names/` is byte-for-byte identical to a corresponding file in `public/images/events/`:

- `Utsav-e-solace.jpg`
- `Unity March.jpeg`
- `Umang.jpeg`
- `Society Fair.jpg`
- `Run for swadeshi.jpg`
- `Orientation.jpg`
- `BRD.jpg`

The website does not reference the staging folder. These files may be archived or deleted after confirming they are not needed as original source material.

## Review Before Removing

`Gemini_Generated_Image_10vfiv10vfiv10vf.png` has no reference in the current source tree. It should remain until its visual purpose and history are confirmed. It may be an original design export rather than a waste file.

## Report Image Selection

- `LA_FIESTA_image_19.jpg` is the La Fiesta 5.0 homepage/outside banner image.
- `LA_FIESTA_image_11.png` is the La Fiesta 5.0 event-card image.
- `STEM_CONCLAVE_image_05.jpg` is the STEM Conclave card image.
- Additional report photographs remain available for future event detail galleries.
- Removed confirmed unwanted La Fiesta exports: blank `LA_FIESTA_image_12.png`, GPS-overlay or screenshot exports `LA_FIESTA_image_13.png`, `LA_FIESTA_image_14.jpg`, and `LA_FIESTA_image_18.png`, roll-up standee `LA_FIESTA_image_16.jpg`, and poster `LA_FIESTA_image_20.jpg`.

## Cleanup Procedure

1. Search `src/`, `public/index.html`, and `public/manifest.json` for the candidate path.
2. Compare hashes and dimensions with any replacement asset.
3. Check `git log` if the file may be an original source asset.
4. Remove or archive only after confirming no workflow needs it.
5. Run `npm run build` and verify home, events, event detail, members, logo, and join form pages.

Do not edit or use `build/`, `node_modules/`, or `backend/.venv/` as source-of-truth asset directories.