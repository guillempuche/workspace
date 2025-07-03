import { IconFolder, IconPenSquare, IconTrash2 } from '@workspace/ui/icons'
import { Button, Text, XStack } from 'tamagui'

export const CoFolderItem = ({
	name,
	onRename,
	onDelete,
	onPress,
}: {
	name: string
	onRename: () => void
	onDelete: () => void
	onPress: () => void
}) => {
	return (
		<XStack
			paddingHorizontal='$spacingMd'
			paddingVertical='$spacingMd'
			alignItems='center'
			borderBottomWidth={1}
			borderBottomColor='$surfaceVariant'
			gap='$gapMd'
			pressStyle={{ backgroundColor: '$surfaceContainerHigh' }}
			animation='fast'
			onPress={onPress}
		>
			<IconFolder />
			<Text
				flex={1}
				fontSize='$body-l'
				color='$onSurface'
				fontWeight='500'
				numberOfLines={1}
				ellipsizeMode='tail'
			>
				{name}
			</Text>
			<Button
				size='$spacingXl'
				circular
				chromeless
				icon={IconPenSquare}
				onPress={e => {
					e.stopPropagation()
					onRename()
				}}
				pressStyle={{ scale: 0.9 }}
				animation='fast'
			/>
			<Button
				size='$spacingXl'
				circular
				chromeless
				icon={IconTrash2}
				onPress={e => {
					e.stopPropagation()
					onDelete()
				}}
				pressStyle={{ scale: 0.9 }}
				animation='fast'
				theme='red'
			/>
		</XStack>
	)
}
