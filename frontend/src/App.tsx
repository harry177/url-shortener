import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreationForm } from "./components/CreationForm/CreationForm";
import "./App.css";
import { DeletionForm } from "./components/DeletionForm/DeletionForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CreationForm />
      <DeletionForm />
    </QueryClientProvider>
  );
}

export default App;
