# Logo assets

Files in this folder are served from the site root.

```
/public/logos/primary_logo_safari_olive_transparent.png   →   https://zuritravels.com/logos/primary_logo_safari_olive_transparent.png
```

## Current brand files

| Filename | Where it's used | Notes |
|---|---|---|
| `primary_logo_safari_olive_transparent.png` | Header, footer, admin | Full "ZURI TRAVELS" wordmark + Z mark, safari-olive. Footer renders it white via `brightness-0 invert`. |
| `alternate_logo_cocoa_brown_transparent.png` | Alternate / cocoa-brown contexts | Same lockup in cocoa brown. |
| `favicon.png` | Browser tab source | Next handles other sizes. |

**PNG with transparent background** so the lockup drops onto any surface. On dark
sections apply `brightness-0 invert` to render the dark wordmark as white.

## Subfolders

- **`partners/`** — Lodge & camp partners (Singita, Wilderness, andBeyond, etc.). Used in the home page partners marquee and the "as featured in" strip.
- **`press/`** — Publications (Condé Nast, Travel + Leisure, Robb Report, etc.). Used in the home page press strip.
