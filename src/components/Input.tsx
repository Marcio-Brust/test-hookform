/* eslint-disable react/display-name */
import { ComponentProps, forwardRef } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  id: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor={id}>{label}</label>
          <input
            className="rounded-md p-3 outline-blue-500 placeholder:text-xs"
            name={label}
            id={id}
            type="text"
            ref={ref}
            {...props}
          />
        </div>
      </>
    );
  }
);
