import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RadioInput } from "./RadioInput";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { useEffect } from "react";
import { SchemaType, bookingSchema } from "../schema/bookingform";

type BookingFormProps = {
  defaultValues?: unknown;
  onSubmit: (input: SchemaType) => void;
};

export const BookingForm = ({
  defaultValues = {},
  onSubmit,
}: BookingFormProps) => {
  const form = useForm<SchemaType>({
    defaultValues: parseDefaultValues(defaultValues),
    resolver: zodResolver(bookingSchema),
  });
  const trip = form.watch("trip");

  useEffect(() => {
    if (trip === "one-way") {
      form.resetField("return-date", {});
    }
  }, [form, trip]);

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col items-stretch gap-y-2 min-w-72"
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          console.log("errors", errors);
        })}
      >
        <div className="flex justify-center gap-x-4">
          <RadioInput
            value="one-way"
            label="Enkelresa"
            control={{ name: "trip" }}
          />
          <RadioInput
            value="round-trip"
            label="Tur & retur"
            control={{ name: "trip" }}
          />
        </div>
        <TextInput
          label="Avresedatum"
          control={{ name: "departure-date" }}
          placeholder="YYYY-MM-DD"
        />
        <TextInput
          label="Hemresedatum"
          control={{ name: "return-date", defaultValue: "" }}
          placeholder="YYYY-MM-DD"
          disabled={trip === "one-way"}
        />
        <Button type="submit" className="mt-4">
          Sök resa
        </Button>
      </form>
    </FormProvider>
  );
};

const parseDefaultValues = (defaultValues: unknown) => {
  try {
    return bookingSchema.parse(defaultValues);
  } catch (e) {
    return {
      trip: "one-way",
      "departure-date": new Date().toISOString().slice(0, 10),
    } satisfies SchemaType;
  }
};

/* 


● Form inputs can be set from query parameters
  Example: Visiting the page with ?departure=2021-12-31 should set the departure date.
  Invalid values are ignored.

*/
