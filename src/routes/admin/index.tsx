import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { login } from "@/lib/admin-auth";
import { SiteBackground } from "@/components/SiteBackground";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Login — Sreejith S" }] }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login({ data: { password } });
      if (res.ok) {
        navigate({ to: "/admin/dashboard" });
      } else {
        setError(res.error ?? "Login failed.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4">
      <SiteBackground />
      <form onSubmit={onSubmit} className="card-surface w-full max-w-sm p-8">
        <p className="eyebrow">Admin</p>
        <h1 className="mt-2 text-2xl">Content Login</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to edit portfolio content.</p>
        <div className="mt-6">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-foreground"
          />
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn-primary mt-6 w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Forgot your password? It&apos;s set as <code>ADMIN_PASSWORD</code> in your environment
          variables — see <code>.env.example</code> in the project.
        </p>
      </form>
    </div>
  );
}
