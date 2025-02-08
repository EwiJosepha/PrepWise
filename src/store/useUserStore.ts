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
  fetchUserDetails: (email: string) => Promise<void>;
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

        fetchUserDetails: async (email) => {
          try {
            const response = await fetch(`/api/auth/get-user?email=${email}`);
            if (!response.ok) throw new Error('Failed to fetch user details');
        
            const data = await response.json();
        
            set((state) => ({
              userInfo: {
                ...state.userInfo,
                id: data._id,
                firstName: data.firstName,
                lastName: data.lastName,
                isAuthenticated: true,
              },
            }));
          } catch (error) {
          }
        }
        ,
        

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
