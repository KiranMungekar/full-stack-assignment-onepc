import authConfig from '@/lib/auth.config'
import NextAuth from "next-auth"
import { DEFAULT_LOGIN_REDIRECT, publicRoutes, apiAuthPrefix, authRoutes } from '@/routes'


const {auth} = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  console.log("Route:: ", req.nextUrl.pathname)
  console.log("isLoggedIn? :: ", isLoggedIn)
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if(isApiAuthRoute) {
    console.log('Auth API route')
    return null
  }

  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }


  if(!isLoggedIn && !isPublicRoute){
    console.log('Allow this route')
    return Response.redirect(new URL("/auth/login", nextUrl))
  }

  console.log('Allow this route')
  return null;

})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}