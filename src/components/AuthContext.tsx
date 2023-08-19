'use client';

import { createContext, useState, ReactNode } from 'react';

type ContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  userID: string;
  setUserID: (userID: string) => void;
};

const AuthContext = createContext<ContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userID: '',
  setUserID: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userID, setUserID] = useState('');

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userID, setUserID }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
