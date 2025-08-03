import { type FieldError } from 'react-hook-form';

interface FieldErrorProps {
  errors?: FieldError;
}

export function FieldErrorComponent({ errors }: FieldErrorProps) {
  if (!errors || Object.keys(errors).length === 0) {
    return null;
  }
  return (
    <>
      <em className="text-xs text-error">
        {errors.message || 'An error occurred. Please check your input.'}
      </em>
    </>
  );
}
