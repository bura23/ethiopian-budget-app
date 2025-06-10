import { Hanko } from "@teamhanko/hanko-frontend-sdk"

const HANKO_API_URL = process.env.NEXT_PUBLIC_HANKO_API_URL || ""

let hankoInstance: Hanko | null = null

try {
  hankoInstance = new Hanko(HANKO_API_URL)
} catch (error) {
  console.error("Error initializing Hanko:", error)
}

export const hanko = hankoInstance 