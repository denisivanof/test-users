import React, {FC} from 'react';
import {userType} from "./UsersContainer";
import s from "../style/users.module.scss"
import {Link} from "react-router-dom";

interface usersType{
    users:Array<userType>| undefined,
    profileById: (id: number)=>void
}
const Users:FC<usersType> = ({users, profileById}) => {
    return (
        <>
            <div className={s.users}>
                <h3 className={s.users_title}>Список пользователей</h3>
                {users?.map(item=>{
                    return (
                        <div key={item.id} className={s.users_block}>
                            <div>
                                <div className={s.users_field}><span>ФИО: </span>{item.name}</div>
                                <div className={s.users_field + ' ' + s.users_marginTop}><span>город: </span>{item.address.city}</div>
                                <div className={s.users_field + ' ' + s.users_marginTop}><span>компания: </span>{item.company.name}</div>
                            </div>
                            <div className={s.users_link} onClick={()=>profileById(item.id)}><Link to={'/profile/'+item.id}>Подробнее</Link></div>
                        </div>
                    )
                })}
                <div className={s.users_amountUsers}>Найдено {users?.length} пользователей</div>
            </div>
        </>
    );
};

export default Users;