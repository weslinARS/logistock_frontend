import { useId } from 'react';
import {
  useController,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { getValueFromObject } from '~/lib/utils/getValueFromObject.util';
import { Select, SelectItem } from '../ui/select';
import { FieldErrorComponent } from './FieldError';

interface SelectProps<F extends object, T extends FieldValues> {
  fieldName: Path<T>;
  objectArray: Array<F>;
  valueKey: string | Array<string>;
  optionContentKey: string | Array<string>;
  label: string;
  placeHolder?: string;
  isDisable?: boolean;
  additionalContentKey?: string;
  required?: boolean;
}

/**
 * A generic `SelectInput` component for rendering a dropdown menu with customizable options.
 * This component is designed to work with a typed array of objects and provides flexibility
 * in specifying keys for values and display content.
 *
 * @template F - The type of the objects in the `objectArray`.
 * @template T - The type of the form values.
 *
 * @param {T[]} [objectArray=[]] - The array of objects used to populate the dropdown options.
 * @param {keyof T} valueKey - The key in the object used to determine the value of each option.
 * @param {string} label - The label displayed above the dropdown.
 * @param {keyof T} optionContentKey - The key in the object used to determine the main content of each option.
 * @param {keyof T} [additionalContentKey] - An optional key in the object used to append additional content to the option.
 * @param {string} [placeHolder=''] - The placeholder text displayed as the first option in the dropdown.
 * @param {boolean} [isDisable=false] - Whether the dropdown is disabled.
 * @param {boolean} [required=false] - Whether the field is required. Displays an asterisk (*) if true.
 * @param {FieldProps} field - The field object containing state and event handlers for the dropdown.
 *
 * @returns {JSX.Element} The rendered `SelectInput` component.
 */
export function SelectInput<F extends object, T extends object>({
  objectArray = [],
  valueKey,
  label,
  optionContentKey,
  additionalContentKey,
  placeHolder = '',
  isDisable = false,
  required = false,
  fieldName,
}: SelectProps<F, T>) {
  const { control } = useFormContext<T>();

  const {
    fieldState: { error },
    field,
  } = useController<T, Path<T>>({
    control,
    name: fieldName,
    defaultValue: undefined,
  });
  return (
    <fieldset className="fieldset w-[300px]">
      <legend className="fieldset-legend">
        {label} {required && <span className="text-error text-sm">*</span>}
      </legend>
      <Select {...{ disabled: isDisable }} {...field}>
        <SelectItem key={useId()} value="" disabled>
          {placeHolder ? placeHolder : label}
        </SelectItem>
        {objectArray.map((object: F) => {
          const id = getValueFromObject(object, valueKey, false);
          const content = getValueFromObject(
            object,
            optionContentKey,
            additionalContentKey !== undefined,
            additionalContentKey,
          );
          return (
            <SelectItem value={id} key={id}>
              {content}
            </SelectItem>
          );
        })}
      </Select>
      <FieldErrorComponent errors={error} key={`error-message-${fieldName}`} />
    </fieldset>
  );
}
