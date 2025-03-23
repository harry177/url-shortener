import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreationForm } from "./components/CreationForm/CreationForm";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CreationForm />
    </QueryClientProvider>
  );
}

export default App;
