// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_PATHS = ['/', '/login', '/register', '/api/auth/login', '/api/auth/register']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Allow public routes
  if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/_next')) {
    return NextResponse.next()
  }

  // Get token from cookies
  const token = req.cookies.get('token')?.value

  if (!token) {
    // Redirect to login if token is missing
    return NextResponse.redirect(new URL('/', req.url))
  }

  try {
    // Verify token
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!))
    return NextResponse.next()
  } catch (error) {
    // Invalid token
    return NextResponse.redirect(new URL('/', req.url))
  }
}

// Run middleware only on protected routes
export const config = {
  matcher: ['/dashboard/:path*'],
}
