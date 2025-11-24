import { NextResponse, type NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { fallbackLng, languages, cookieName } from './app/i18n/settings'

acceptLanguage.languages(languages)

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|site.webmanifest).*)']
}

export function middleware(req: NextRequest) {
  let lng = req.cookies.has(cookieName)
    ? acceptLanguage.get(req.cookies.get(cookieName)?.value ?? undefined)
    : undefined
  if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language') ?? undefined)
  if (!lng) lng = fallbackLng

  const response = NextResponse.next()
  if (!req.cookies.has(cookieName)) {
    response.cookies.set(cookieName, lng)
  }
  return response
}
