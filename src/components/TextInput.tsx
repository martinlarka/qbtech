import { HTMLProps } from "react";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

type InputProps = Omit<HTMLProps<HTMLInputElement>, "name">;

type TextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = InputProps & {
  control: UseControllerProps<TFieldValues, TName>;
};

export const TextInput = ({
  className,
  label,
  control,
  ...props
}: TextInputProps) => {
  const { fieldState } = useController(control);
  return (
    <div>
      <label
        htmlFor={props.id}
        className={twMerge(
          "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
          fieldState.error &&
            "block mb-2 text-sm font-medium text-red-700 dark:text-red-500",
        )}
      >
        {label}
      </label>
      <input
        type="text"
        name={control.name}
        className={twMerge(
          "border text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700",
          "bg-gray-50  border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          fieldState.error &&
            "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500",
          props.disabled && "bg-gray-100 cursor-not-allowed dark:text-gray-400",
          className,
        )}
        readOnly={props.disabled}
        required={Boolean(control.rules?.required)}
        {...props}
      />
      {fieldState.error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {fieldState.error.message}
        </p>
      ) : null}
    </div>
  );
};
