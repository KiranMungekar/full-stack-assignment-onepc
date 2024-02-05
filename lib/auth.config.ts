import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth"

import { LoginSchema } from "@/schemas";
import { connection } from '@/lib/mongoose'
import { getUserByEmail } from "@/lib/data-service/users";
import bcrypt from "bcryptjs";


export default {
  providers: [ 
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          try{
            await connection();
            console.log('In Authorization Creds')
            const user = await getUserByEmail(email);
            if (!user || !user.password) return null;
    
            const passwordsMatch = await bcrypt.compare(
              password,
              user.password,
            );
            if (passwordsMatch) return user;

          } catch(err){
            console.log("Error while autheticating user:: ", err);
            return null;
          }
        }
        return null;
      }
  })],
} satisfies NextAuthConfig