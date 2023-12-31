import type { Broadcast } from "@prisma/client"

import { createNanoID, createSlug } from "~/utils"

export function createBroadcastSlug(title: Broadcast["title"]) {
  const slug: string = createSlug(title)
  return `${slug}-${createNanoID()}`
}
