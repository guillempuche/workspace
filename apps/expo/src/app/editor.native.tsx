import { WebView } from 'react-native-webview'

export default function EditorNative() {
	return (
		<WebView
			source={{
				uri: `${process.env.EXPO_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000'}/editor`,
			}}
			originWhitelist={['*']}
			style={{ flex: 1 }}
		/>
	)
}
