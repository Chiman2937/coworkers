'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { signIn, signUp } from '@/api/endpoints/auth/auth';
import { getUser } from '@/api/endpoints/user/user';
import { SignInRequestBody, SignInResponseUser, SignUpRequestBody } from '@/api/models';
import { DEFAULT_COOKIE_OPTIONS, deleteCookie, getCookie, setCookie } from '@/lib/cookies';

interface AuthStore {
  user: SignInResponseUser | null;
  setUser: () => Promise<void>;
  resetUser: () => void;
  signup: (payload: SignUpRequestBody) => Promise<void>;
  signin: (payload: SignInRequestBody) => Promise<void>;
  signout: () => Promise<void>;
  userInitialize: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools((set, get) => ({
    user: null,
    setUser: async () => {
      const user = await getUser();
      set({ user });
      localStorage.setItem('user', JSON.stringify(user));
    },
    resetUser: () => {
      set({ user: null });
      localStorage.removeItem('user');
    },
    signup: async (payload) => {
      const { user, accessToken, refreshToken } = await signUp(payload);
      setCookie('accessToken', accessToken, DEFAULT_COOKIE_OPTIONS);
      setCookie('refreshToken', refreshToken, DEFAULT_COOKIE_OPTIONS);
      setCookie('isAuthenticated', 'true', DEFAULT_COOKIE_OPTIONS);
      await get().setUser();
      if (user) console.log('[DEBUG] Signup success');
    },
    signin: async (payload) => {
      const { user, accessToken, refreshToken } = await signIn(payload);
      setCookie('accessToken', accessToken, DEFAULT_COOKIE_OPTIONS);
      setCookie('refreshToken', refreshToken, DEFAULT_COOKIE_OPTIONS);
      setCookie('isAuthenticated', 'true', DEFAULT_COOKIE_OPTIONS);
      await get().setUser();
      if (user) console.log('[DEBUG] Signin success');
    },
    signout: async () => {
      deleteCookie('accessToken', { path: '/' });
      deleteCookie('refreshToken', { path: '/' });
      deleteCookie('isAuthenticated', { path: '/' });
      get().resetUser();
      console.log('[DEBUG] Signout success');
    },
    userInitialize: async () => {
      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      // localStorage에 유저 정보 저장되어있고 Token이 유효할 때 유저 정보 리로드
      if ((accessToken || refreshToken) && user) {
        set({ user });
        console.log('[DEBUG] User Reload Success');
      }
      // localStorage에 유저 정보 저장되어있지만 Token이 유효하지 않을때 유저 정보 삭제
      else if (!(accessToken || refreshToken) && user) {
        get().signout();
        console.log('[DEBUG] Session Timeout');
      }
    },
  })),
);

export default useAuthStore;
