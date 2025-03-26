import { AnalyticsForm } from "./AnalyticsForm/AnalyticsForm";
import { CreationForm } from "./CreationForm/CreationForm";
import { DeletionForm } from "./DeletionForm/DeletionForm";
import { InfoForm } from "./InfoForm/InfoForm";

export const formData = [
    {header: "Create short URL", form: CreationForm},
    {header: "Delete short URL", form: DeletionForm},
    {header: "Get info about short URL", form: InfoForm},
    {header: "Get analytics about short URL", form: AnalyticsForm},
]