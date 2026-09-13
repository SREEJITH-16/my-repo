import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";

type AdminSessionData = { authenticated?: boolean };

function sessionPassword() {
  return (process.env["SESSION_SECRET"] ?? "insecure-dev-only-secret-change-me-32ch")
    .padEnd(32, "0")
    .slice(0, 32);
}

const adminSession = createServerOnlyFn(() =>
  useSession<AdminSessionData>({
    name: "portfolio_admin",
    password: sessionPassword(),
    cookie: { sameSite: "lax" },
  }),
);

export const login = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => data as { password: string })
  .handler(async ({ data }) => {
    const expected = process.env["ADMIN_PASSWORD"];
    if (!expected) {
      return { ok: false, error: "ADMIN_PASSWORD is not configured on the server." };
    }
    if (data.password !== expected) {
      return { ok: false, error: "Incorrect password." };
    }
    const session = await adminSession();
    await session.update({ authenticated: true });
    return { ok: true };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const session = await adminSession();
  await session.clear();
  return { ok: true };
});

export const checkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const session = await adminSession();
  return { authenticated: Boolean(session.data.authenticated) };
});

/** Throws if the current request doesn't carry a valid admin session. Call only from within a createServerFn handler. */
export const assertAdmin = createServerOnlyFn(async () => {
  const session = await adminSession();
  if (!session.data.authenticated) {
    throw new Error("UNAUTHENTICATED");
  }
});
