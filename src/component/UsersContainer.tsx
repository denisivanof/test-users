import React, {FC, useEffect, useState} from 'react';
import axios from 'axios'
import Sort from "./Sort";
import Users from "./Users";
import {Routes, Route} from 'react-router-dom'
import Profile from "./Profile";

export interface userType {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}
const UsersContainer: FC = () => {

    const [users, setUsers] = useState<Array<userType>>()
    const [profile, setProfile] = useState<userType>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(()=>{
        const getUsers = async ()=>{
            try {
                setIsLoading(true)
                let res = await axios.get<Array<userType>>('https://jsonplaceholder.typicode.com/users')
                setUsers(res.data)
                setIsLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        getUsers()
    }, [])

    const sortCity = () => {
        setUsers(users?.slice().sort((a, b):number => {
            if(a.address.city > b.address.city){return 1}
            if(a.address.city < b.address.city){return-1}
            return 0
        }))
    }
    const sortCompany = () => {
        setUsers(users?.slice().sort((a, b):number => {
            if(a.company.name > b.company.name){return 1}
            if(a.company.name < b.company.name){return -1}
            return 0
        }))
    }
    const profileById = (id: number) => {
        setProfile(users?.filter(item=>item.id === id)[0])
    }

    return (
        <>
            <div style={{display: "flex"}}>
                <Sort sortCity={sortCity} sortCompany={sortCompany}/>
                <Routes>
                    <Route path="/" element={<Users users={users} profileById={profileById} isLoading={isLoading}/>} />
                    <Route path="/profile/:id" element={<Profile profile={profile}/>} />
                </Routes>
            </div>
        </>
    );
};

export default UsersContainer;