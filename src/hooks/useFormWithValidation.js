import { useState, useCallback } from 'react';

export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (evt) => {
    const input = evt.target;
    const name = input.name;
    const value = input.value;
    const validationMessage = input.validationMessage;

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(input.closest('form').checkValidity());
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
