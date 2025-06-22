import { useState } from 'react'
import {
	Adapt,
	Button,
	Dialog,
	Input,
	Label,
	Sheet,
	Switch,
	XStack,
	YStack,
} from 'tamagui'

export const CoCreateModal = ({
	visible,
	onClose,
	onCreate,
}: {
	visible: boolean
	onClose: () => void
	onCreate: (name: string, type: 'file' | 'folder') => void
}) => {
	const [name, setName] = useState('')
	const [isFolder, setIsFolder] = useState(false)

	const handleCreate = () => {
		if (name.trim()) {
			onCreate(name.trim(), isFolder ? 'folder' : 'file')
			setName('')
			setIsFolder(false)
			onClose()
		}
	}

	const handleCancel = () => {
		setName('')
		setIsFolder(false)
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
					<Dialog.Title size='$heading-m'>Create New</Dialog.Title>

					<YStack gap='$gapMd'>
						<Input
							size='$body-l'
							placeholder='Enter name...'
							value={name}
							onChangeText={setName}
							autoFocus
							borderRadius='$roundedSm'
						/>

						<XStack alignItems='center' gap='$gapSm'>
							<Label size='$body-m' htmlFor='type-switch'>
								File
							</Label>
							<Switch
								id='type-switch'
								size='$spacingXl'
								checked={isFolder}
								onCheckedChange={setIsFolder}
							>
								<Switch.Thumb animation='fast' />
							</Switch>
							<Label size='$body-m' htmlFor='type-switch'>
								Folder
							</Label>
						</XStack>
					</YStack>

					<YStack gap='$gapSm' marginTop='$spacingMd'>
						<Button
							size='$spacingXl'
							backgroundColor='$primary'
							color='$onPrimary'
							onPress={handleCreate}
							disabled={!name.trim()}
							borderRadius='$roundedSm'
						>
							Create
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
