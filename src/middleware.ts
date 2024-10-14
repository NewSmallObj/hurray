// import withAuth from "next-auth/middleware"
// import { getToken } from 'next-auth/jwt';
// import { NextRequest, NextResponse,NextFetchEvent } from 'next/server'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// export default withAuth(
//   {
//     pages: {
//       signIn: "/",
//     },
//   }
// );

export const config = { 
  matcher: [
    "/admin/adm/:path*", // 拦截category下的所有路由 没有登录权限将跳转值 signIn 页面
  ]
};

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers)
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
  return response
}