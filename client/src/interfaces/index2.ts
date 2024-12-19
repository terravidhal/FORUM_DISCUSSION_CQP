import { z } from "zod";

// login
const passwordValidation = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
);
export const loginSchema = z.object({
  email: z.string().email({ message: "Enter valid email" }),
  password: z
    .string()
    .regex(passwordValidation, {
      message:
        "password must contain at least one lowercase letter, one uppercase letter, one number and one special character, and be at least 8 characters long.",
  }),
});

export type Login = z.infer<typeof loginSchema>;

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
export const VoteSubjectSchema = SubjectSchema.partial().extend({ 
    _id: z.string().optional(),
    title: z
      .string()
      .optional(),
  
    content: z
      .string()
      .optional(),
  
    author: z
      .string()
      .optional(),
  
    Comments: z.array(z.string()).optional(),
  
    tags: z
      .array(z.enum(["science", "informatics", "history", "electronics"]))
      .refine(tags => tags?.length > 0, { message: "At least one tag is required" })
      .optional(),

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
      subjectId : z.string().optional(),
});

export type Subject = z.infer<typeof SubjectSchema>;
export type createSubject = z.infer<typeof createSubjectSchema>;
export type voteSubject = z.infer<typeof VoteSubjectSchema>;







// Comment schema
export const CommentSchema = z.object({
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

  subjectId: z
    .string(),

  ratings: z
    .array(
      z.object({
        user: z
          .string(),
        value: z
          .number()
          .min(1, { message: "Rating must be at least 1" })
          .max(5, { message: "Rating cannot exceed 5" })
          .int({ message: "Rating must be an integer" }),
      })
    )
    .optional(),

});



// Create Comment schema (for creating a new comment)
export const createCommentSchema = CommentSchema.extend({
  _id: z.string().optional(),
  title: z.string().min(4).max(100),
  content: z.string().min(10).max(5000),
  author: z.string(), 
  subjectId: z.string(),  
  ratings: z.array(
    z.object({
      user: z.string().min(24).max(24), // User ID must be valid ObjectId
      value: z
        .number()
        .min(1)
        .max(5)
        .int({ message: "Rating must be an integer" })
    })
  ).optional(),
});

// Update Comment schema (for updating an existing comment)
export const voteCommentSchema = CommentSchema.partial().extend({
  _id: z.string().optional(),
  title: z.string().optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  subjectId: z.string().optional(), 
  ratings: z.array(
    z.object({
      user: z.string().min(24).max(24), // User ID must be valid ObjectId
      value: z
        .number()
        .min(1)
        .max(5)
        .int({ message: "Rating must be an integer" })
    })
  ).optional(),
  commentId : z.string().optional(),
});

export type Comment = z.infer<typeof CommentSchema>;
export type createComment = z.infer<typeof createCommentSchema>;
export type voteComment = z.infer<typeof voteCommentSchema>;







