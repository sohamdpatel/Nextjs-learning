import { log } from 'console'
import { NextResponse } from 'next/server'

export async function POST() {
    console.log('Logout request received')
  const response = NextResponse.json({ message: 'Logout successful' })

  // Clear the 'token' cookie
  response.cookies.set('token', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    expires: new Date(0), // expire the cookie immediately
  })

  return response
}
