import { useState, useCallback } from 'react';
import { TFormErrors, TFormValues } from '../utils/types';

export function useFormWithValidation(defaultValues: TFormValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<TFormErrors>({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const input = evt.target;
    const name = input.name;
    const value = input.value;
    const validationMessage = input.validationMessage;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid((input.closest('form') as HTMLFormElement).checkValidity());
  };

  const resetForm = useCallback(
    (newValues = { ...defaultValues }, newIsValid = false) => {
      setValues(newValues);
      setErrors({});
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid, defaultValues],
  );

  return {
    values,
    handleChange,
    resetForm,
    errors,
    isValid,
  };
}
