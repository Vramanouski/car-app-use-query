import { useState } from "react";
import { ZodSchema, ZodError } from "zod";

export const useValidation = <T extends Record<string, any>>(
  schema: ZodSchema<T>
) => {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateForm = (data: T) => {
    try {
      schema.parse(data);
      setErrors({});
      return true;
    } catch (e) {
      const error = e as ZodError;
      const newErrors: Partial<Record<keyof T, string>> = {};
      for (const err of error.errors) {
        newErrors[err.path[0] as keyof T] = err.message;
      }
      setErrors(newErrors);
      return false;
    }
  };

  return {
    errors,
    validateForm,
  };
};
