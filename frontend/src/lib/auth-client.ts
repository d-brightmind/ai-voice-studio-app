import { polarClient } from "@polar-sh/better-auth/client"
import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL || "https://ai-voice-studio-app-alpha.vercel.app",
    /** The secret used to sign the tokens (optional if your server is configured to not require it) */
    secret: process.env.BETTER_AUTH_SECRET || undefined,
    plugins: [polarClient()]
})