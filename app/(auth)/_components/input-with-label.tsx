"use client";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  styled,
  IconButton,
} from "@mui/joy";
import { HTMLInputTypeAttribute, KeyboardEventHandler, useState } from "react";
import { Eye, EyeOff, AlertCircle } from "lucide-react";

const StyledInput = styled(Input)(({ theme }) => ({
  "--Input-radius": "12px",
  "--Input-placeholderOpacity": 0.5,
  "--Input-focusedThickness": "2px",
  backgroundColor: theme.vars.palette.background.surface,
  transition: "all 0.2s ease",
  "&:hover": {
    boxShadow: theme.vars.shadow.sm,
  },
  "&:focus-within": {
    boxShadow: theme.vars.shadow.md,
    transform: "translateY(-1px)",
  },
}));

type Props = {
  fieldTitle: string;
  nameInSchema: string;
  placeholder?: string;
  labelLeft?: boolean;
  readOnly?: boolean;
  className?: string;
  type?: HTMLInputTypeAttribute | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export function InputWithLabel({
  fieldTitle,
  nameInSchema,
  placeholder,
  labelLeft,
  readOnly,
  className,
  type = "text",
  onKeyDown,
}: Props) {
  const { control } = useFormContext();

  const fieldTitleNoSpaces =
    typeof fieldTitle === "string"
      ? fieldTitle.replaceAll(" ", "-")
      : nameInSchema;

  return (
    <Controller
      control={control}
      name={nameInSchema}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <FormControl
          error={!!error}
          className={className}
          sx={{
            display: labelLeft ? "flex" : "block",
            flexDirection: labelLeft ? "row" : "column",
            alignItems: labelLeft ? "center" : "stretch",
            gap: labelLeft ? 2 : 1,
            mb: 0.5,
          }}
        >
          {fieldTitle && (
            <FormLabel
              htmlFor={fieldTitleNoSpaces}
              sx={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "text.primary",
                mb: labelLeft ? 0 : 0.75,
                width: labelLeft ? "33%" : "auto",
                "& span": { color: "text.tertiary" },
              }}
            >
              <span dangerouslySetInnerHTML={{ __html: fieldTitle }} />
            </FormLabel>
          )}

          <StyledInput
            {...field}
            slotProps={{
              input: {
                ref,
                id: fieldTitleNoSpaces,
              },
            }}
            type={type}
            placeholder={
              placeholder ||
              (typeof fieldTitle === "string"
                ? `Nhập ${fieldTitle.toLowerCase()}`
                : "")
            }
            readOnly={readOnly}
            disabled={readOnly}
            onKeyDown={onKeyDown}
            sx={{
              py: 1.25,
              px: 1.5,
              fontSize: "0.95rem",
              flex: 1,
            }}
          />
          {error && (
            <FormHelperText
              sx={{
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <AlertCircle size={14} />
              {error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
