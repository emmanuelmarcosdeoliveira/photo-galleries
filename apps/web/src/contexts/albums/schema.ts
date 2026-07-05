import { z } from "zod";

export const albumNewSchema = z.object({
  title: z.string().min(1, { message: "Campo obrigatório" }).max(255),
  photoIds: z.array(z.string().uuid()).optional(),
});

export type AlbumNewFromSchema = z.infer<typeof albumNewSchema>;
