'use client'

import * as React from 'react'

import { cn } from '~utils'

export const ToolbarButton = React.forwardRef<
	HTMLButtonElement,
	React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
	<button
		ref={ref}
		type='button'
		className={cn(
			'rounded-md border border-border bg-muted px-2 py-1 text-sm font-medium hover:bg-muted/80',
			className,
		)}
		{...props}
	>
		{children}
	</button>
))
ToolbarButton.displayName = 'ToolbarButton'
