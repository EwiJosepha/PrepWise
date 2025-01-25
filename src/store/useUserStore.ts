import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface UserInfo {
  id: string | null;
  email: string | null;
  firstName?: string | null;
  lastName?: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface UserState {
  userInfo: UserInfo;
  updateUserInfo: (userInfo: Partial<UserInfo>) => void;
  logout: () => void;
}

const initialUserInfo: UserInfo = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  token: null,
  isAuthenticated: false,
};

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userInfo: initialUserInfo,
      updateUserInfo: (userInfo) =>
        set((state) => ({
          userInfo: { ...state.userInfo, ...userInfo },
        })),
      logout: () =>
        set(() => ({
          userInfo: initialUserInfo,
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const updateUser = (userInfo: Partial<UserInfo>): void => {
  useUserStore.setState((state) => ({
    userInfo: { ...state.userInfo, ...userInfo },
  }));
};

export default useUserStore;
