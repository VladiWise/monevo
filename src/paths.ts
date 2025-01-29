/**
 * An array of public routes
 * These routes can be accessed without authentication
 * @type {string[]}
 */

export const publicRoutes = ["/"];


/**
 * An array of private routes
 * These routes require authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/api/users", "/auth/error"];


/**
 * The prefix for the API routes
 * @type {string}
 */
export const apiAuthPrefix = "/api/";

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";