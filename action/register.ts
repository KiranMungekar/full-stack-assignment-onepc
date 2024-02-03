"use server"

import * as z from "zod"
import { revalidatePath } from 'next/cache';

//import { connection } from '../mongoose';

import { RegisterSchema } from "@/schemas";

export const register = async (values: any) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "Failed while creating account!" }
    }
    console.log(values)
    return { success: 'Account created successfully!' }   
}
