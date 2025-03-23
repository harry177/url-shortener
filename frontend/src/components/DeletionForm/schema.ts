import { z } from "zod";
import { ShortUrlSchema } from "../../validation/schemas";

export const DeletionFormSchema = z.object({
  shortUrlLabel: ShortUrlSchema,
});

export type TDeletionFormSchema = z.infer<typeof DeletionFormSchema>;
