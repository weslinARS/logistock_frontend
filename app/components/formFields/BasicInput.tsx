import { Label } from '@radix-ui/react-label';
import type { FieldValues, Path } from 'react-hook-form';
import { useController, useFormContext } from 'react-hook-form';
import type { BasicTypeInput, InputType } from '~/lib/types/formFields.type';
import { Input } from '../ui/input';
import { FieldErrorComponent } from './FieldError';
interface Props<T extends FieldValues> {
  placeholder: string;
  type: InputType | BasicTypeInput;
  fieldName: Path<T>;
  label: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}

interface Props<T extends FieldValues> {
  placeholder: string;
  type: InputType | BasicTypeInput;
  fieldName: Path<T>;
  label: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
}
export function BasicInput<T extends FieldValues>({
  placeholder,
  type,
  label,
  required = false,
  readOnly = false,
  disabled = false,
  fieldName,
}: Props<T>) {
  const { register } = useFormContext<T>();

  const {
    fieldState: { error },
  } = useController<T, Path<T>>({
    name: fieldName,
  });

  const registerOption =
    type === 'number'
      ? {
          valueAsNumber: true,
        }
      : undefined;
  return (
    <fieldset className="grid w-full max-w-sm items-center gap-3">
      <Label className="fieldset-legend">
        {label}
        {required && (
          <span className="text-error justify-self-center text-sm">*</span>
        )}
      </Label>

      <Input
        id={fieldName}
        type={type}
        placeholder={placeholder}
        className={`input border ${readOnly && 'disabled:bg-gray-100 cursor-not-allowed'} `}
        {...{ disabled, readOnly }}
        {...register(fieldName, registerOption)}
      />
      <FieldErrorComponent errors={error} key={`error-message-${fieldName}`} />
    </fieldset>
  );
}
