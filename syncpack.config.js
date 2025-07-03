/**
 * Syncpack docs https://jamiemason.github.io/
 */

/** @type {import("syncpack").RcFile} */
export default {
	dependencyTypes: ['dev', 'prod', 'overrides', 'peer', 'resolutions'],
	filter: '.',
	indent: '	', // One tab
	versionGroups: [
		{
			label: 'TypeScript',
			dependencies: ['typescript'],
			isIgnored: true,
		},
		{
			label: 'Workspace',
			dependencies: ['@workspace/*'],
			policy: 'sameRange',
		},
		{
			label: 'React',
			dependencies: ['@types/react*', 'react', 'react-dom', 'react-native'],
			policy: 'sameRange',
		},
		{
			label: 'Tamagui',
			dependencies: ['tamagu*', '@tamagui/*'],
			policy: 'sameRange',
		},
	],
	sortAz: [
		'dependencies',
		'devDependencies',
		'peerDependencies',
		'resolutions',
	],
	sortFirst: [
		'name',
		'version',
		'description',
		'repository',
		'packageManager',
		'engines',
		'main',
		'type',
		'types',
		'module',
		'import',
		'exports',
		'react-native',
		'workspaces',
		'scripts',
		'dependencies',
		'peerDependencies',
		'devDependencies',
		'resolutions',
		'author',
		'private',
	],
	sortPackages: true,
	source: ['package.json', 'apps/*/package.json', 'packages/**/package.json'],
}
