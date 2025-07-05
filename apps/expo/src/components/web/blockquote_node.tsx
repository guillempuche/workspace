'use client'

import type { NodeProps } from 'platejs/react'
import type * as React from 'react'

import { cn } from '~utils'

export function BlockquoteElement({
	className,
	...props
}: React.HTMLAttributes<HTMLQuoteElement> & NodeProps) {
	return (
		<blockquote
			className={cn('mt-6 border-l-2 pl-6 italic', className)}
			{...props}
		/>
	)
}
