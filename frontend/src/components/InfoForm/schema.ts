import { z } from "zod";
import { ShortUrlSchema } from "../../validation/schemas";

export const InfoFormSchema = z.object({
  shortUrlLabel: ShortUrlSchema,
});

export type TInfoFormSchema = z.infer<typeof InfoFormSchema>;
