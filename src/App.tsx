import { useState } from "react";
import "./App.css";
import { BookingForm } from "./components/BookingForm";
import { SchemaType } from "./schema/bookingform";
import { BookingResult } from "./components/BookingResult";

function App() {
  const params = Object.fromEntries(new URLSearchParams(location.search));
  const [result, setResult] = useState<SchemaType>();
  return (
    <div className="grid items-center justify-center">
      <BookingForm
        defaultValues={params}
        onSubmit={(input) => {
          setResult(input);
          const searchParams = new URLSearchParams(input);
          const newurl = `${window.location.origin}?${searchParams.toString()}`;
          window.history.pushState({ path: newurl }, "", newurl);
        }}
      />
      {result ? <BookingResult result={result} /> : null}
    </div>
  );
}

export default App;
