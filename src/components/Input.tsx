/* eslint-disable react/display-name */
import { ComponentProps, forwardRef } from "react";

type InputProps = ComponentProps<"input"> & {
  label: string;
  id: string;
  text: string | undefined;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, text, ...props }, ref) => {
    return (
      <>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor={id}>{label}</label>
          <input
            className={`rounded-md p-3 text-zinc-950 ${
              text ? "outline-red-600" : "outline-blue-500"
            }  placeholder:text-xs`}
            name={label}
            id={id}
            type="text"
            ref={ref}
            {...props}
          />
          <span className="text-sm text-red-600 ">{text}</span>
        </div>
      </>
    );
  }
);
