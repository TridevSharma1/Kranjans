import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Field } from "./ui";
import { Icon } from "./Icon";
import { useAuth } from "@/context/AuthContext";

type Mode = "login" | "register" | "forgot";

export function AuthCard({ role, allowRegister = false, demo, initialMode = "login" }: { role: "admin" | "user"; allowRegister?: boolean; demo: string; initialMode?: Mode }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    if (mode === "forgot") { setError(null); setNotice(`If ${email} is registered, a reset link has been sent (demo).`); return; }
    const err = mode === "login" ? login(email, password, role) : register(String(fd.get("name") || ""), email, password);
    if (err) { setError(err); return; }
    navigate({ to: role === "admin" ? "/admin/dashboard" : "/user/dashboard" });
  };
  const switchTo = (m: Mode) => { setMode(m); setError(null); setNotice(null); };
  const title = mode === "forgot" ? "Reset Password" : mode === "register" ? "Create Account" : role === "admin" ? "Admin Login" : "Member Login";

  return (
    <div className="card-soft p-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground"><Icon name={role === "admin" ? "lock" : "user"} className="h-7 w-7" /></div>
      <h1 className="mt-4 text-center text-2xl font-semibold">{title}</h1>
      {error && <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">{error}</p>}
      {notice && <p className="mt-4 rounded-xl bg-mint px-4 py-3 text-sm font-medium text-primary">{notice}</p>}
      <form onSubmit={submit} className="mt-6 grid gap-4">
        {mode === "register" && <Field label="Full Name *"><input name="name" required className="input-field" /></Field>}
        <Field label="Email *"><input name="email" type="email" required className="input-field" /></Field>
        {mode !== "forgot" && <Field label="Password *"><input name="password" type="password" required className="input-field" /></Field>}
        <button className="btn btn-primary w-full">{mode === "forgot" ? "Send Reset Link" : mode === "register" ? "Create Account" : "Sign In"}</button>
      </form>
      <div className="mt-5 flex flex-wrap justify-between gap-2 text-sm">
        {mode === "login" ? <button className="font-semibold text-primary hover:underline" onClick={() => switchTo("forgot")}>Forgot password?</button>
          : <button className="font-semibold text-primary hover:underline" onClick={() => switchTo("login")}>Back to sign in</button>}
        {allowRegister && mode === "login" && <button className="font-semibold text-primary hover:underline" onClick={() => switchTo("register")}>Create an account</button>}
      </div>
      <p className="mt-6 rounded-xl bg-muted px-4 py-3 text-center text-xs text-muted-foreground">Demo: {demo}</p>
    </div>
  );
}
