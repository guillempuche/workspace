import { defineConfig } from 'tsdown'

export default defineConfig([
	{
		entry: ['src/index.ts'],
		outDir: 'dist',
	},
	{
		entry: ['src/icons/index.ts'],
		outDir: 'dist/icons',
	},
	{
		entry: ['src/theme/index.ts'],
		outDir: 'dist/theme',
	},
])
