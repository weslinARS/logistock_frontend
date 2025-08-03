'use client';

import * as React from 'react';
import {
  useController,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import { CalendarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { FieldErrorComponent } from './FieldError';

// --- Funciones de Utilidad ---
function formatDate(date: Date | undefined): string {
  if (!date) {
    return '';
  }
  // React Hook Form puede pasar strings, así que nos aseguramos que sea un objeto Date
  const validDate = new Date(date);
  if (isNaN(validDate.getTime())) {
    return '';
  }
  return validDate.toLocaleDateString('es-NI', {
    // Cambiado a formato local (Nicaragua)
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function isValidDate(date: any): date is Date {
  if (!date) return false;
  return !isNaN(new Date(date).getTime());
}

// --- Props del Componente ---
interface ControlledDateInputProps<T extends FieldValues> {
  fieldName: Path<T>;
  label: string;
  placeholder?: string;
  readonly?: boolean;
}

// --- Componente Principal ---
export function ControlledDateInput<T extends FieldValues>({
  fieldName,
  label,
  placeholder,
  readonly,
}: ControlledDateInputProps<T>) {
  const { control } = useFormContext<T>();
  const {
    field, // Contiene: name, value, onChange, onBlur, ref
    fieldState: { error },
  } = useController({
    name: fieldName,
    control,
  });

  const [open, setOpen] = React.useState(false);

  // El valor del input de texto se maneja por separado para permitir que el usuario escriba libremente.
  // Se sincroniza con el valor del formulario cuando el valor del formulario cambia.
  const [inputValue, setInputValue] = React.useState(formatDate(field.value));

  React.useEffect(() => {
    setInputValue(formatDate(field.value));
  }, [field.value]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-1.5">
      <Label htmlFor={fieldName} className="px-1">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={fieldName}
          value={inputValue}
          placeholder={placeholder}
          className="bg-background pr-10"
          readOnly={readonly}
          onBlur={field.onBlur} // Llama a onBlur de RHF para activar la validación
          onChange={(e) => {
            const value = e.target.value;
            setInputValue(value); // Actualiza el valor visible en el input

            // Intenta convertir el texto a una fecha válida y actualiza el formulario
            const date = new Date(value);
            if (isValidDate(date)) {
              field.onChange(date);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              disabled={readonly}
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Seleccionar fecha</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={
                isValidDate(field.value) ? new Date(field.value) : undefined
              }
              onSelect={(date) => {
                field.onChange(date); // Actualiza el valor del formulario
                setOpen(false); // Cierra el popover al seleccionar
              }}
              disabled={readonly}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Muestra el error asociado a este campo */}
      <FieldErrorComponent errors={error} />
    </div>
  );
}
