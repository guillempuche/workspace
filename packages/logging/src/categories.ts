import { LogLevel } from 'typescript-logging'
import { CategoryProvider } from 'typescript-logging-category-style'

// Root categories
export const rootProvider = CategoryProvider.createProvider('@workspace', {
	level: LogLevel.Debug,
})
const logApps = rootProvider.getCategory('apps')

export const logUtilsLogging = rootProvider.getCategory('utils.logging')

// UI
export const logUi = logUtilsLogging.getChildCategory('ui')

// Apps
export const logAppServer = logApps.getChildCategory('server')
export const logAppExpo = logApps.getChildCategory('expo')

// Expo
export const logExpoComponents = logAppExpo.getChildCategory('components')
export const logExpoHooks = logAppExpo.getChildCategory('hooks')
