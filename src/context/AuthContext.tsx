import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useStore } from "./StoreContext";

export type AuthUser = { id: string; name: string; email: string; role: "admin" | "user"; employeeId?: string };
type Ctx = {
  user: AuthUser | null;
  ready: boolean;
  login: (email: string, password: string, role: "admin" | "user") => string | null;
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
};
const AuthCtx = createContext<Ctx | null>(null);
const KEY = "kf_auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { state, add } = useStore();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setUser(JSON.parse(raw)); } catch { /* ignore */ }
    setReady(true);
  }, []);
  const persist = (u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(KEY, JSON.stringify(u)); else localStorage.removeItem(KEY);
  };

  const login: Ctx["login"] = (email, password, role) => {
    const u = state.users.find((x) => x.email.toLowerCase() === email.trim().toLowerCase() && x.password === password);
    if (!u) return "Invalid email or password";
    if (u.role !== role) return role === "admin" ? "This account is not an administrator" : "Please use the admin login for this account";
    if (u.status !== "Active") return "This account is disabled. Contact the foundation.";
    persist({ id: u.id, name: u.name, email: u.email, role: u.role, employeeId: u.employeeId });
    return null;
  };
  const register: Ctx["register"] = (name, email, password) => {
    if (state.users.some((x) => x.email.toLowerCase() === email.toLowerCase())) return "An account with this email already exists";
    const u = add("users", { name, email, password, role: "user", status: "Active", employeeId: "" });
    persist({ id: u.id, name, email, role: "user" });
    return null;
  };
  return <AuthCtx.Provider value={{ user, ready, login, register, logout: () => persist(null) }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth outside provider");
  return c;
}
