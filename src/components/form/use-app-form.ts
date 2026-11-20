import { createFormHook } from "@tanstack/react-form";
import {
  CheckboxField,
  HoneypotField,
  SelectField,
  SubmitButton,
  TextareaField,
  TextField,
} from "./fields";
import { fieldContext, formContext } from "./form-context";

/** App-wide TanStack Form hook with the shadcn field components pre-bound. */
export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
    TextareaField,
    SelectField,
    CheckboxField,
    HoneypotField,
  },
  formComponents: { SubmitButton },
});
