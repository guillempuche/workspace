import type { IconProps } from '@tamagui/helpers-icon'
import {
	ArrowLeft,
	File,
	Folder,
	PenSquare,
	Trash2,
} from '@tamagui/lucide-icons'

export const IconArrowLeft = ({
	size = '$iconLg',
	color = '$primary',
	...props
}: IconProps) => <ArrowLeft size={size} color={color} {...props} />

export const IconFile = ({
	size = '$iconLg',
	color = '$primary',
	...props
}: IconProps) => <File size={size} color={color} {...props} />

export const IconFolder = ({
	size = '$iconLg',
	color = '$primary',
	...props
}: IconProps) => <Folder size={size} color={color} {...props} />

export const IconPenSquare = ({
	size = '$iconLg',
	color = '$primary',
	...props
}: IconProps) => <PenSquare size={size} color={color} {...props} />

export const IconTrash2 = ({
	size = '$iconLg',
	color = '$primary',
	...props
}: IconProps) => <Trash2 size={size} color={color} {...props} />
