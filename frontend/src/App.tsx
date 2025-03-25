import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreationForm } from "./components/CreationForm/CreationForm";
import { DeletionForm } from "./components/DeletionForm/DeletionForm";
import { InfoForm } from "./components/InfoForm/InfoForm";
import "./App.css";
import { AnalyticsForm } from "./components/AnalyticsForm/AnalyticsForm";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CreationForm />
      <DeletionForm />
      <InfoForm />
      <AnalyticsForm />
    </QueryClientProvider>
  );
}

export default App;
