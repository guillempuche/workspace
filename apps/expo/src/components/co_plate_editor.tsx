// import {
// 	BoldPlugin,
// 	ItalicPlugin,
// 	UnderlinePlugin,
// } from '@platejs/basic-nodes/react'
// // import { YjsPlugin } from '@platejs/yjs'
// import { Plate } from 'platejs/react'
// import { useMemo } from 'react'
// import * as Y from 'yjs'

// const ydoc = new Y.Doc()
// const plugins = [BoldPlugin, ItalicPlugin, UnderlinePlugin]

// export function CoPlateEditor({ name = 'doc-1' }: { name?: string }) {
// 	const editor = useMemo(() => Plate.create({ plugins }), [])

// 	return (
// 		<Plate
// 			editor={editor}
// 			plugins={[
// 				YjsPlugin({
// 					ydoc,
// 					providerConfigs: [
// 						{
// 							type: 'hocuspocus',
// 							options: {
// 								url: process.env.EXPO_PUBLIC_COLLAB_URL as string,
// 								name,
// 							},
// 						},
// 					],
// 				}),
// 			]}
// 		>
// 			{/* replace with Plate UI blocks when you add them */}
// 			<textarea
// 				style={{
// 					minHeight: 200,
// 					padding: 12,
// 					borderWidth: 1,
// 					borderColor: '#ccc',
// 				}}
// 				placeholder='Type collaboratively…'
// 				{...editor}
// 			/>
// 		</Plate>
// 	)
// }
