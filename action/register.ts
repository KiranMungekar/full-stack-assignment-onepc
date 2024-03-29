"use server"

import bcrypt from 'bcryptjs';
import { RegisterSchema } from "@/schemas";

import { connection } from '@/lib/mongoose';
import { getUserByEmail } from '@/lib/data-service/users'
import { v4 as uuidv4 } from 'uuid';
import User from '@/lib/model/user.model';


export const register = async (values: any) => {
  try{
    await connection();
    const validatedFields = RegisterSchema.safeParse(values);
    if(!validatedFields.success){
        return { error: "Failed while creating account!" }
    }
    const { username, email, password } = validatedFields.data

    const existingUser:any = await getUserByEmail(email);

    if(existingUser){
        return { error: "EmailId already exists! "}
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    //Create a User
    await User.create({
        id: uuidv4(), 
        email,
        name: username,
        password: hashedPassword
    })

    return { success: 'User created successfully!' }  

  } catch(err){
    //throw err;
    return { success: 'Something went wrong!' }
  }
}
