import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { formData } from "./components/data";
import { FormContainer } from "./components/FormContainer/FormContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <h1>URL shortener</h1>
      </header>
      <main className="main">
        {formData.map((form, index) => (
          <FormContainer key={index} header={form.header} form={<form.form />}/>
        ))}
      </main>
    </QueryClientProvider>
  );
}

export default App;
