import { IconFile, IconPenSquare, IconTrash2 } from '@workspace/ui/icons'
import { Button, Text, XStack } from 'tamagui'

export const CoFileItem = ({
	name,
	onRename,
	onDelete,
}: {
	name: string
	onRename: () => void
	onDelete: () => void
}) => {
	return (
		<XStack
			paddingHorizontal='$spacingMd'
			paddingVertical='$spacingMd'
			alignItems='center'
			borderBottomWidth={1}
			borderBottomColor='$surfaceVariant'
			gap='$gapMd'
		>
			<IconFile />
			<Text
				flex={1}
				fontSize='$body-l'
				color='$onSurface'
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
				onPress={onRename}
				pressStyle={{ scale: 0.9 }}
				animation='fast'
			/>
			<Button
				size='$spacingXl'
				circular
				chromeless
				icon={IconTrash2}
				onPress={onDelete}
				pressStyle={{ scale: 0.9 }}
				animation='fast'
				theme='red'
			/>
		</XStack>
	)
}
