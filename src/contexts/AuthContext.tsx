import React, { createContext, useContext, useState, useCallback } from "react";
import type {
  AuthState,
  User,
  LoginCredentials,
  SignUpCredentials,
} from "../types";
import { mockUsers } from "../constants/mockData";

interface AuthContextType extends AuthState {
  signIn: (credentials: LoginCredentials) => Promise<boolean>;
  signUp: (credentials: SignUpCredentials) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const signIn = useCallback(
    async (credentials: LoginCredentials): Promise<boolean> => {
      // Simulate API call
      const user = mockUsers.find(
        (u) =>
          u.email === credentials.email && u.password === credentials.password
      );

      if (user) {
        const authUser: User = {
          id: user.id,
          email: user.email,
          username: user.username,
        };

        setAuthState({
          isAuthenticated: true,
          user: authUser,
        });

        return true;
      }

      return false;
    },
    []
  );

  const signUp = useCallback(
    async (credentials: SignUpCredentials): Promise<boolean> => {
      // Simulate API call
      if (credentials.password !== credentials.confirmPassword) {
        return false;
      }

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === credentials.email);
      if (existingUser) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        email: credentials.email,
        username: credentials.email.split("@")[0],
      };

      setAuthState({
        isAuthenticated: true,
        user: newUser,
      });

      return true;
    },
    []
  );

  const signOut = useCallback(() => {
    setAuthState({
      isAuthenticated: false,
      user: null,
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
