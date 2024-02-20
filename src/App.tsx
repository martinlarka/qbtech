import "./App.css";
import { BookingForm } from "./components/BookingForm";

function App() {
  const params = Object.fromEntries(new URLSearchParams(location.search));

  return (
    <div className="grid items-center justify-center">
      <BookingForm
        defaultValues={params}
        onSubmit={(input) => {
          const searchParams = new URLSearchParams(input);
          window.location.search = searchParams.toString();
        }}
      />
    </div>
  );
}

export default App;
