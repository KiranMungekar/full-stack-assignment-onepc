import { Button } from "@/components/ui/button"
import { auth, signOut } from "@/lib/auth"

const DashboardPage = async () => {
	const session = await auth()
	return (
		<>
			<h1> Dashboard Page</h1>
			{session ? JSON.stringify(session) : ""}
			<form
				action={async () => {
					"use server"
					await signOut()
				}}
			>
				<button type='submit'>Logout</button>
			</form>
		</>
	)
}

export default DashboardPage
