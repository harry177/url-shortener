import { z } from "zod";
import { ShortUrlSchema } from "../../validation/schemas";

export const AnalyticsFormSchema = z.object({
  shortUrlLabel: ShortUrlSchema,
});

export type TAnalyticsFormSchema = z.infer<typeof AnalyticsFormSchema>;