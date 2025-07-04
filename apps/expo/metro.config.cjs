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
const config = getDefaultConfig(projectRoot, {
	// [Web-only]: Enables CSS support in Metro.
	isCSSEnabled: true,
})

const monorepoPackages = getMonorepoPackages(projectRoot)

const monorepoConfig = {
	...config,
	projectRoot,
	watchFolders: [...Object.values(monorepoPackages)],
	resolver: {
		extraNodeModules: {
			...monorepoPackages,
			assets: path.resolve(projectRoot, 'src/assets'),
		},
		unstable_enablePackageExports: true,
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
		// // Custom resolver to handle subpath exports manually
		// resolveRequest: (context, moduleName, platform) => {
		// 	// Handle @platejs/*/react imports
		// 	const platejsReactMatch = moduleName.match(/^(@platejs\/[^/]+)\/react$/)
		// 	if (platejsReactMatch) {
		// 		const packageName = platejsReactMatch[1]
		// 		const platejsPath = path.resolve(
		// 			projectRoot,
		// 			`node_modules/${packageName}/dist/react/index.js`,
		// 		)
		// 		if (require('node:fs').existsSync(platejsPath)) {
		// 			return {
		// 				filePath: platejsPath,
		// 				type: 'sourceFile',
		// 			}
		// 		}
		// 	}

		// 	// Default resolver
		// 	return context.resolveRequest(context, moduleName, platform)
		// },
	},
}

// Add Tamagui web support with optimizing compiler and CSS extraction
const tamaguiConfig = withTamagui(monorepoConfig, {
	components: ['@workspace/ui', 'tamagui'],
	config: '../../packages/ui/src/theme/tamagui.config.ts',
	outputCSS: './src/tamagui_web.css',
})

module.exports = wrapWithReanimatedMetroConfig(tamaguiConfig)
