"use client";
//TODO: move provider to providers components
import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ToastMessage } from "@/components/toast-message";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  needsOnboarding?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === "admin@example.com" && password === "password") {
        const user = {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
          needsOnboarding: false,
        };
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(
          <ToastMessage title="Login Successful" description="Welcome back!" />,
        );
        router.push("/app");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error(
        <ToastMessage
          title="Login Failed"
          description={
            error instanceof Error ? error.message : "An error occurred"
          }
        />,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const user = {
        id: "2",
        email,
        name: name || "New User",
        role: "user",
        needsOnboarding: !localStorage.getItem("onboarding_completed"),
        password,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success(
        <ToastMessage
          title="Registration Successful"
          description="Your account has been created!"
        />,
      );

      // Check if onboarding is needed
      if (user.needsOnboarding) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(
        <ToastMessage
          title="Registration Failed"
          description={
            error instanceof Error ? error.message : "An error occurred"
          }
        />,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("onboarding_completed");
    router.push("/signin");
    toast(
      <ToastMessage
        title="Logout Successful"
        description="You have been logged out"
      />,
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
