'use client'

import * as React from 'react'

import { cn } from '~utils'

export const FixedToolbar = React.forwardRef<
	HTMLDivElement,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(
			'sticky top-0 z-10 flex w-full items-center gap-1 border-b border-border bg-background/80 px-2 py-1 backdrop-blur',
			className,
		)}
		{...props}
	/>
))
FixedToolbar.displayName = 'FixedToolbar'
