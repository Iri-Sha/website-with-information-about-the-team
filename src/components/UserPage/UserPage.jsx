import React, { useEffect } from 'react';
import './userPage.less';
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import { getUser } from '../../actions/users';
import { description } from '../../utils/constants';
import emailImg from '../../image/Email.svg';


const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user)
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUser(id));
  }, [])

  return (
    <div className="infouser">
      <div className="infouser-profile">
        <img src={user?.avatar} className="infouser-avatar" alt="Фото профиля" />
        <div className="infouser-block">
          <h1 className="infouser-name">{user?.first_name + " " + user?.last_name}</h1>
          <p className="infouser-text">Партнер</p>
        </div>
      </div>
      <div className="infouser-info">
        <p className="infouser-description">{description}</p>
        <p className="infouser-email"><img className="infouser-img" src={emailImg}/>{user?.email}</p>
      </div>
    </div>
  );
};

export default UserPage;