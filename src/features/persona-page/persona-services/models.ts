import { refineFromEmpty } from "@/features/common/schema-validation";
import { z } from "zod";

export const PERSONA_ATTRIBUTE = "PERSONA";
export type PersonaModel = z.infer<typeof PersonaModelSchema>;

export const PersonaModelSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z
    .string({
      invalid_type_error: "Invalid title",
    })
    .min(1)
    .refine(refineFromEmpty, "Title cannot be empty"),
  description: z
    .string({
      invalid_type_error: "Invalid description",
    })
    .min(1)
    .refine(refineFromEmpty, "Description cannot be empty"),
  personaMessage: z
    .string({
      invalid_type_error: "Invalid persona Message",
    })
    .min(1)
    .refine(refineFromEmpty, "System message cannot be empty"),
  extensionIds: z.array(z.string()),
  isPublished: z.boolean(),
  type: z.literal(PERSONA_ATTRIBUTE),
  createdAt: z.date(),
});

export interface AccessGroup {
  id: string;
  name: string;
  description: string;
}

export interface DocumentMetadata extends SharePointPickedFile {
    name: string;
    createdBy: string;
    createdDateTime: string;
}

export interface SharePointPickedFile {
  id: string;
  parentReference: {
    driveId: string;
  };
}