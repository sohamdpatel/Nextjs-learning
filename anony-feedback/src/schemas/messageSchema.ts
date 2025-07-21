import {z} from 'zod'

export const messagesSchema = z.object({
    content: z
.string()
.min(10, "Content must be at least of 10 characters")
.max(300, "Content must be no more than 300 characters"),
})