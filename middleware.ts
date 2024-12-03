import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export const config = {
  matcher: '/(.*)',
}

export default function middleware(request: NextRequest) {
  const authorizationHeader = request.headers.get('authorization')

  if (authorizationHeader) {
    const basicAuth = authorizationHeader.split(' ')[1]
    const [user, password] = atob(basicAuth).toString().split(':')

    if (user === process.env.BASIC_AUTH_USER && password === process.env.BASIC_AUTH_PASSWORD) {
      // 認証通過
      return NextResponse.next()
    }
  }

  // 認証失敗
  return new Response('Basic Auth required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}
