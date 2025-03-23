import { z } from "zod";

export const OriginalUrlSchema = z.string();

export const ShortUrlSchema = z.string();

export const ExpiresAtSchema = z
  .union([z.date(), z.string().transform((val) => new Date(val))])
  .refine((date) => date >= new Date(0, 0, 0, 0, 0, 0, 0), {
    message: "Due date must not be in the past",
  }).optional();

export const AliasSchema = z.string().max(20).optional();