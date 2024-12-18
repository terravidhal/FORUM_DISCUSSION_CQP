import { z } from "zod";



// Subject schema
export const SubjectSchema = z.object({
  _id: z.string(),
  title: z
    .string()
    .min(4, { message: "The title must contain at least 4 characters" })
    .max(100, { message: "The title cannot exceed 100 characters" }),

  content: z
    .string()
    .min(10, { message: "Content must contain at least 10 characters" })
    .max(5000, { message: "Content cannot exceed 5000 characters" }),

  author: z
    .string()
    .min(24, { message: "Author ID must be a valid ObjectId" })
    .max(24, { message: "Author ID must be a valid ObjectId" }),

  Comments: z.array(z.string()).optional(),

  tags: z
    .array(z.enum(["science", "informatics", "history", "electronics"]))
    .refine(tags => tags?.length > 0, { message: "At least one tag is required" }),

  ratings: z
    .array(
      z.object({
        user: z
          .string()
          .min(24, { message: "User ID must be a valid ObjectId" })
          .max(24, { message: "User ID must be a valid ObjectId" }),
        value: z
          .number()
          .min(1, { message: "Rating must be at least 1" })
          .max(5, { message: "Rating cannot exceed 5" })
          .int({ message: "Rating must be an integer" }),
      })
    )
    .optional(),

  isDeleted: z.boolean().optional(),
});



// Create Subject schema 
export const createSubjectSchema = SubjectSchema.extend({
  _id: z.string().optional(),
  title: z.string().min(4).max(100),
  content: z.string().min(10).max(5000),
  author: z.string(),  
  Comments: z.array(z.string()).optional(),
  tags: z.array(z.enum(["science", "informatics", "history", "electronics"]))
    .refine(tags => tags?.length > 0, { message: "At least one tag is required" }),
  ratings: z.array(
    z.object({
      user: z.string(), 
      value: z
        .number()
        .min(1)
        .max(5)
        .int({ message: "Rating must be an integer" })
    })
  ).optional(),
});

// Update Subject schema (for updating an existing subject)
export const updateSubjectSchema = SubjectSchema.partial().extend({
  idSubjectUpdt: z.string().optional(),
});

export type Subject = z.infer<typeof SubjectSchema>;
export type createSubject = z.infer<typeof createSubjectSchema>;
export type updateSubject = z.infer<typeof updateSubjectSchema>;






