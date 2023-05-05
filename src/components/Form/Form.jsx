import React from 'react';
import './form.less';
import { useNavigate } from "react-router-dom";

const Form = ({
  title,
  inputs,
  button,
  span,
  isRegister,
  isValid,
  onSubmit,
  formError}) => {

  const navigate = useNavigate();

  return (
    <section className="form-container">
      <h2 className='form-title'>{title}</h2>
      <form className="form-form" onSubmit={onSubmit} noValidate>
        <div className="form-inputs">{inputs}</div>
        <span className="form-error-message">{formError}</span>
        <button type="submit" className={isValid?("form__button"):
          ("form-button form-button_disabled")}>{button}</button>
      </form>
      <span className="form-span">{span}
        {isRegister ? (
          <button className="form-link" type="button" onClick={() => navigate("/signin")}>Войти</button>
        ): (
          <button className="form-link" type="button" onClick={() => navigate("/signup")}>Регистрация</button>
        )}
      </span>
    </section>
  );
}

export default Form;
