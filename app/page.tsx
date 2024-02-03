import { LoginButton } from "@/components/auth/login-button"
import { Button } from "@/components/ui/button"

export default function Home() {
	return (
		<main
			className='flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]
  from-yellow-400 to-yellow-700'
		>
			<div className='space-y-6 text-center'>
				<h1 className='text-6xl font-semibold text-white drop-shadow-md'>
					Taskify
				</h1>
				<p className='text-white text-lg'>
					Simplifing your task management!
				</p>
				<div>
					<LoginButton>
						<Button variant={"secondary"} size={"lg"}>
							Sign In
						</Button>
					</LoginButton>
				</div>
			</div>
		</main>
	)
}
