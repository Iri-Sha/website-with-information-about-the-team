import React, { useState } from 'react';
import './user.less';
import { useDispatch } from 'react-redux';
import { toggleStatus } from '../../actions/users';
import like from '../../image/Like.svg';
import likeActive from '../../image/LikeActive.svg';


const User = ({user, onClick}) => {
    const dispatch = useDispatch();
    const [isLike, setIsLike] = useState(false);

    function handleClickLike() {
        dispatch(toggleStatus(user.id));
        setIsLike(true);
    }
    

    return (
        <div className="user">
            <div className="user-header" onClick={() => onClick(user)}>
                <img src={user.avatar} className="user-avatar" alt="Фото профиля" />
                <div className="user-header-name">{user.first_name + " " + user.last_name}</div>
            </div>
            <button 
                className="user-like-button"
                type="button"
                aria-label="Кнопка лайка"
                onClick={handleClickLike}
            >
                {isLike ? <img src={likeActive}/> : <img src={like}/>}
            </button>
        </div>
    );
};

export default User;