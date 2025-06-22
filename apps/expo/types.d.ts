import type { tamaguiConfig } from '@workspace/ui/theme'

export type CustomTamaguiConfigType = typeof tamaguiConfig

declare module '@workspace/ui' {
	interface ICustomTamaguiConfig extends CustomTamaguiConfigType {}
}
