# whencut.in

Static personal site: **Writing**, **Work**, **Now**, plus home—Markdown in `src/content/`, Astro 6, mostly plain CSS in `src/styles/global.css` (Tailwind only for a few utilities). Small filters live next to the pages that use them.

## Requirements

- Node **22.12+** (`package.json` → `engines`)

## Commands

| Command | What it does |
| -------- | -------------- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server (port 4321) |
| `npm run build` | Output to `dist/` |
| `npm run preview` | Serve `dist/` locally |

## Content

| Path | Purpose |
| ------ | -------- |
| `src/content/home/index.md` | Home copy. Optional `displayName` → `<title>` and portrait `alt`. |
| `public/home-photo.png` | Home portrait / cutout (replace this file to change the image). |
| `src/content/work/index.md` | Single **Work** page—any markdown. Optional `draft: true` (hidden in production). |
| `src/content/now/now.md` | **Now** page. Use `##` for sections. Optional `lastUpdated` (ISO datetime). |
| `src/content/writing/*.md` | Posts. URL = `/writing/` + file path unless `slug` is set in frontmatter. |
| `src/content/footer/index.md` | **Footer**: optional `email`, `github`, `linkedin`, `x` in frontmatter (use full `https://…` URLs). Body = colophon / creative aside (markdown). |

**Writing scaffolds:** files under `writing/` whose name starts with `_` are not listed and do not get routes.

**Drafts:** `draft: true` on a post is omitted in **production** builds only (still visible in dev).

### Images in posts

Use a public URL or a path next to the `.md` file:

```md
![Diagram](/writing/diagram.png)
![Local](./screenshot.png)
```

### Hyperlinks

Standard markdown links pick up the site accent and underline on hover:

```md
Read more at [Example](https://example.com).
```

### Blockquote (pull quote panel)

Use markdown `>` lines:

```md
> Talk is cheap. Show me the code.
>
> — Linus Torvalds, August 2000
```

### Lists with a highlighted lead (title — body)

Use **bold** for the lead phrase, then an em dash (—):

```md
- **FOSS United Foundation** — started in 2020 to promote …
- **[Rainmatter](https://example.org)** — optional: first link in the line is also emphasised.
```

## Deploy

`dist/` is static; host on Netlify, Cloudflare Pages, S3, etc.
