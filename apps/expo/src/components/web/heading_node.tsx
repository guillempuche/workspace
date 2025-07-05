'use client'

import type * as React from 'react'

import { cn } from '~utils'

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>

export function H1Element({ className, ...props }: HeadingProps) {
	return (
		<h1
			className={cn(
				'scroll-m-20 text-4xl font-extrabold tracking-tight',
				className,
			)}
			{...props}
		/>
	)
}

export function H2Element({ className, ...props }: HeadingProps) {
	return (
		<h2
			className={cn(
				'scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0',
				className,
			)}
			{...props}
		/>
	)
}

export function H3Element({ className, ...props }: HeadingProps) {
	return (
		<h3
			className={cn(
				'scroll-m-20 text-2xl font-semibold tracking-tight',
				className,
			)}
			{...props}
		/>
	)
}
