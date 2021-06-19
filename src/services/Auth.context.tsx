import React, { useEffect, useState } from 'react';
import { RegisteredUser } from './apiClient';

interface AuthValues {
  user: RegisteredUser | null,
  login: (user: RegisteredUser) => void,
  logout: () => void,
}

interface AuthProviderProps extends Partial<React.ProviderProps<AuthValues>> {
  value?: AuthValues,
}

const AuthContext = React.createContext<AuthValues>({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<RegisteredUser | null>(null);

  const login = (authenthicatedUser: RegisteredUser) => {
    const encodedUser = encodeURIComponent(JSON.stringify(authenthicatedUser));
    const weekInSeconds = 604800;
    document.cookie = `user=${encodedUser};samesite=strict;max-age=${weekInSeconds}`;
    setUser(authenthicatedUser);
  };

  const logout = () => {
    document.cookie = 'user=null';
    setUser(null);
  };

  useEffect(() => {
    const [, cookieValue] = document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('user='))
      ?.split('=') ?? [];

    let cookieUser: RegisteredUser | null;
    try {
      cookieUser = JSON.parse(decodeURIComponent(cookieValue));
    } catch {
      cookieUser = null;
    }

    if (typeof cookieUser?.name === 'string' && typeof cookieUser?.email === 'string') {
      setUser(cookieUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }} {...props} />
  );
};

const useAuth = () => React.useContext(AuthContext);

export {
  AuthProvider,
  useAuth,
};
