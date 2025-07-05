'use client'

import { useEditorRef } from 'platejs/react'
import type * as React from 'react'

import { cn } from '~utils'

interface MarkToolbarButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	nodeType: string
	tooltip?: string
}

export function MarkToolbarButton({
	nodeType,
	tooltip,
	className,
	children,
	...props
}: MarkToolbarButtonProps) {
	const editor = useEditorRef()

	return (
		<button
			type='button'
			title={tooltip}
			className={cn(
				'rounded-md border border-border bg-muted px-2 py-1 text-sm font-medium hover:bg-muted/80',
				className,
			)}
			onClick={() => {
				if (
					editor?.tf &&
					typeof editor.tf[nodeType as keyof typeof editor.tf] === 'function'
				) {
					;(editor.tf[nodeType as keyof typeof editor.tf] as any)?.toggle()
				}
			}}
			{...props}
		>
			{children}
		</button>
	)
}
