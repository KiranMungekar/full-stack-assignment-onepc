const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			className='flex h-full items-center justify-center align-middle bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))]
        from-yellow-400 to-yellow-700'
		>
			{children}
		</div>
	)
}

export default AuthLayout
