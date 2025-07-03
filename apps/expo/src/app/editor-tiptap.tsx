import { H2, YStack } from 'tamagui'

import { CoRichTextEditor } from '~components'

export default function EditorScreen() {
	return (
		<YStack
			flex={1}
			alignItems='center'
			justifyContent='flex-start'
			padding='$spacingMd'
			gap='$gapMd'
		>
			<H2>Rich-Text Editor</H2>
			<YStack width='100%' maxWidth={800} flex={1}>
				<CoRichTextEditor />
			</YStack>
		</YStack>
	)
}
