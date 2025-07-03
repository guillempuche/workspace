import { useEffect } from 'react'
import { Platform } from 'react-native'

// TipTap and ProseMirror rely on the browser DOM. This means we can use them
// directly when we are running in the web target, but we need a different
// strategy for native (iOS / Android). For now we render the same editor in a
// WebView on native platforms. This keeps a single source of truth for the
// document while we evaluate fully–native solutions.

const INITIAL_CONTENT = `<p>Hello World!</p>`

// ------------------------------
// Web implementation
// ------------------------------
function RichTextEditorWeb() {
	// Importing TipTap dynamically prevents Metro from trying to bundle the
	// DOM-specific code for native builds.
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { useEditor, EditorContent } =
		require('@tiptap/react') as typeof import('@tiptap/react')
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const StarterKit = require('@tiptap/starter-kit')
		.default as typeof import('@tiptap/starter-kit').default

	const editor = useEditor({
		extensions: [StarterKit],
		content: INITIAL_CONTENT,
	})

	// Destroy the editor when the component unmounts to avoid memory leaks
	useEffect(() => {
		return () => {
			editor?.destroy()
		}
	}, [editor])

	return (
		<EditorContent editor={editor} style={{ width: '100%', minHeight: 200 }} />
	)
}

// ------------------------------
// Native implementation
// ------------------------------
function RichTextEditorNative() {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const { WebView } =
		require('react-native-webview') as typeof import('react-native-webview')

	// NOTE: In a production app you would probably load external files instead of
	// bundling everything into a template literal. Keeping it inline keeps this
	// example self-contained and easy to iterate on.
	const html = `<!DOCTYPE html>
	<html lang="en">
	<head>
	  <meta charset="utf-8" />
	  <meta name="viewport" content="width=device-width, initial-scale=1" />
	  <style>
	    html,body{margin:0;padding:0;height:100%;}
	    .ProseMirror{padding:16px;outline:none}
	  </style>
	  <script type="importmap">
	    {
	      "imports": {
	        "@tiptap/core": "https://esm.sh/@tiptap/core@2",
	        "@tiptap/starter-kit": "https://esm.sh/@tiptap/starter-kit@2"
	      }
	    }
	  </script>
	</head>
	<body>
	  <div id="editor"></div>
	  <script type="module">
	    import { EditorContent, Editor } from 'https://esm.sh/@tiptap/core@2'
	    import StarterKit from 'https://esm.sh/@tiptap/starter-kit@2'

	    const editor = new Editor({
	      element: document.getElementById('editor'),
	      extensions: [StarterKit],
	      content: ${JSON.stringify(INITIAL_CONTENT)}
	    })
	  </script>
	</body>
	</html>`

	return (
		<WebView
			originWhitelist={['*']}
			source={{ html }}
			style={{ flex: 1, minHeight: 200 }}
			automaticallyAdjustContentInsets={false}
		/>
	)
}

export function CoRichTextEditor() {
	return Platform.OS === 'web' ? (
		<RichTextEditorWeb />
	) : (
		<RichTextEditorNative />
	)
}
