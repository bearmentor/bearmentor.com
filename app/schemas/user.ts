import { z } from "zod"

const id = z.string().min(1, "Existing id is required")

const redirectTo = z.string().optional()

const username = z
  .string()
  .regex(/^[a-zA-Z0-9._]+$/, "Only alphabet, number, dot, underscore allowed")
  .min(4, "Username require at least 4 characters")
  .max(20, "Username limited to 20 characters")

const name = z
  .string()
  .min(1, "Full name is required")
  .max(50, "Full name limited to 50 characters")

const nick = z.string().max(50, "Nick name limited to 50 characters")

const email = z
  .string()
  .min(1, "Email is required")
  .email("This is not an email")

/**
 * Can improve password check
 * - Not only numbers
 * - Shouldn't match the email
 */
const password = z
  .string({ required_error: "Password is required" })
  .min(8, "Password at least 8 characters")
  .max(100, "Password max of 100 characters")
const confirmPassword = z.string()
const currentPassword = z
  .string({
    required_error: "Current password is required",
  })
  .min(1, "Current password is required")

const remember = z.boolean().optional()

const inviteBy = z.string().optional()
const inviteCode = z.string().optional()

const roleSymbol = z.string().min(1, "Role is required")

const tag = z.object({ id, symbol: z.string().optional() })
const tags = z.array(tag).optional()

const modeName = z.string().min(1, "Profile mode name is required")

const headline = z.string().max(50, "Headline limited to 50 characters")

const bio = z.string().max(1000, "Bio limited to 1000 characters").optional()

const link = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  text: z.string().optional(),
})
const links = z.array(link).optional()

export const schemaLink = link
export const schemaLinks = links

export const schemaUserSignUp = z.object({
  name,
  username,
  email,
  password,
  remember,
  inviteBy,
  inviteCode,
})

export const schemaUserSignIn = z.object({
  email,
  password,
  remember,
  redirectTo,
})

export const schemaUserUpdateUsername = z.object({ id, username })
export const schemaUserUpdateName = z.object({ id, name })
export const schemaUserUpdateNick = z.object({ id, nick })
export const schemaUserUpdateEmail = z.object({ id, email })

export const schemaUserProfileModeName = z.object({ id, modeName })
export const schemaUserProfileHeadline = z.object({ id, headline })
export const schemaUserProfileBio = z.object({ id, bio })
export const schemaUserProfileLinks = z.object({ id, links })

export const schemaUserUpdatePassword = z
  .object({
    id,
    currentPassword,
    password,
    confirmPassword,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords did not match",
      })
    }
  })

export const schemaUserUpdateTags = z.object({
  id,
  tags,
})

export const schemaAdminUserUpdate = z.object({
  id,
  username,
  name,
  nick,
  email,
  links,
  roleSymbol,
})
