import React from "react";
import './login.less';
import Form from "../Form/Form";
import useFormWithValidation from '../../hooks/useValidationForm';
import { useDispatch } from "react-redux";
import { setUser } from "../../store/reducers/userSlice";

function Login({handleLoginSubmit, formError, isActiveForUpdate}) {  

  const {
    values, handleChange, errors, isValid, resetForm,
  } = useFormWithValidation();

  function handleSubmit(e){
    e.preventDefault();
    handleLoginSubmit(values.email, values.password);
    resetForm();
  }

  return (
    <Form 
      title={'Вход'}
      inputs={
        <div className="login-inputs">
          <label className="login-label">E-mail</label>
          <input
            className="login-input"
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
          <span className="login-input-error">{errors.email}</span>
          <label className="login-label">Пароль</label>
          <input
            className="login-input"
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
          <span className="login-input-error">{errors.password}</span>
        </div>
      }
      button={"Войти"}
      span={"Ещё не зарегистрированы?"}
      isRegister={false}
      isValid={isValid}
      onSubmit = {handleSubmit}
      formError={formError}
    />
  );
}

export default Login;