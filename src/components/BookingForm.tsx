import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RadioInput } from "./RadioInput";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { useEffect } from "react";
import { SchemaType, bookingSchema } from "../schema/bookingform";

const getDefaultValues = () => {
  try {
    return bookingSchema.parse({});
  } catch (e) {
    return {
      trip: "one-way",
      "departure-date": new Date().toISOString().slice(0, 10),
    } satisfies SchemaType;
  }
};

export const BookingForm = () => {
  const form = useForm<SchemaType>({
    defaultValues: getDefaultValues(),
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
        onSubmit={form.handleSubmit(
          (data) => console.log("", data),
          (errors) => {
            console.log("errors", errors);
          },
        )}
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

/* 
● Choose and book one-way trip
  ○ This is the default option
  ○ The departure date cannot be earlier than today
  ○ The return date input is disabled

● Choose and book two-way trip
  ○ The return date input is enabled
  ○ The return date must be same or later than the departure date

● Form validation
  ○ Date inputs must – when submitted – be formatted as: yyyy-mm-dd
  ○ Dates can’t be in the past
  ○ The departure date must be before or equal to the return date
  ○ Invalid fields are highlighted visually
  ○ Specific error messages are either always displayed for invalid fields or can be accessed (on hover, on submit etc) 

  ● Form inputs can be set from query parameters
  Example: Visiting the page with ?departure=2021-12-31 should set the departure date.
  Invalid values are ignored.
● Styling
  ○ Vertically stack inputs
  ○ Center the form on the page, vertically and horizontally. Imagine that it should be possible to easily place elsewhere on a page.
  ○ Colors, font, logos and such are up to you. Surprise us with your creative flair!

● Have fun! 

*/
