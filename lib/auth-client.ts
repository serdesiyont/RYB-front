import { createAuthClient } from "better-auth/react";


const apiBase = process.env.NEXT_PUBLIC_APP_URL;

export const authClient = createAuthClient({
  baseURL: `${apiBase}/api/auth`,
});
