import { z } from "zod";
import { isDateBefore, isDateBeforeNow } from "../helpers/date";

const dateRegex = /^\d{4}-([0]\d|1[0-2])-([0-2]\d|3[01])$/;

const dateErrorMessage = "Avresedatum krävs";

const oneWaySchema = z.object({
  trip: z.literal("one-way").default("one-way"),
  "departure-date": z
    .string({
      required_error: dateErrorMessage,
    })
    .length(10, "Felaktigt format")
    .regex(dateRegex, "Fel format")
    .default(new Date().toISOString().slice(0, 10))
    .refine(
      (value) => !isDateBeforeNow(value),
      "Avresedatum kan inte vara innan idag",
    ),
});

const roundTripSchema = z
  .object({
    trip: z.literal("round-trip"),
    "departure-date": z
      .string({ required_error: dateErrorMessage })
      .length(10, "Felaktigt format")
      .regex(dateRegex, "Fel format")
      .default(new Date().toISOString().slice(0, 10))
      .refine(
        (value) => !isDateBeforeNow(value),
        "Avresedatum kan inte vara innan idag",
      ),
    "return-date": z
      .string({ required_error: dateErrorMessage })
      .length(10, "Felaktigt format")
      .regex(dateRegex, "Fel format"),
  })
  .refine(
    (check) => !isDateBefore(check["return-date"], check["departure-date"]),
    {
      message: "Hemresedatum kan inte vara innan avresedatum",
      path: ["return-date"],
    },
  );

export const bookingSchema = oneWaySchema.or(roundTripSchema);

export type SchemaType = z.infer<typeof bookingSchema>;
