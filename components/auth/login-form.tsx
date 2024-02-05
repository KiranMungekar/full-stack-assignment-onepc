"use client"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { useForm } from "react-hook-form"
import { useTransition, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { LoginSchema } from "@/schemas"

import { FormError } from "@/components/form-error"

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormSuccess } from "../form-sucess"

import { login } from "@/action/login"

export const LoginForm = () => {
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	})

	const [isPending, startTransition] = useTransition()

	const [error, setError] = useState<string | undefined>("")
	const [success, setSuccess] = useState<string | undefined>("")

	const onSubmit = (values: z.infer<typeof LoginSchema>) => {
		setError("")
		setSuccess("")
		startTransition(() => {
			login(values).then((data) => {
				setError(data.error)
				setSuccess(data.success)
			})
		})
	}

	return (
		<CardWrapper
			headerLabel='Welcome to Taskify'
			backButtonLabel="Don't have an account?"
			backButtonHref='/auth/register'
			showSocial={true}
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6'
				>
					<div className='space-y-4'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='john.doe@example.com'
											type='email'
											disabled={isPending}
										></Input>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder='***************'
											type='password'
											disabled={isPending}
										></Input>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button
						type='submit'
						className='w-full'
						disabled={isPending}
					>
						{" "}
						Login{" "}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	)
}
