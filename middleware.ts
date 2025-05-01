import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
const isProtectedRoute = createRouteMatcher([
  '/upload(.*)',
  '/upload',
  '/upload/',
  '/upload/(.*)',
]);
export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect(has => {
      return (
        has({ permission: 'org:admin' }) ||
        has({ permission: 'org:marketing_admin:sami' }) ||
        has({ permission: 'org:main_admin:admin' })
      );
    });
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
