import { cn } from "@/lib/utils";
import Input, { InputProps } from "../atoms/Input";
import Label from "../atoms/Label";

interface FormFieldProps extends Omit<InputProps, "error"> {
  label: string;
  error?: string;
  required?: boolean;
  helperText?: string;
}

export default function FormField({
  label,
  error,
  required,
  helperText,
  id,
  ...inputProps
}: FormFieldProps) {
  const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1">
      <Label htmlFor={fieldId} required={required}>
        {label}
      </Label>
      <Input id={fieldId} error={!!error} {...inputProps} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {helperText && !error && (
        <p className="text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
}
