import React, {useState} from "react";
import { useSelector } from 'react-redux';
import './app.less';
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Main from "../Main/Main";
import Header from "../Header/Header";
import Register from "../Register/Register";
import Login from "../Login/Login";
import UserPage from "../UserPage/UserPage";
import { apiAuth } from "../../utils/ApiAuth";
import exit from '../../image/Exit.svg';
import back from '../../image/Back.svg';

const App = () => {
  const navigate = useNavigate();
  const {isLoading, error} = useSelector(state => state.users);
  const [loggedIn, setLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState(false);
  const [formError, setFormError] = useState('');
  const [isActiveForUpdate, setIsActiveForUpdate] = useState(true);

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function tokenCheck() {
    if (localStorage.getItem('jwt')){
      const token = localStorage.getItem('jwt');
      apiAuth.getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            navigate("/");
        }})
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
          localStorage.clear();
        });
    }
  }

  function handleRegisterSubmit(email, password) {
    setIsActiveForUpdate(false);
    return apiAuth.registration(email, password)
      .then(() => {
        handleLoginSubmit(email, password);
        setIsActiveForUpdate(true);
      })
      .catch((err) => {
        setIsActiveForUpdate(true);
        if(err === 'Ошибка: 409') {
          return setFormError('Пользователь с таким email уже существует.');
        }
        setFormError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      })
  }

  function handleLoginSubmit(email, password) {
    setIsActiveForUpdate(false);
    apiAuth.authorization(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
      .then((data) => {
        if (data.token) {
          tokenCheck();
          setLoggedIn(true);
          setFormError("");
          setIsActiveForUpdate(true);
          navigate("/");
        }
      })
      .catch((err) => {
        setIsActiveForUpdate(true);
        setFormError('Вы ввели неправильный логин или пароль.');
        console.log(err);
      })
  }

  function logout() {
    navigate("/signin");
    setLoggedIn(false);
    localStorage.removeItem('jwt');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="container">
        <Routes>
          <Route path="/signup" element={
            loggedIn ? (
              <Navigate replace to="/" />
            ) : (
              <Register
                handleRegisterSubmit={handleRegisterSubmit}
                formError={formError}
                isActiveForUpdate={isActiveForUpdate}
              />
            )
          }
          />

          <Route path="/signin" element={
            loggedIn ? (
              <Navigate replace to="/" />
            ) : (
              <Login
                handleLoginSubmit={handleLoginSubmit}
                formError={formError}
                isActiveForUpdate={isActiveForUpdate}
              />
            )}
          />

          <Route exact path="/" element={
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
            >
              <>
              <Header>
                <button className="header-link" type="button" onClick={logout}>Выйти</button>
                <button className="header-link-small" type="button" onClick={logout}><img src={exit} width="18" height="18" /></button>
                <h1 className="header-title">Наша команда</h1>
                <p className="header-text">Это опытные специалисты, хорошо разбирающиеся во всех задачах, которые ложатся на их плечи, и умеющие находить выход из любых, даже самых сложных ситуаций.</p>
              </Header>
              {isLoading && <h2>Loading...</h2>}
              {error &&  <h2>An error occured: {error}</h2>}
              <Main/>
              </>
            </ProtectedRoute>
          }/>

          <Route exact path="/:id" element={
            <ProtectedRoute
              path="/:id"
              loggedIn={loggedIn}
            >
              <>
              <Header>
                <div className="header-buttons">
                  <button className="header-link" type="button" onClick={() => navigate(-1)}>Назад</button>
                  <button className="header-link-small" type="button" onClick={() => navigate(-1)}><img src={back} width="18" height="18" /></button>
                  <button className="header-link" type="button" onClick={logout}>Выйти</button>
                  <button className="header-link-small" type="button" onClick={logout}><img src={exit} width="18" height="18" /></button>
                </div>
              </Header>
              {isLoading && <h2>Loading...</h2>}
              {error &&  <h2>An error occured: {error}</h2>}
              <UserPage />
              </>
            </ProtectedRoute>
          }/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
};

export default App;