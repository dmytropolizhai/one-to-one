import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    const userId = request.cookies.get('user_id')?.value;
    const { pathname } = request.nextUrl;

    // Paths that don't require authentication
    const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/new');
    const isHomePage = pathname === '/';

    if (isAuthPage || isHomePage) {
        // If user is already logged in and tries to access login/new, redirect to chat
        if (userId && isAuthPage) {
            return NextResponse.redirect(new URL('/chat', request.url));
        }
        return NextResponse.next();
    }

    // Check if user has the session cookie
    if (!userId) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
