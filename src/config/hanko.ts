import { Hanko } from "@teamhanko/hanko-frontend-sdk"

const HANKO_API_URL = import.meta.env.VITE_HANKO_API_URL || ""

let hankoInstance: Hanko | null = null

try {
  hankoInstance = new Hanko(HANKO_API_URL)
} catch (error) {
  console.error("Error initializing Hanko:", error)
}

export const hanko = hankoInstance 