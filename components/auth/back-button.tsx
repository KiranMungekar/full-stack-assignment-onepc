"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface BackButtonProps {
	backButtonLabel: string
	backButtonHref: string
}

export const BackButton = ({
	backButtonLabel,
	backButtonHref,
}: BackButtonProps) => {
	return (
		<div className='w-full flex items-center justify-center gap-x-2'>
			<Button
				variant={"link"}
				className='w-full font-normal'
				size={"sm"}
				asChild
			>
				<Link href={backButtonHref}>{backButtonLabel}</Link>
			</Button>
		</div>
	)
}
