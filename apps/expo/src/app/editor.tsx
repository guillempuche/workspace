// import {
// 	BoldPlugin,
// 	ItalicPlugin,
// 	UnderlinePlugin,
// } from '@platejs/basic-nodes/react'
// import { Plate, usePlateEditor } from 'platejs/react'
import { Plate, usePlateEditor } from '@platejs/core/react'

import { Editor, EditorContainer } from '~components/web'

export default function EditorPage() {
	// Initialize a memoized editor instance with basic mark plugins
	const editor = usePlateEditor({
		// plugins: [BoldPlugin, ItalicPlugin, UnderlinePlugin],
	})

	return (
		<Plate editor={editor}>
			<EditorContainer>
				<Editor placeholder='Type your amazing content here…' />
			</EditorContainer>
		</Plate>
	)
}
