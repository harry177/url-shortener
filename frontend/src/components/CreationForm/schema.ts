import { z } from "zod";
import { AliasSchema, ExpiresAtSchema, OriginalUrlSchema } from "../../validation/schemas";

export const CreationFormSchema = z.object({
  originalUrlLabel: OriginalUrlSchema,
  expiresAtLabel: ExpiresAtSchema,
  aliasLabel: AliasSchema,
});

export type TCreationFormSchema = z.infer<typeof CreationFormSchema>;