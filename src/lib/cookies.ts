export const DEFAULT_COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 6, //6시간
};

interface CookieOptions {
  expires?: number | Date; // 만료일 (일 수 또는 Date 객체)
  maxAge?: number; // 초 단위 (3600 = 1시간, 86400 = 1일)
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * 쿠키 설정
 * @param name - 쿠키 이름
 * @param value - 쿠키 값
 * @param options - 쿠키 옵션
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const { maxAge, expires, path = '/', domain, secure = false, sameSite = 'lax' } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  // 만료일 설정
  if (expires) {
    let expiresDate: Date;

    if (typeof expires === 'number') {
      // 숫자면 일 수로 계산
      expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + expires);
    } else {
      // Date 객체면 그대로 사용
      expiresDate = expires;
    }

    cookieString += `; expires=${expiresDate.toUTCString()}`;
  }

  // Max-Age 설정 (초 단위)
  if (maxAge !== undefined) {
    cookieString += `; max-age=${maxAge}`;
  }

  // 경로 설정
  if (path) {
    cookieString += `; path=${path}`;
  }

  // 도메인 설정
  if (domain) {
    cookieString += `; domain=${domain}`;
  }

  // Secure 설정
  if (secure) {
    cookieString += '; secure';
  }

  // SameSite 설정
  if (sameSite) {
    cookieString += `; samesite=${sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * 쿠키 가져오기
 * @param name - 쿠키 이름
 * @returns 쿠키 값 또는 null
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();

    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * 쿠키 삭제
 * @param name - 쿠키 이름
 * @param options - 쿠키 옵션 (path, domain)
 */
export function deleteCookie(
  name: string,
  options: Pick<CookieOptions, 'path' | 'domain'> = {},
): void {
  setCookie(name, '', {
    ...options,
    maxAge: 0, // 0으로 설정하여 즉시 삭제
  });
}
