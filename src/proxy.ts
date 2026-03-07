import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/shared/lib/prisma';

export async function proxy(request: NextRequest) {
    const userId = request.cookies.get('user_id')?.value;

    // Paths that don't require authentication
    if (request.nextUrl.pathname.startsWith('/(auth)') || request.nextUrl.pathname === '/') {
        return NextResponse.next();
    }

    // Check if user is authenticated
    if (!userId) {
        return NextResponse.redirect(new URL('/new', request.url));
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });

        if (!user) {
            return NextResponse.redirect(new URL('/new', request.url));
        }
    } catch (error) {
        console.error('Proxy auth check failed:', error);
        return NextResponse.redirect(new URL('/new', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/chat/:path*', '/(app)/:path*'],
};
