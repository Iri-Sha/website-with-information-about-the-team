import React, {useState, useCallback} from "react";
import validator from "validator";

export  default function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const regex = /^[a-zа-яё\s-]+$/i;

  const updateValue = (name, value) => setValues((values) => ({ ...values, [name]: value }));

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if(name === 'email') {
      if(value === '') {
        setErrors({...errors, [name]: 'Вы пропустили это поле.' });
      } else if(!validator.isEmail(value)) {
        setErrors({...errors, [name]: 'Некорректный E-Mail.' });
        setIsValid(false)
      } else {
        setErrors({...errors, [name]: target.validationMessage });
      }
    }  
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, updateValue };
}