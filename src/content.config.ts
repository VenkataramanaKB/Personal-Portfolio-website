import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Conventions:
 * - `_*.md` under writing: ignored for routes and the index (templates only).
 * - `draft: true` on writing: hidden in production builds only.
 * - Work is one file: `src/content/work/index.md` (any markdown).
 * - Footer: `src/content/footer/index.md` — optional contact URLs in frontmatter; body is the aside.
 * - Writing URLs: file path under `writing/`, unless you set `slug` in frontmatter.
 */

const writingCategory = z.enum([
	'essays',
	'observations',
	'systems-thinking',
	'engineering-lessons',
	'operator-thoughts',
]);

const writing = defineCollection({
	loader: glob({ base: './src/content/writing', pattern: '**/*.md' }),
	schema: z.object({
		title: z.string(),
		slug: z.string().optional(),
		pubDate: z.coerce.date(),
		category: writingCategory,
		draft: z.boolean().optional().default(false),
		updatedDate: z.coerce.date().optional(),
	}),
});

const work = defineCollection({
	loader: glob({ base: './src/content/work', pattern: 'index.md' }),
	schema: z.object({
		draft: z.boolean().optional().default(false),
	}),
});

const now = defineCollection({
	loader: glob({ base: './src/content/now', pattern: '*.md' }),
	schema: z.object({
		lastUpdated: z.coerce.date().optional(),
	}),
});

const home = defineCollection({
	loader: glob({ base: './src/content/home', pattern: '*.md' }),
	schema: z.object({
		displayName: z.string().optional(),
	}),
});

const footer = defineCollection({
	loader: glob({ base: './src/content/footer', pattern: 'index.md' }),
	schema: z.object({
		email: z.string().optional(),
		github: z.string().optional(),
		linkedin: z.string().optional(),
		x: z.string().optional(),
	}),
});

export const collections = { writing, work, now, home, footer };
