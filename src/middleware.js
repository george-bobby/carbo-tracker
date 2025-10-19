import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	// Routes that can be accessed while signed out
	publicRoutes: ['/', '/api/ocr_extract'],
	//   ignoredRoutes: ['/'],
});

export const config = {
	matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
