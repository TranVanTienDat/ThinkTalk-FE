"use client";
import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import clsx from "clsx";
import { HTMLInputTypeAttribute, KeyboardEventHandler, useEffect } from "react";

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  placeholder?: string;
  labelLeft?: boolean;
  readOnly?: boolean;
  className?: string;
  type?: HTMLInputTypeAttribute | undefined;
  prefix?: string;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export function InputWithLabel({
  fieldTitle,
  nameInSchema,
  placeholder,
  labelLeft,
  readOnly,
  className,
  type,
  onKeyDown,
  prefix = "",
}: Props) {
  const form = useFormContext();

  const fieldTitleNoSpaces = fieldTitle.replaceAll(" ", "-");
  useEffect(() => {
    if (!form.getValues(nameInSchema)) {
      form.setValue(nameInSchema, prefix, { shouldDirty: true });
    }
  }, [form, nameInSchema, prefix]);

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => {
        return (
          <FormItem
            className={clsx([
              labelLeft ? "w-full flex items-center gap-2" : "",
              className,
            ])}
          >
            <FormLabel
              className={`text-sm ${labelLeft ? "w-1/3 mt-2" : ""}`}
              htmlFor={fieldTitleNoSpaces}
              dangerouslySetInnerHTML={{ __html: fieldTitle }}
            />

            <div
              className={`flex items-center gap-2 ${
                labelLeft ? "w-2/3" : "w-full"
              }`}
            >
              <div className="w-full flex items-center rounded-md">
                <FormControl>
                  <Input
                    {...field}
                    id={fieldTitleNoSpaces}
                    className="w-full py-5 text-lg placeholder:text-[14px] placeholder:text-[#B5B7C0] placeholder:font-normal text-[14px]"
                    placeholder={placeholder || fieldTitle}
                    readOnly={readOnly}
                    disabled={readOnly}
                    value={field.value}
                    type={type}
                    onKeyDown={onKeyDown}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value.startsWith(prefix)) {
                        field.onChange(value);
                      } else {
                        field.onChange(prefix);
                      }
                    }}
                  />
                </FormControl>
              </div>
            </div>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
