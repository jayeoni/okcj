import { newRidgeState } from 'react-ridge-state';
import { UserType } from 'src/hooks';

export const tokenState = newRidgeState<string | null>(null, {
  onSet: async (newState) => {
    if (newState) {
      localStorage.setItem('token', newState);
    } else {
      localStorage.removeItem('token');
    }
  },
});

export const userState = newRidgeState<UserType | null>(null, {
  onSet: async (newState) => {
    if (newState) {
      localStorage.setItem('user', JSON.stringify(newState));
    } else {
      localStorage.removeItem('token');
    }
  },
});

export const adminTokenState = newRidgeState<string | null>(null, {
  onSet: async (newState) => {
    if (newState) {
      localStorage.setItem('adminToken', newState);
    } else {
      localStorage.removeItem('adminToken');
    }
  },
});

export const osState = newRidgeState<string>('');
export const resetQueryClientState = newRidgeState<boolean>(false);

function setInitialState() {
  if (typeof window === 'undefined') {
    return;
  }
  const user = localStorage.getItem('user');
  if (user) {
    try {
      userState.set(JSON.parse(user));
    } catch (error) {}
  }

  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  tokenState.set(token);
  adminTokenState.set(adminToken);
}

setInitialState();
