import React, {FC} from 'react';
import {userType} from "./UsersContainer";
import s from "../style/users.module.scss"
import {Link} from "react-router-dom";

interface usersType{
    users:Array<userType>| undefined
}

const Users:FC<usersType> = ({users}) => {
    return (
        <>
            <div className={s.users}>
                <h3 className={s.users_title}>Список пользователей</h3>
                {users?.map(item=>{
                    return (
                        <div key={item.id}>
                            <div>{item.username}</div>
                            <div><Link to="/profile">profile</Link></div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};

export default Users;