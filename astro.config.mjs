// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Tailwind is only used for a few layout utilities; most styling lives in global.css.
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
});
