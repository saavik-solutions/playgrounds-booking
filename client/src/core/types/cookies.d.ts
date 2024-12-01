export interface CookieOptions {
    path?: string;
    domain?: string;
    maxAge?: number; // Max age in seconds
    secure?: boolean; // HTTPS-only
    sameSite?: "Strict" | "Lax" | "None";
}
