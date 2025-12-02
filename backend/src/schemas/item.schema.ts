import { z } from "zod";

export const ItemSchema = z.object({
  title: z.string().min(1),
  city: z.string().min(1),
  price: z.number().int().positive(),
  surface: z.number().int().positive()
});

export const ItemParamsSchema = z.object({
  id: z.string().uuid()
});

export type ItemCreateDTO = z.infer<typeof ItemSchema>;
export type ItemParamsDTO = z.infer<typeof ItemParamsSchema>;
