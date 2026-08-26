import { ref, computed, type Ref } from 'vue';

export type Validator<T> = (value: T) => string | null;

export interface FieldState<T> {
  value: Ref<T>;
  error: Ref<string | null>;
  touched: Ref<boolean>;
}

export function useFormValidation<FormValues extends Record<string, unknown>>(
  initialValues: FormValues,
  validators: Partial<Record<keyof FormValues, Validator<unknown>>>,
) {
  const fields = {} as Record<keyof FormValues, FieldState<unknown>>;

  for (const key of Object.keys(initialValues) as (keyof FormValues)[]) {
    const value = ref(initialValues[key]) as Ref<unknown>;
    const error = ref<string | null>(null);
    const touched = ref(false);
    fields[key] = { value, error, touched };
  }

  function validateField(key: keyof FormValues): boolean {
    const field = fields[key];
    const validator = validators[key];
    field.error.value = validator ? validator(field.value.value) : null;
    return field.error.value === null;
  }

  function validateAll(): boolean {
    let allValid = true;
    for (const key of Object.keys(fields) as (keyof FormValues)[]) {
      if (!validateField(key)) allValid = false;
    }
    return allValid;
  }

  const isValid = computed(() =>
    Object.values(fields).every((f: FieldState<unknown>) => f.error.value === null),
  );

  function reset(): void {
    for (const key of Object.keys(fields) as (keyof FormValues)[]) {
      fields[key].value.value = initialValues[key];
      fields[key].error.value = null;
      fields[key].touched.value = false;
    }
  }

  return { fields, validateField, validateAll, isValid, reset };
}
