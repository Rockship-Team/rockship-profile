# Demo prototypes

The `/demos/<slug>` pages embed self-contained prototype HTML files from this
folder in an iframe. Each file must be a single, standalone `.html` (inline CSS
+ JS, no build step) — exactly like the exports the team already produced.

## Expected files

| File | Demo page | Notes |
|------|-----------|-------|
| `truecost.html`   | `/demos/truecost`   | English UI. |
| `projecthub.html` | `/demos/projecthub` | Vietnamese UI. |

The data-lake demo is video-only (no prototype file) — see `lib/demos-content.ts`.

## Adding the real prototypes

Right now these two files are **placeholders**. Replace them with the original
exports, keeping the same filenames:

```bash
cp /path/to/truecost_copilot_prototype.html   public/demos/truecost.html
cp /path/to/RE_ProjectHubNew.html             public/demos/projecthub.html
```

No code change is needed — the pages already point at these paths. (The copies
pasted into chat came through with a double-encoded-UTF-8 problem, so use the
original files from disk rather than that paste.)
