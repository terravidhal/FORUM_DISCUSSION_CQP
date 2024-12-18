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

// field
export const FieldSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(4, { message: "The name must contain at least 4 characters" })
    .max(20, { message: "The name cannot exceed 20 characters" }),
  description: z
    .string()
    .min(4, { message: "Description must contain at least 4 characters" })
    .max(50, { message: "Description cannot exceed 20 characters" }),
  sessions: z.array(z.string()).optional(),
  students: z.array(z.string()).optional(),
});

export type Field = z.infer<typeof FieldSchema>;

export const createFieldSchema = FieldSchema.extend({
  _id: z.string().optional(),
  sessions: z.array(z.string()).optional(),
  students: z.array(z.string()).optional(),
});

export const updateFieldSchema = FieldSchema.partial().extend({
  idFieldUpdt: z.string().optional(),
});

export type createField = z.infer<typeof createFieldSchema>;

export type updateField = z.infer<typeof updateFieldSchema>;

// session

const sessionSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(4, { message: "The name must contain at least 4 characters" })
    .max(200, { message: "The name cannot exceed 20 characters" }),
  dateOfConductStart: z.string(),

  dateOfConductEnd: z.string(),

  dateOfCertif: z.string().optional(),

  field: z.string(),
  students: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
});

export type Session = z.infer<typeof sessionSchema>;

export const createSessionSchema = sessionSchema.extend({
  _id: z.string().optional(),
});

export const updateSessionSchema = sessionSchema.partial().extend({
  idSessionUpdt: z.string().optional(),
});

export type createSession = z.infer<typeof createSessionSchema>;
export type updateSession = z.infer<typeof updateSessionSchema>;

// students
const studentSchema = z.object({
  _id: z.string(),
  name: z
    .string()
    .min(4, { message: "The name must contain at least 4 characters" })
    .max(200, { message: "The name cannot exceed 20 characters" }),
  email: z.string().email({ message: "Enter valid email" }),
  levelStudent: z.number(),
  totalAmount: z.number(),
  remainingAmount: z.number().optional(),
  typeOfCertif: z.enum(["Seven_Academy", "Seven_Kids_Code"], {
    errorMap: () => ({ message: "Invalid certification type" }),
  }),
  
  field: FieldSchema,
  session: sessionSchema,
  AudLogCertif: z.array(z.string()).optional(),
  paymentIds: z.array(z.string()).optional(),
  createdAt: z.string().optional(),
});

export type student = z.infer<typeof studentSchema>;

export const createStudentSchema = studentSchema.extend({
  _id: z.string().optional(),
  field: z.string(),
  session: z.string(),
});

export const updateStudentSchema = z.object({
  _id: z.string().optional(),
  field: z.string(),
  session: z.string(),
  name: z.string().optional(),
  idStudentUpdt: z.string().optional(),
  levelStudent: z.number().optional(),
  totalAmount: z.number().optional(),
  remainingAmount: z.number().optional(),
  typeOfCertif: z
    .enum(["Seven_Academy", "Seven_Kids_Code"], {
      errorMap: () => ({ message: "Invalid certification type" }),
    })
    .optional(),
});

export type createStudent = z.infer<typeof createStudentSchema>;
export type updateStudent = z.infer<typeof updateStudentSchema>;
