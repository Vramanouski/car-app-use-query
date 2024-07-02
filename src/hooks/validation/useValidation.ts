import { useMemo } from "react";
import { ZodSchema } from "zod";

export const useValidation = <T extends Record<string, any>>(
  schema: ZodSchema<T>,
  data: T
) => {
  const { errors, isValid } = useMemo(() => {
    const result = schema.safeParse(data);
    const newErrors: Partial<Record<keyof T, string>> = {};

    if (!result.success) {
      result.error.errors.forEach((err) => {
        newErrors[err.path[0] as keyof T] = err.message;
      });
    }

    return {
      errors: newErrors,
      isValid: result.success,
    };
  }, [data, schema]);

  return {
    errors,
    isValid,
  };
};
