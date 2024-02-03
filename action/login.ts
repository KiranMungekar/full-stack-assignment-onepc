"use server"

import * as z from "zod"
import { revalidatePath } from 'next/cache';

//import { connection } from '../mongoose';

import { LoginSchema } from "@/schemas";

export const login = async (values: any) => {
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "Invalid Fields present!" }
    }
    console.log(values)
    return { success: 'Login Success!' }   
}
