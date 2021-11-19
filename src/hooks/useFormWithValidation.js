import { useState, useCallback } from 'react';

export function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  console.log(values);
  const handleChange = (evt) => {
    // console.log(values);
    const input = evt.target;
    const name = input.name;
    const value = input.value;
    setValues({ ...values, [name]: value });
    // console.log(values);
    // const inputIsValid = input.validity.valid;
    const validationMessage = input.validationMessage;
    // const showError = !inputIsValid && validationMessage !== '';

    setErrors({ ...errors, [name]: validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {...defaultValues}, newIsValid = false) => {
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
