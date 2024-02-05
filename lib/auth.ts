import NextAuth, { DefaultSession } from "next-auth"

import authConfig from '@/lib/auth.config'
import { getUserById, getUserByEmail, createNewUser } from "./data-service/users";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  session: {strategy: "jwt"},
  callbacks: {
    async signIn({ user, account, profile }) {
     //Not working dont know why?
      if (account?.provider === "github" || account?.provider === 'google') {
        try {
          const user = await getUserByEmail(profile?.email || '')

          if (!user) {
            await createNewUser(profile?.email || '', profile?.name || '')
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },  
    async session({ token, session }){
      console.log('session callback')
      if(token.sub && session.user){
        session.user['id'] = token.sub;
      }
      return session;
    },
    async jwt({ token }){
      console.log('token callback')
      if(!token.sub) return token;
      const existingUser = await getUserById(token.sub)
      if(!existingUser) return token
      token['email'] = existingUser.email
      token['name'] = existingUser.name
      return token
    },  
  },
  ...authConfig,
})