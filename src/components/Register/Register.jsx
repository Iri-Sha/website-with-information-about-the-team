import React from 'react';
import './register.less';
import Form from '../Form/Form';
import useFormWithValidation from '../../hooks/useValidationForm';

function Register({handleRegisterSubmit, formError, isActiveForUpdate}) {

  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();

  function handleSubmit(e){
    e.preventDefault();
    handleRegisterSubmit(values.email, values.password);
    resetForm();
  }

  return (
    <Form
      title={"Регистрация"}
      inputs={
        <div className="register-inputs">
          <label className="register-label">E-mail</label>
          <input
            className="register-input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            minLength="2"
            maxLength="254"
            required
            value={values.email || ''}
            onChange={handleChange}
            disabled={!isActiveForUpdate}
          />
          <span className="register-input-error">{errors.email}</span>
          <label className="register-label">Пароль</label>
          <input
            className="register-input"
            type="password"
            name="password"
            id="password"
            placeholder="Пароль"
            minLength="6"
            required
            value={values.password || ''}
            onChange={handleChange}
            disabled={!isActiveForUpdate}
          />
          <span className="register-input-error">{errors.password}</span>
        </div>
      }
      button={"Зарегистрироваться"}
      span={"Уже зарегистрированы?"}
      isRegister={true}
      isValid={isValid}
      onSubmit = {handleSubmit}
      formError={formError}
    />
  );
};
  
export default Register;