// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import { getRolesFromToken } from "@/utils/token";
// import { authService } from "@/features/auth/services/authService";
// import { AuthResponse } from "@/core/types/Auth";
// import { LoginPayload } from "@/features/auth/types/types";
// import { toast } from "sonner";

// interface AuthContextProps {
//   user: string | null;
//   roles: string[];
//   isAuthenticated: boolean;
//   login: (payload: LoginPayload) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<string | null>(null);
//   const [roles, setRoles] = useState<string[]>([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const router = useRouter();

//   // Simulate session restoration on initial load
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       const extractedRoles = getRolesFromToken(token);
//       setRoles(extractedRoles);
//       const savedUser = localStorage.getItem("user");
//       setUser(savedUser); 
//       setIsAuthenticated(true);
//     }
//   }, []);

// const login = async (payload: LoginPayload) => {
//     try {
//       const response: AuthResponse = await authService.login(payload);
//       const { accessToken, user } = response;

//       // Save token, user, and roles
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("user", JSON.stringify(user)); // Save user to localStorage
//       const extractedRoles = getRolesFromToken(accessToken);
//       setRoles(extractedRoles);
//       setUser(user.email); // Use actual user data
//       setIsAuthenticated(true);

//       // Redirect based on roles
//       if (extractedRoles.includes("admin")) {
//         router.push("/admin/dashboard");
//       } else if (extractedRoles.includes("user")) {
//         router.push("/user/dashboard");
//       } else {
//         toast.error("Unknown role");
//       }
//     } catch (error) {
//       toast.error("Login failed. Please check your credentials.");
//       throw error;
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     setUser(null);
//     setRoles([]);
//     setIsAuthenticated(false);
//     router.push("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ user, roles, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// };
