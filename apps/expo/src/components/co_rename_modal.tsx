import { useEffect, useState } from 'react'
import { Adapt, Button, Dialog, Input, Sheet, YStack } from 'tamagui'

import type { FileSystemItem } from '~hooks'

export const CoRenameModal = ({
	visible,
	itemToRename,
	onClose,
	onRename,
}: {
	visible: boolean
	itemToRename: FileSystemItem | null
	onClose: () => void
	onRename: (item: FileSystemItem, newName: string) => void
}) => {
	const [newName, setNewName] = useState('')

	useEffect(() => {
		if (itemToRename) {
			setNewName(itemToRename.name)
		}
	}, [itemToRename])

	const handleRename = () => {
		if (newName.trim() && itemToRename) {
			onRename(itemToRename, newName.trim())
			onClose()
		}
	}

	const handleCancel = () => {
		setNewName('')
		onClose()
	}

	return (
		<Dialog open={visible} onOpenChange={open => !open && onClose()}>
			<Dialog.Portal>
				<Dialog.Overlay
					animation='fast'
					opacity={0.5}
					enterStyle={{ opacity: 0 }}
					exitStyle={{ opacity: 0 }}
				/>
				<Dialog.Content
					elevate
					animation={[
						'fast',
						{
							opacity: {
								overshootClamping: true,
							},
						},
					]}
					borderRadius='$roundedLg'
					enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
					exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
					gap='$gapMd'
					width='90%'
					maxWidth={400}
				>
					<Dialog.Title size='$heading-m'>
						Rename {itemToRename?.type}
					</Dialog.Title>

					<YStack gap='$gapMd'>
						<Input
							size='$body-l'
							value={newName}
							onChangeText={setNewName}
							autoFocus
							selectTextOnFocus
							borderRadius='$roundedSm'
							placeholder='Enter new name...'
						/>
					</YStack>

					<YStack gap='$gapSm' marginTop='$spacingMd'>
						<Button
							size='$spacingXl'
							backgroundColor='$primary'
							color='$onPrimary'
							onPress={handleRename}
							disabled={!newName.trim()}
							borderRadius='$roundedSm'
						>
							Rename
						</Button>
						<Button
							size='$spacingXl'
							backgroundColor='$surfaceVariant'
							color='$onSurfaceVariant'
							onPress={handleCancel}
							borderRadius='$roundedSm'
						>
							Cancel
						</Button>
					</YStack>
				</Dialog.Content>
			</Dialog.Portal>

			<Adapt when='sm' platform='native'>
				<Sheet
					animation='medium'
					zIndex={200000}
					modal
					dismissOnSnapToBottom
					open={visible}
					onOpenChange={open => !open && onClose()}
				>
					<Sheet.Frame padding='$spacingLg' gap='$gapMd'>
						<Adapt.Contents />
					</Sheet.Frame>
					<Sheet.Overlay
						animation='fast'
						enterStyle={{ opacity: 0 }}
						exitStyle={{ opacity: 0 }}
					/>
				</Sheet>
			</Adapt>
		</Dialog>
	)
}
