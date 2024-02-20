import { HTMLProps } from "react";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputProps = Omit<HTMLProps<HTMLInputElement>, "name">;

type RadioInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputProps & {
  control: UseControllerProps<TFieldValues, TName>;
};

export const RadioInput = ({
  id,
  className,
  label,
  control,
  ...props
}: RadioInputProps) => {
  const { field } = useController(control);
  const inputId = id || props.value + control.name;

  return (
    <div className="flex items-center">
      <input
        id={inputId}
        type="radio"
        className={twMerge(
          "w-4 h-4",
          "text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
          className,
        )}
        checked={field.value === props.value}
        onChange={field.onChange}
        {...props}
      />
      <label
        htmlFor={inputId}
        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
};
