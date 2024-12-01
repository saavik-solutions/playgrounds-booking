import { COOKIES } from "../core/contants";
import { CookieOptions } from "../core/types/cookies";

export const getCookie = (name: string = COOKIES.AUTH_TOKEN): string | undefined => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((cookie) => cookie.startsWith(`${encodeURIComponent(name)}=`));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : undefined;
};


export const removeCookie = (name: string, options: CookieOptions = {}): void => {
    const { path = "/", domain, secure, sameSite } = options;
    document.cookie = `${encodeURIComponent(name)}=; Path=${path}; Max-Age=0;`
        + (domain ? ` Domain=${domain};` : "")
        + (secure ? " Secure;" : "")
        + (sameSite ? ` SameSite=${sameSite};` : "");
};