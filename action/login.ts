"use server"

import * as z from "zod"
import { revalidatePath } from 'next/cache';
import { connection } from '@/lib/mongoose';
import { LoginSchema } from "@/schemas";
import {signIn} from '@/lib/auth'
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: any) => {

    try{
        await connection();
        const validatedFields = LoginSchema.safeParse(values);
        if(!validatedFields.success){
            return { error: "Invalid Fields present!" }
        }

        const { email, password } = validatedFields.data;
        
        await signIn("credentials", {
            email,
            password
        })

        return { success: 'Login Success!' } 
    }catch(err){
        console.log(err);
        if (err instanceof AuthError) {
            switch (err.type) {
              case "CredentialsSignin":
                return { error: "Invalid credentials!" }
              default:
                return { error: "Something went wrong!" }
            }
        }
        
        throw err;
    }
  
}
