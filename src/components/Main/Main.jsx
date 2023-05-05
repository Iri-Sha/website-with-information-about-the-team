import React, {useEffect, useState} from 'react';
import './main.less'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getUsers } from "../../actions/users";
import List from '../List/List';
import User from "../User/User";
import more from'../../image/More.svg';

const Main = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getUsers(1));
    }, [])

    const btnclick = () => {
      dispatch(getUsers(2));
    }

    return (
      <section className="elements">
        <List
          className='elements-cards'
          items={users}
          renderItem={(user) =>
            <User 
              user={user}
              key={user.id}
              onClick={(user) => {
                navigate('/' + user.id);
              }}
            />
          }
        />
        <button className="more-button" onClick={btnclick} >Показать ещё <img src={more} /></button>
      </section>
    );
};

export default Main;