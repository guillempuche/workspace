/**
 * Documentation at https://docs.expo.io/guides/customizing-metro
 */
const { getDefaultConfig } = require('expo/metro-config')
const path = require('node:path')
const getMonorepoPackages = require('./utils_metro.cjs')
const {
	wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config')
const { withTamagui } = require('@tamagui/metro-plugin')

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, '../..')

// Initialize Metro config with Expo's default
// const config = getDefaultConfig(projectRoot)
const config = getDefaultConfig(projectRoot, {
	// [Web-only]: Enables CSS support in Metro.
	isCSSEnabled: true,
})

const monorepoPackages = getMonorepoPackages(projectRoot)

console.log('Registered monorepo packages:', Object.keys(monorepoPackages))

const monorepoConfig = {
	...config,
	projectRoot,
	watchFolders: [
		// srcPath,
		...Object.values(monorepoPackages),
	],
	resolver: {
		extraNodeModules: {
			...monorepoPackages,
			assets: path.resolve(projectRoot, 'assets'),
		},
		unstable_enablePackageExports: false, // Prevent Tamagui error for the native app. More at https://github.com/tamagui/tamagui/issues/3396#issuecomment-2828685283
		sourceExts: [
			...config.resolver.sourceExts,
			// Expo 49 issue: default metro config needs to include "mjs"
			// https://github.com/expo/expo/issues/23180
			'mjs',
		],
		// Node module paths for resolution order
		nodeModulesPaths: [
			path.resolve(projectRoot, 'node_modules'),
			path.resolve(monorepoRoot, 'node_modules'),
		],
	},
}

// Add Tamagui web support with optimizing compiler and CSS extraction
const tamaguiConfig = withTamagui(monorepoConfig, {
	components: ['@workspace/ui', 'tamagui'],
	config: '../../packages/ui/src/theme/tamagui.config.ts',
	outputCSS: './src/tamagui_web.css',
})

module.exports = wrapWithReanimatedMetroConfig(tamaguiConfig)
