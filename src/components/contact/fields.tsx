import type { ChangeEvent, FocusEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldShellProps {
  id: string;
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
  children: (props: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    "aria-required": boolean | undefined;
  }) => ReactNode;
}

const controlClass =
  "block w-full min-h-11 border bg-card px-4 py-3 text-text placeholder:text-text-secondary transition-colors duration-200 focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

function controlBorder(hasError: boolean) {
  return hasError ? "border-[#ff6b6b]" : "border-border hover:border-text-muted";
}

/** Label, hint and error wiring shared by every control. */
function FieldShell({ id, label, required, hint, error, className, children }: FieldShellProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-medium text-text">
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-accent">
            *
          </span>
        ) : (
          <span className="ml-2 text-xs font-normal text-text-secondary">Optional</span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="mt-1 text-sm text-text-secondary">
          {hint}
        </p>
      )}
      <div className="mt-2">
        {children({
          id,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": describedBy,
          "aria-required": required ? true : undefined,
        })}
      </div>
      {error && (
        <p id={errorId} className="mt-2 text-sm text-[#ff8a8a]">
          {error}
        </p>
      )}
    </div>
  );
}

interface BaseFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  required?: boolean;
  hint?: string;
  error?: string;
  className?: string;
}

interface TextFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  maxLength: number;
  placeholder?: string;
  inputMode?: "text" | "email" | "tel" | "url";
}

export function TextField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  required,
  hint,
  error,
  className,
  type = "text",
  autoComplete,
  maxLength,
  placeholder,
  inputMode,
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      {(aria) => (
        <input
          {...aria}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          maxLength={maxLength}
          placeholder={placeholder}
          inputMode={inputMode}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(name, event.target.value)}
          onBlur={(event: FocusEvent<HTMLInputElement>) => onBlur(event.target.name)}
          className={cn(controlClass, controlBorder(Boolean(error)))}
        />
      )}
    </FieldShell>
  );
}

interface TextAreaFieldProps extends BaseFieldProps {
  maxLength: number;
  rows?: number;
  placeholder?: string;
}

export function TextAreaField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  required,
  hint,
  error,
  className,
  maxLength,
  rows = 5,
  placeholder,
}: TextAreaFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      {(aria) => (
        <textarea
          {...aria}
          name={name}
          value={value}
          rows={rows}
          maxLength={maxLength}
          placeholder={placeholder}
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(name, event.target.value)}
          onBlur={(event: FocusEvent<HTMLTextAreaElement>) => onBlur(event.target.name)}
          className={cn(controlClass, "resize-y", controlBorder(Boolean(error)))}
        />
      )}
    </FieldShell>
  );
}

interface SelectFieldProps extends BaseFieldProps {
  options: readonly string[];
  placeholder?: string;
}

export function SelectField({
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  required,
  hint,
  error,
  className,
  options,
  placeholder = "Select an option",
}: SelectFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      {(aria) => (
        <div className="relative">
          <select
            {...aria}
            name={name}
            value={value}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => onChange(name, event.target.value)}
            onBlur={(event: FocusEvent<HTMLSelectElement>) => onBlur(event.target.name)}
            className={cn(
              controlClass,
              "appearance-none pr-10",
              value ? "text-text" : "text-text-secondary",
              controlBorder(Boolean(error)),
            )}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option} value={option} className="text-text">
                {option}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-1/2 h-2 w-2 -translate-y-[70%] rotate-45 border-b border-r border-text-secondary"
          />
        </div>
      )}
    </FieldShell>
  );
}
