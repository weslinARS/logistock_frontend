import type { ReactNode } from 'react';
import type { Path } from 'react-hook-form';
import type { z } from 'zod';

// --- 1. Definiciones base ---
export type InputType =
  | 'text'
  | 'password'
  | 'email'
  | 'number'
  | 'tel'
  | 'date'
  | 'datetime-local'
  | 'file'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'textarea';
export type BasicTypeInput =
  | 'text'
  | 'number'
  | 'password'
  | 'email'
  | 'date'
  | 'time'
  | 'textarea';

export interface BaseInputProps<T> {
  label?: string;
  fieldName: Path<T>;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  type?: InputType;
  icon?: ReactNode;
  dependentGuard?: ReactNode;
  showIf?: (values: T) => boolean;
}

// Factory para crear un BaseInputProps (podrías obviar esta función y usar literales)
export function createBaseInput<T>(
  props: BaseInputProps<T>,
): BaseInputProps<T> {
  return {
    ...props,
    required: props.required ?? false,
  };
}

// --- 2. Inputs de tipo Array ---
export interface ArrayItemProps<T> {
  label: string;
  fieldName: Path<T>;
  placeholder?: string;
  readOnly?: boolean;
  type: BasicTypeInput;
  icon?: string;
}

export interface ArrayInputProps<T> extends BaseInputProps<T> {
  items: Array<ArrayItemProps<T>>;
  itemName: string;
}

// Factory
export function createArrayInput<T>(
  props: ArrayInputProps<T>,
): ArrayInputProps<T> {
  return createBaseInput(props) as ArrayInputProps<T>;
}

// --- 3. Inputs de tipo Select ---
export interface SelectConfig<O> {
  options: Array<O>;
  valueKey: keyof O | Array<keyof O>;
  labelKey: keyof O | Array<keyof O>;
  additionalContentKey?: keyof O;
}

export interface SelectInputProps<T, O> extends BaseInputProps<T> {
  selectConfig: SelectConfig<O>;
}

export function createSelectInput<T, O>(
  props: SelectInputProps<T, O>,
): SelectInputProps<T, O> {
  return createBaseInput(props) as SelectInputProps<T, O>;
}

// --- creatableSelect
export interface CreatableSelectConig {
  options: Array<string>;
}
export interface CreatableSelectInputProps<T> extends BaseInputProps<T> {
  creatableSelectConfig: CreatableSelectConig;
}

export function createCreatableSelectInput<T>(
  props: CreatableSelectInputProps<T>,
): CreatableSelectInputProps<T> {
  return createBaseInput(props) as CreatableSelectInputProps<T>;
}

// --- 4. Inputs complejos (ReactNode directo) ---
export interface ComplexInputProps<T> {
  fieldName: Path<T>;
  component: ReactNode;
}

export function createComplexInput<T>(
  props: ComplexInputProps<T>,
): ComplexInputProps<T> {
  return props;
}

// 1) ArrayInputProps → tiene `items`
export function isArrayInput<T>(
  input: InputDefinition<T>,
): input is ArrayInputProps<T> {
  return 'items' in input && Array.isArray((input as any).items);
}

// 2) SelectInputProps → tiene `selectConfig`
export function isSelectInput<T>(
  input: InputDefinition<T>,
): input is SelectInputProps<T, any> {
  return 'selectConfig' in input;
}
// 2.1) CreatableSelectInputProps → tiene `creatableSelectConfig`
export function isCreatableSelectInput<T>(
  input: InputDefinition<T>,
): input is CreatableSelectInputProps<T> {
  return 'creatableSelectConfig' in input;
}
// 3) ComplexInputProps → tiene `component`
export function isComplexInput<T>(
  input: InputDefinition<T>,
): input is ComplexInputProps<T> {
  return 'component' in input;
}

// 4) BaseInputProps → es “lo que queda”
export function isBaseInput<T>(
  input: InputDefinition<T>,
): input is ReturnType<typeof createBaseInput<T>> {
  return (
    !isArrayInput(input) && !isSelectInput(input) && !isComplexInput(input)
  );
}

// --- 5. Unión de todos los inputs ---
export type InputDefinition<T> =
  | ReturnType<typeof createBaseInput<T>>
  | ReturnType<typeof createArrayInput<T>>
  | ReturnType<typeof createSelectInput<T, any>>
  | ReturnType<typeof createCreatableSelectInput<T>>
  | ReturnType<typeof createComplexInput<T>>;

// --- 6. Columnas de formulario ---
export interface ColumnTitle {
  title: string;
  icon?: ReactNode;
}

export interface FormColumn<T> {
  columnTitle?: ColumnTitle;
  inputs: Array<InputDefinition<T>>;
}

export type FormSchema<T> = Array<FormColumn<T>>;

export type FormConfig<T> = {
  formSchema: FormSchema<T>;
  formValidator: z.ZodSchema<T>;
  initialValues: T;
  submitButtonText: string;
  cancelButtonText: string;
  showCancelButton: boolean;
  centerButtons: boolean;
};
