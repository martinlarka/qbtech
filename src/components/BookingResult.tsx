import { SchemaType } from "../schema/bookingform";

export const BookingResult = ({ result }: { result: SchemaType }) => {
  return (
    <div>
      <p>Restyp: {result.trip}</p>
      <p>Avresa: {result["departure-date"]}</p>
      {result.trip === "round-trip" ? (
        <p>Avresa: {result["return-date"]}</p>
      ) : null}
    </div>
  );
};
