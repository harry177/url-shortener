import { ReactNode } from "react";

interface FormContainerProps {
  header: string;
  form: ReactNode;
}

export const FormContainer = ({ header, form }: FormContainerProps) => {
  return (
    <div className="form-container">
      <h2>{header}</h2>
      {form}
    </div>
  );
};
