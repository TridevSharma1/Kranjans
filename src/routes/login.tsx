import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SiteLayout } from "@/layouts/SiteLayout";
import { Field } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Kranjal Foundation" },
      { name: "description", content: "Sign in or create your Kranjal Foundation member account." },
      { property: "og:title", content: "Login — Kranjal Foundation" },
      { property: "og:description", content: "Sign in or create your member account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Login,
});

function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const err = mode === "login"
      ? login(email, password, "user")
      : register(String(fd.get("name") || ""), email, password);
    if (err) { setError(err); return; }
    setError(null);
    navigate({ to: "/user/dashboard" });
  };

  return (
    <SiteLayout>
      <section className="mx-auto flex max-w-md flex-col px-6 py-20">
        <div className="card-soft p-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground"><Icon name="user" className="h-7 w-7" /></div>
          <h1 className="mt-4 text-center text-2xl font-semibold">{mode === "login" ? "Member Login" : "Create Account"}</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">{mode === "login" ? "Access your certificates, letters and donations." : "Register to track your engagement with us."}</p>
          {error && <p className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">{error}</p>}
          <form onSubmit={submit} className="mt-6 grid gap-4">
            {mode === "register" && <Field label="Full Name *"><input name="name" required className="input-field" /></Field>}
            <Field label="Email *"><input name="email" type="email" required className="input-field" /></Field>
            <Field label="Password *"><input name="password" type="password" required className="input-field" /></Field>
            <button className="btn btn-primary w-full">{mode === "login" ? "Sign In" : "Create Account"}</button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "login" ? "New here?" : "Already registered?"}{" "}
            <button className="font-bold text-primary underline" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(null); }}>
              {mode === "login" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
        <p className="mt-6 text-center text-xs text-muted-foreground">Administrator? <a className="font-bold text-primary underline" href="/admin/login">Use the admin login</a></p>
      </section>
    </SiteLayout>
  );
}
